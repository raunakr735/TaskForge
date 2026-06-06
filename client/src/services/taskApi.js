const API_BASE = '/api/tasks';

function getHeaders(token) {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

async function handleResponse(res) {
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

export const taskApi = {
  // Get all tasks with optional filters
  async getAll(token, filters = {}) {
    const params = new URLSearchParams();
    if (filters.status) params.set('status', filters.status);
    if (filters.priority) params.set('priority', filters.priority);
    if (filters.assignedTo) params.set('assignedTo', filters.assignedTo);
    if (filters.search) params.set('search', filters.search);
    if (filters.sort) params.set('sort', filters.sort);

    const query = params.toString();
    const res = await fetch(`${API_BASE}${query ? `?${query}` : ''}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(res);
  },

  // Get task stats
  async getStats(token) {
    const res = await fetch(`${API_BASE}/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(res);
  },

  // Create a new task
  async create(token, task) {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(task),
    });
    return handleResponse(res);
  },

  // Update a task
  async update(token, id, updates) {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: getHeaders(token),
      body: JSON.stringify(updates),
    });
    return handleResponse(res);
  },

  // Delete a task
  async remove(token, id) {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(res);
  },
};
