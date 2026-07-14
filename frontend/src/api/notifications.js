const API_BASE = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace('/auth', '/notifications')
  : 'http://localhost:5000/api/v1/notifications';

export const getNotifications = async (token) => {
  const res = await fetch(`${API_BASE}?limit=30`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch notifications');
  return data; // { data: [...], unreadCount }
};

export const markRead = async (id, token) => {
  const res = await fetch(`${API_BASE}/${id}/read`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to mark read');
  return data;
};

export const markAllRead = async (token) => {
  const res = await fetch(`${API_BASE}/read-all`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to mark all read');
  return data;
};
