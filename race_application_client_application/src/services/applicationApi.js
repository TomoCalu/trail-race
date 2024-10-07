import commandApi from './commandApi';
import queryApi from './queryApi';

const getApplicationById = async (appId) => {
  try {
    const response = await commandApi.get(`/applications/${appId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to retrieve application.');
  }
};

const updateApplication = async (appId, data) => {
  try {
    const response = await commandApi.put(`/applications/${appId}`, data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update application.');
  }
};

const createApplication = async (data) => {
  try {
    const response = await commandApi.post('/applications', data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create application.');
  }
};

const getUserApplications = async (firstName, lastName) => {
  try {
    const response = await queryApi.get(
      `/applications?firstName=${firstName}&lastName=${lastName}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to retrieve user applications.');
  }
};

const getRaceApplications = async (raceId) => {
  try {
    const response = await queryApi.get(`/applications?raceId=${raceId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to retrieve race applications.');
  }
};

const deleteApplication = async (appId) => {
  try {
    await commandApi.delete(`/applications/${appId}`);
  } catch (error) {
    throw new Error('Failed to delete application.');
  }
};

export {
  getApplicationById,
  updateApplication,
  createApplication,
  getUserApplications,
  getRaceApplications,
  deleteApplication,
};
