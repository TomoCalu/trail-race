import React, { createContext, useCallback, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getUserInfo } from '../services/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const fetchUserInfo = useCallback(async (token) => {
    try {
      const userData = await getUserInfo(token);
      setUser({
        username: userData.username,
        roles: userData.roles.map((role) => role.authority),
        firstName: userData.firstName,
        lastName: userData.lastName,
      });
    } catch (error) {
      console.error('Error fetching user info:', error);
      removeToken();
    }
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      fetchUserInfo(savedToken);
    }
  }, [fetchUserInfo]);

  const saveToken = async (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    await fetchUserInfo(newToken);
  };

  const removeToken = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  const isTokenExpired = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
  };

  const checkTokenExpiration = (response) => {
    if (isTokenExpired(token)) {
      removeToken();
      alert('Your session has expired. Please log in again.');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        saveToken,
        removeToken,
        checkTokenExpiration,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
