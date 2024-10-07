import commandApi from './commandApi';
import queryApi from './queryApi';

const loginUser = async (email, password) => {
  try {
    const response = await commandApi.post('/auth/login', { email, password });
    return response.data.token;
  } catch (err) {
    throw new Error('Login failed. Please check your credentials.');
  }
};

const getUserInfo = async () => {
  try {
    const response = await queryApi.get('/auth/me');
    return response.data;
  } catch (err) {
    throw new Error('Failed to fetch user info.');
  }
};

export { loginUser, getUserInfo };
