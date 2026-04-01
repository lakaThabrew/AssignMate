import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const evaluationService = {
  getHistory: () => api.get('/history'),
  getById: (id) => api.get(`/history/${id}`),
  evaluate: (formData) => api.post('/evaluate', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

export default api;
