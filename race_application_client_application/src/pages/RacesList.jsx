import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { ROLE_ADMINISTRATOR } from "../utils/roles";
import { getDistanceLabel } from "../constants/raceDistances";
import Table from "../components/Table";
import { getRaces, deleteRace } from "../services/raceApi";

const RacesList = () => {
  const [races, setRaces] = useState([]);
  const { token, user, checkTokenExpiration } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const loadRaces = async () => {
      try {
        const racesData = await getRaces(token);
        setRaces(racesData);
      } catch (error) {
        console.error(error);
        checkTokenExpiration(error.response);
      }
    };

    loadRaces();
  }, [token, checkTokenExpiration]);

  const isAdmin = user?.roles.includes(ROLE_ADMINISTRATOR);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this race?")) {
      try {
        await deleteRace(id, token);
        setRaces(races.filter((race) => race.id !== id));
      } catch (error) {
        console.error("Error deleting race:", error);
        checkTokenExpiration(error.response);
      }
    }
  };

  const handleViewRace = (id) => {
    navigate(`/races/${id}`);
  };

  const columns = [
    { label: "Name", accessor: "name" },
    {
      label: "Distance",
      accessor: "distance",
      format: getDistanceLabel,
    },
  ];

  return (
    <div className="container mx-auto p-4 max-w-screen-lg">
      <div className="bg-base-100 shadow-lg rounded-lg mb-8 p-6">
        <h2 className="text-4xl font-bold text-center text-primary mb-8">
          Races
        </h2>
        <div className="w-full">
          <Table
            columns={columns}
            data={races}
            onRowClick={(row) => handleViewRace(row.id)}
            renderActions={(row) =>
              isAdmin && (
                <>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/races/edit/${row.id}`);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-error btn-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(row.id);
                    }}
                  >
                    Delete
                  </button>
                </>
              )
            }
          />

          {isAdmin && (
            <div className="flex justify-center mt-4">
              <button
                className="btn btn-primary w-1/4"
                onClick={() => navigate("/races/add")}
              >
                Add New Race
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RacesList;
