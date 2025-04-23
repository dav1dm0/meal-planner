import axios from 'axios';

const api = axios.create({
  baseURL:  process.env.REACT_APP_SERVER_URL || 'https://ptjthcpk-5000.uks1.devtunnels.ms/api',
  withCredentials: true,
});

// Request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log('Axios header token:', token);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor for auth token
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export function setAuthToken(token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Auth endpoints
export const login = (data) => api.post('/auth/login', data);
export const register = (data) => api.post('/auth/register', data);
export const logout = () => api.post('/auth/logout');

// User endpoints
export const getUserProfile = () => api.get('/users/me');
export const getPet = () => api.get('users/preferences')
export const setPet = (petType) => api.post('/users/preferences', petType);
export const getUserPreferences = () => api.get('users/preferences/modify')
export const updateUserPreferences = (prefs) => api.put('/users/preferences/modify', prefs);
export const deleteUserAccount = () => api.delete('/users/delete');


// Points
export const completeMeal = () => api.post('/points/complete');
export const getPoints = () => api.get('/points');

// Leaderboard
export const getLeaderboard = () => api.get('/leaderboard');




