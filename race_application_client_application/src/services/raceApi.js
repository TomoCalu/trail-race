import queryApi from './queryApi';
import commandApi from './commandApi';

const getRaceDetails = async (raceId) => {
  try {
    const response = await queryApi.get(`/races/${raceId}`);
    return response.data;
  } catch (err) {
    throw new Error('Failed to fetch race details.');
  }
};

const saveRace = async (raceId, raceData) => {
  try {
    const request = raceId
      ? commandApi.put(`/races/${raceId}`, raceData)
      : commandApi.post('/races', raceData);
    return request;
  } catch (err) {
    throw new Error(`Failed to ${raceId ? 'update' : 'create'} race.`);
  }
};

const getRaces = async () => {
  try {
    const response = await queryApi.get('/races');
    return response.data;
  } catch (err) {
    throw new Error('Failed to fetch races.');
  }
};

const deleteRace = async (raceId) => {
  try {
    await commandApi.delete(`/races/${raceId}`);
  } catch (err) {
    throw new Error('Failed to delete race.');
  }
};

export { getRaceDetails, saveRace, getRaces, deleteRace };
