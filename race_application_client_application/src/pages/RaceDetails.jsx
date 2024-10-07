import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { ROLE_APPLICANT } from '../constants/roles';
import { getDistanceLabel } from '../constants/raceDistances';
import Table from '../components/Table';
import {
  getRaceApplications,
  deleteApplication,
} from '../services/applicationApi';
import { getRaceDetails } from '../services/raceApi';

const RaceDetails = () => {
  const { id } = useParams();
  const { token, user, checkTokenExpiration } = useContext(AuthContext);
  const navigate = useNavigate();

  const [race, setRace] = useState(null);
  const [applications, setApplications] = useState([]);
  const [hasUserApplied, setHasUserApplied] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRaceDetails = async () => {
      try {
        const raceData = await getRaceDetails(id, token);
        setRace(raceData);
      } catch (error) {
        setError('Failed to fetch race details');
        checkTokenExpiration(error.response);
      }
    };

    const loadRaceApplications = async () => {
      try {
        const apps = await getRaceApplications(id, token);
        setApplications(apps);

        const applied = apps.some(
          (app) =>
            app.firstName === user.firstName && app.lastName === user.lastName
        );
        setHasUserApplied(applied);
      } catch (error) {
        setError('Failed to fetch applications');
        checkTokenExpiration(error.response);
      }
    };

    loadRaceDetails();
    loadRaceApplications();
  }, [id, token, user.firstName, user.lastName, checkTokenExpiration]);

  const handleDelete = async (appId) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await deleteApplication(appId, token);
        const updatedApplications = applications.filter(
          (app) => app.id !== appId
        );
        setApplications(updatedApplications);

        const applied = updatedApplications.some(
          (app) =>
            app.firstName === user.firstName && app.lastName === user.lastName
        );
        setHasUserApplied(applied);
      } catch (error) {
        setError('Failed to delete application');
        checkTokenExpiration(error.response);
      }
    }
  };

  const isApplicant = user?.roles.includes(ROLE_APPLICANT);

  const columns = [
    { label: 'First Name', accessor: 'firstName' },
    { label: 'Last Name', accessor: 'lastName' },
    { label: 'Club', accessor: 'club' },
  ];

  return (
    <div className="container mx-auto p-4 max-w-screen-lg">
      {error && <p className="text-red-500">{error}</p>}

      {race && (
        <div className="bg-base-100 shadow-lg rounded-lg mb-8 p-6">
          <h2 className="text-4xl font-bold text-primary mb-4">{race.name}</h2>
          <p className="text-lg mb-2">
            <strong>Distance:</strong> {getDistanceLabel(race.distance)}
          </p>

          <h3 className="text-2xl font-bold mt-6 mb-4">Applications</h3>

          <Table
            columns={columns}
            data={applications}
            renderActions={(row) =>
              isApplicant &&
              row.firstName === user.firstName &&
              row.lastName === user.lastName && (
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => handleDelete(row.id)}
                >
                  Delete
                </button>
              )
            }
          />

          {isApplicant && !hasUserApplied && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => navigate(`/races/${id}/applications/add`)}
                className="btn btn-primary w-1/4"
              >
                Add Application
              </button>
            </div>
          )}

          {isApplicant && hasUserApplied && (
            <p className="text-red-500 mt-4">
              You have already applied for this race.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default RaceDetails;
