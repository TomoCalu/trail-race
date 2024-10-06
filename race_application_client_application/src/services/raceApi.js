import queryApi  from './queryApi';
import commandApi from './commandApi';

const getRaceDetails = async (raceId, token) => {
  const response = await queryApi.get(`/races/${raceId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const saveRace = async (raceId, raceData, token) => {
  const request = raceId
    ? commandApi.put(`/races/${raceId}`, raceData, {
        headers: { Authorization: `Bearer ${token}` },
      })
    : commandApi.post('/races', raceData, {
        headers: { Authorization: `Bearer ${token}` },
      });
  return request;
};

const getRaces = async (token) => {
  const response = await queryApi.get('/races', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const deleteRace = async (raceId, token) => {
  await commandApi.delete(`/races/${raceId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export {getRaceDetails, saveRace, getRaces, deleteRace}