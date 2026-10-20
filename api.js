const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `Request failed (${response.status})`);
  return data;
}

export const getProjects = () => request('/projects');
export const getExperience = () => request('/experience');
export const getBlogPosts = () => request('/blog');
export const getAchievements = () => request('/achievements');
export const sendContactMessage = (form) => request('/contacts', { method: 'POST', body: JSON.stringify(form) });
export const loginAdmin = (username, password) => request('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) });
export const getAdminContacts = (token) => request('/admin/contacts', { headers: { Authorization: `Bearer ${token}` } });
