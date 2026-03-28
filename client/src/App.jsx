import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';
import EmptyState from './components/EmptyState';
import Toast from './components/Toast';
import { taskApi } from './services/taskApi';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [toast, setToast] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [filters, setFilters] = useState({});

  const showToast = (message, type = 'success') => {
    setToast({ message, type, key: Date.now() });
  };

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await taskApi.getAll(filters);
      setTasks(res.data);
    } catch (err) {
      showToast(err.message || 'Failed to fetch tasks', 'error');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreate = async (taskData) => {
    try {
      await taskApi.create(taskData);
      showToast('Task created successfully!');
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      const msg = err.errors ? err.errors.map(e => e.message).join(', ') : err.message;
      showToast(msg || 'Failed to create task', 'error');
    }
  };

  const handleUpdate = async (taskData) => {
    try {
      await taskApi.update(editingTask._id, taskData);
      showToast('Task updated successfully!');
      setEditingTask(null);
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      const msg = err.errors ? err.errors.map(e => e.message).join(', ') : err.message;
      showToast(msg || 'Failed to update task', 'error');
    }
  };

  const handleComplete = async (id) => {
    try {
      await taskApi.markComplete(id);
      showToast('Task completed! 🎉');
      fetchTasks();
    } catch (err) {
      showToast(err.message || 'Failed to complete task', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await taskApi.remove(id);
      showToast('Task deleted');
      setDeleteConfirm(null);
      fetchTasks();
    } catch (err) {
      showToast(err.message || 'Failed to delete task', 'error');
    }
  };

  const openEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const openAdd = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <div className="app">
      <Header
        onFilterChange={setFilters}
        onAddClick={openAdd}
        taskCount={tasks.length}
      />

      {loading ? (
        <div className="loading">
          <div className="spinner" />
        </div>
      ) : tasks.length === 0 ? (
        <EmptyState onAddClick={openAdd} />
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onComplete={handleComplete}
              onEdit={openEdit}
              onDelete={(id) => setDeleteConfirm(id)}
            />
          ))}
        </div>
      )}

      {showForm && (
        <TaskForm
          onSubmit={editingTask ? handleUpdate : handleCreate}
          onCancel={closeForm}
          editingTask={editingTask}
        />
      )}

      {deleteConfirm && (
        <div className="confirm-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Task?</h3>
            <p>This action cannot be undone.</p>
            <div className="confirm-actions">
              <button className="btn-confirm-cancel" onClick={() => setDeleteConfirm(null)}>
                Cancel
              </button>
              <button className="btn-confirm-delete" onClick={() => handleDelete(deleteConfirm)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <Toast
          key={toast.key}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;
