const API_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/auth', '/jobs') : 'http://localhost:5000/api/v1/jobs';

export const getJobs = async (token, filters = {}) => {
  const params = new URLSearchParams();
  if (filters.role && filters.role.trim()) params.set('role', filters.role.trim());
  if (filters.skills && filters.skills.trim()) params.set('skills', filters.skills.trim());
  if (filters.deadline && filters.deadline.trim()) params.set('deadline', filters.deadline.trim());
  const queryString = params.toString();
  const url = queryString ? `${API_URL}?${queryString}` : API_URL;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch jobs');
  }
  return response.json();
};

export const getJobById = async (id, token) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch job');
  }
  return response.json();
};

export const createJob = async (jobData, token) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(jobData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to create job');
  }
  return response.json();
};

export const updateJob = async (id, jobData, token) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(jobData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to update job');
  }
  return response.json();
};

export const getJobApplicants = async (id, token) => {
  const response = await fetch(`${API_URL}/${id}/applicants`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch applicants');
  }
  return response.json();
};
