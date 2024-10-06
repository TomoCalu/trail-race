import React, { createContext, useCallback, useEffect, useState } from 'react';
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
      logout();
    }
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      fetchUserInfo(savedToken);
    }
  }, [fetchUserInfo]);

  const login = async (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    await fetchUserInfo(newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  const checkTokenExpiration = (response) => {
    if (response.status === 403) {
      logout();
      alert('Your session has expired. Please log in again.');
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, setToken, login, logout, checkTokenExpiration }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;