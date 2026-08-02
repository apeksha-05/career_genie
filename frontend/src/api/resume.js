const API_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/auth', '/resumes') : 'http://localhost:5000/api/v1/resumes';

export const uploadResume = async (formData, token) => {
  const response = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData,
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to upload resume');
  }
  return data;
};

export const getMyResume = async (token) => {
  const response = await fetch(`${API_URL}/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch resume');
  }
  return data;
};
