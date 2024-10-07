import commandApi from "./commandApi";
import queryApi from "./queryApi";

const getApplicationById = (appId, token) => {
  return commandApi.get(`/applications/${appId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const updateApplication = (appId, data, token) => {
  return commandApi.put(`/applications/${appId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const createApplication = (data, token) => {
  return commandApi.post("/applications", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const getUserApplications = async (firstName, lastName, token) => {
  const response = await queryApi.get(
    `/applications?firstName=${firstName}&lastName=${lastName}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

const getRaceApplications = async (raceId, token) => {
  const response = await queryApi.get(`/applications?raceId=${raceId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const deleteApplication = async (appId, token) => {
  await commandApi.delete(`/applications/${appId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export {
  getApplicationById,
  updateApplication,
  createApplication,
  getUserApplications,
  getRaceApplications,
  deleteApplication,
};
