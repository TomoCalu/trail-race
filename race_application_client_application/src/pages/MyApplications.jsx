import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Table from "../components/Table";
import { getDistanceLabel } from "../constants/raceDistances";
import {
  getUserApplications,
  deleteApplication,
} from "../services/applicationApi";
import { getRaceDetails } from "../services/raceApi";

const MyApplications = () => {
  const { token, user, checkTokenExpiration } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserApplications = async () => {
      try {
        const apps = await getUserApplications(
          user.firstName,
          user.lastName,
          token,
        );

        const updatedApplications = await Promise.all(
          apps.map(async (app) => {
            try {
              const race = await getRaceDetails(app.raceId, token);
              return {
                ...app,
                raceName: race.name,
                raceDistance: race.distance,
              };
            } catch (error) {
              console.error("Failed to fetch race details:", error);
              return { ...app, raceName: "Unknown", raceDistance: "Unknown" };
            }
          }),
        );

        setApplications(updatedApplications);
        setLoading(false);
      } catch (error) {
        checkTokenExpiration(error.response);
        setLoading(false);
      }
    };

    loadUserApplications();
  }, [token, user.firstName, user.lastName, checkTokenExpiration]);

  const handleViewRace = (raceId) => {
    navigate(`/races/${raceId}`);
  };

  const handleDelete = async (applicationId) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        await deleteApplication(applicationId, token);
        setApplications((prevApps) =>
          prevApps.filter((app) => app.id !== applicationId),
        );
      } catch (error) {
        console.error("Failed to delete application:", error);
      }
    }
  };

  const columns = [
    { label: "Race Name", accessor: "raceName" },
    { label: "Distance", accessor: "raceDistance", format: getDistanceLabel },
    { label: "Club", accessor: "club" },
  ];

  return (
    <div className="container mx-auto p-4 max-w-screen-lg">
      <div className="bg-base-100 shadow-lg rounded-lg mb-8 p-6">
        <h2 className="text-4xl font-bold text-center text-primary mb-8">
          My Applications
        </h2>
        <div className="w-full">
          {loading ? (
            <p>Loading...</p>
          ) : applications.length === 0 ? (
            <p>No applications found.</p>
          ) : (
            <Table
              columns={columns}
              data={applications}
              onRowClick={(row) => handleViewRace(row.raceId)}
              renderActions={(row) => (
                <button
                  className="btn btn-error btn-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(row.id);
                  }}
                >
                  Delete
                </button>
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyApplications;
