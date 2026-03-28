const API_BASE = '/api/tasks';

export const taskApi = {
  // Get all tasks with optional filters
  async getAll(filters = {}) {
    const params = new URLSearchParams();
    if (filters.completed !== undefined) params.set('completed', filters.completed);
    if (filters.category) params.set('category', filters.category);
    if (filters.sort) params.set('sort', filters.sort);

    const query = params.toString();
    const res = await fetch(`${API_BASE}${query ? `?${query}` : ''}`);
    if (!res.ok) throw await res.json();
    return res.json();
  },

  // Create a new task
  async create(task) {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },

  // Update a task
  async update(id, updates) {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },

  // Mark a task as completed
  async markComplete(id) {
    const res = await fetch(`${API_BASE}/${id}/complete`, {
      method: 'PATCH',
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },

  // Delete a task
  async remove(id) {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },
};
