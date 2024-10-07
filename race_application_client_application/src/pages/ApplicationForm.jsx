import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import InputForm from '../components/Forms/InputForm';
import {
  getApplicationById,
  updateApplication,
  createApplication,
} from '../services/applicationApi';

const ApplicationForm = () => {
  const { raceId, appId } = useParams();
  const { token, checkTokenExpiration, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [applicationData, setApplicationData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    club: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (appId) {
      setLoading(true);
      getApplicationById(appId, token)
        .then((response) => {
          setApplicationData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError('Could not load application data');
          checkTokenExpiration(error.response);
        });
    }
  }, [appId, token, checkTokenExpiration]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApplicationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      ...applicationData,
      raceId,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    if (appId) {
      updateApplication(appId, data, token)
        .then(() => navigate(`/races/${raceId}`))
        .catch((err) => setError('Failed to update application'))
        .finally(() => setLoading(false));
    } else {
      createApplication(data, token)
        .then(() => navigate(`/races/${raceId}`))
        .catch((err) => setError('Failed to create application'))
        .finally(() => setLoading(false));
    }
  };

  const fields = [
    { name: 'firstName', label: 'First Name', disabled: true, required: true },
    { name: 'lastName', label: 'Last Name', disabled: true, required: true },
    { name: 'club', label: 'Club (optional)' },
  ];

  return (
    <InputForm
      title={appId ? 'Edit Application' : 'Create New Application'}
      formData={applicationData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      fields={fields}
      buttonLabel={appId ? 'Update Application' : 'Create Application'}
      loading={loading}
      error={error}
    />
  );
};

export default ApplicationForm;
