import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

const buildUserHeaders = (context = {}) => {
  const headers = {};
  if (context.email) headers['x-user-email'] = context.email;
  if (context.name) headers['x-user-name'] = context.name;
  if (context.role) headers['x-user-role'] = context.role;
  return headers;
};

export const evaluationService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  forgotPassword: (data) => api.post('/auth/forgot-password', data),
  resetPassword: (data) => api.post('/auth/reset-password', data),
  getHistory: (context) => api.get('/history', { headers: buildUserHeaders(context) }),
  getById: (id, context) => api.get(`/history/${id}`, { headers: buildUserHeaders(context) }),
  evaluate: (formData, context) => api.post('/evaluate', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...buildUserHeaders(context),
    }
  }),
  getAnalyticsSummary: (context) => api.get('/analytics/summary', { headers: buildUserHeaders(context) }),
  getRubrics: () => api.get('/rubrics'),
  createRubric: (data) => api.post('/rubrics', data),
  deleteRubric: (id) => api.delete(`/rubrics/${id}`),
  parseRubric: (text) => api.post('/rubrics/parse', { text }),
};

export default api;
