const API_BASE = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace('/auth', '/applications')
  : 'http://localhost:5000/api/v1/applications';

export const applyToJob = async (jobId, token) => {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ jobId }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to apply');
  return data;
};

export const getMyApplications = async (token) => {
  const response = await fetch(API_BASE, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to fetch applications');
  return data;
};

export const getApplicantsByJob = async (jobId, token) => {
  const response = await fetch(`${API_BASE}/${jobId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to fetch applicants');
  return data;
};

export const updateApplicationStatus = async (appId, status, token) => {
  const response = await fetch(`${API_BASE}/${appId}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to update status');
  return data;
};
