const BASE = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace('/auth', '/admin')
  : 'http://localhost:5000/api/v1/admin';

const headers = (token) => ({ Authorization: `Bearer ${token}` });

// Analytics
export const getAnalytics = async (token) => {
  const res = await fetch(`${BASE}/analytics`, { headers: headers(token) });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed');
  return data;
};

// Users
export const getUsers = async (params = {}, token) => {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE}/users?${qs}`, { headers: headers(token) });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed');
  return data;
};

export const updateUser = async (id, body, token) => {
  const res = await fetch(`${BASE}/users/${id}`, {
    method: 'PUT',
    headers: { ...headers(token), 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed');
  return data;
};

export const deleteUser = async (id, token) => {
  const res = await fetch(`${BASE}/users/${id}`, { method: 'DELETE', headers: headers(token) });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed');
  return data;
};

// Jobs moderation
export const getAdminJobs = async (params = {}, token) => {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE}/jobs?${qs}`, { headers: headers(token) });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed');
  return data;
};

export const approveJob = async (id, token) => {
  const res = await fetch(`${BASE}/jobs/${id}/approve`, { method: 'PUT', headers: headers(token) });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed');
  return data;
};

export const rejectJob = async (id, token) => {
  const res = await fetch(`${BASE}/jobs/${id}/reject`, { method: 'PUT', headers: headers(token) });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed');
  return data;
};
