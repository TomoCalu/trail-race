import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { RACE_DISTANCES } from '../constants/raceDistances';
import InputForm from '../components/Forms/InputForm';
import { getRaceDetails, saveRace } from '../services/raceApi'; 

const RaceForm = () => {
  const { id } = useParams();
  const { token, checkTokenExpiration } = useContext(AuthContext);
  const navigate = useNavigate();

  const [raceData, setRaceData] = useState({ name: '', distance: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRaceDetails = async () => {
      if (id) {
        try {
          setLoading(true);
          const raceDetails = await getRaceDetails(id, token);
          setRaceData(raceDetails);
        } catch (error) {
          setError('Could not load race data');
          checkTokenExpiration(error.response);
        } finally {
          setLoading(false);
        }
      }
    };
    loadRaceDetails();
  }, [id, token, checkTokenExpiration]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRaceData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await saveRace(id, raceData, token);
      navigate('/');
    } catch (error) {
      setError(`Failed to ${id ? 'update' : 'create'} race`);
      checkTokenExpiration(error.response);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'name', label: 'Race Name', required: true },
    { name: 'distance', label: 'Distance', type: 'select', options: RACE_DISTANCES, placeholder: 'Select a distance', required: true },
  ];

  return (
    <InputForm
      title={id ? 'Edit Race' : 'Create New Race'}
      formData={raceData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      fields={fields}
      buttonLabel={id ? 'Update Race' : 'Create Race'}
      loading={loading}
      error={error}
    />
  );
};

export default RaceForm;