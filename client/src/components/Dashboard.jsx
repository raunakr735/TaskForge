import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { taskApi } from '../services/taskApi';
import { authApi } from '../services/authApi';
import Header from './Header';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import Footer from './Footer';
import Toast from './Toast';
import './Dashboard.css';

const COLUMNS = [
  { id: 'To Do', label: 'To Do', icon: '○' },
  { id: 'In Progress', label: 'In Progress', icon: '◐' },
  { id: 'Done', label: 'Done', icon: '●' },
];

export default function Dashboard() {
  const { token, user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, todo: 0, inProgress: 0, done: 0, overdue: 0 });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [toast, setToast] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({});
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const draggedTask = useRef(null);
  const searchTimeout = useRef(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, key: Date.now() });
  };

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const [taskRes, statsRes] = await Promise.all([
        taskApi.getAll(token, { ...filters, search }),
        taskApi.getStats(token),
      ]);
      setTasks(taskRes.data);
      setStats(statsRes.data);
    } catch (err) {
      showToast(err.message || 'Failed to fetch tasks', 'error');
    } finally {
      setLoading(false);
    }
  }, [token, filters, search]);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await authApi.getUsers(token);
      setUsers(res.data);
    } catch {
      // Non-critical
    }
  }, [token]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearchChange = (value) => {
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      setSearch(value);
    }, 350);
  };

  const handleCreate = async (taskData) => {
    try {
      await taskApi.create(token, taskData);
      showToast('Task created successfully!');
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      const msg = err.errors ? err.errors.map((e) => e.message).join(', ') : err.message;
      showToast(msg || 'Failed to create task', 'error');
    }
  };

  const handleUpdate = async (taskData) => {
    try {
      await taskApi.update(token, editingTask._id, taskData);
      showToast('Task updated successfully!');
      setEditingTask(null);
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      const msg = err.errors ? err.errors.map((e) => e.message).join(', ') : err.message;
      showToast(msg || 'Failed to update task', 'error');
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await taskApi.update(token, taskId, { status: newStatus });
      fetchTasks();
    } catch (err) {
      showToast(err.message || 'Failed to update status', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await taskApi.remove(token, id);
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

  const openAdd = (defaultStatus) => {
    setEditingTask(null);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  // Drag and Drop handlers
  const handleDragStart = (task) => {
    draggedTask.current = task;
  };

  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    setDragOverColumn(columnId);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e, columnId) => {
    e.preventDefault();
    setDragOverColumn(null);
    if (draggedTask.current && draggedTask.current.status !== columnId) {
      handleStatusChange(draggedTask.current._id, columnId);
    }
    draggedTask.current = null;
  };

  const getColumnTasks = (status) => tasks.filter((t) => t.status === status);

  return (
    <div className="dashboard">
      <Header
        onSearchChange={handleSearchChange}
        onAddClick={openAdd}
        onFilterChange={setFilters}
        filters={filters}
      />

      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="stat-card">
          <span className="stat-number">{stats.total}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-card stat-todo">
          <span className="stat-number">{stats.todo}</span>
          <span className="stat-label">To Do</span>
        </div>
        <div className="stat-card stat-progress">
          <span className="stat-number">{stats.inProgress}</span>
          <span className="stat-label">In Progress</span>
        </div>
        <div className="stat-card stat-done">
          <span className="stat-number">{stats.done}</span>
          <span className="stat-label">Done</span>
        </div>
        {stats.overdue > 0 && (
          <div className="stat-card stat-overdue">
            <span className="stat-number">{stats.overdue}</span>
            <span className="stat-label">Overdue</span>
          </div>
        )}
      </div>

      {/* Kanban Board */}
      {loading ? (
        <div className="loading">
          <div className="spinner" />
        </div>
      ) : (
        <div className="kanban-board">
          {COLUMNS.map((col) => {
            const columnTasks = getColumnTasks(col.id);
            return (
              <div
                key={col.id}
                className={`kanban-column ${dragOverColumn === col.id ? 'drag-over' : ''}`}
                onDragOver={(e) => handleDragOver(e, col.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, col.id)}
              >
                <div className={`kanban-column-header status-${col.id.replace(/\s/g, '-').toLowerCase()}`}>
                  <div className="column-title-group">
                    <span className="column-icon">{col.icon}</span>
                    <h2 className="column-title">{col.label}</h2>
                    <span className="column-count">{columnTasks.length}</span>
                  </div>
                  {col.id === 'To Do' && (
                    <button className="column-add-btn" onClick={() => openAdd('To Do')} title="Add task">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                  )}
                </div>
                <div className="kanban-column-body">
                  {columnTasks.length === 0 ? (
                    <div className="column-empty">
                      <p>No tasks</p>
                    </div>
                  ) : (
                    columnTasks.map((task) => (
                      <TaskCard
                        key={task._id}
                        task={task}
                        currentUser={user}
                        onEdit={openEdit}
                        onDelete={(id) => setDeleteConfirm(id)}
                        onStatusChange={handleStatusChange}
                        onDragStart={handleDragStart}
                      />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showForm && (
        <TaskForm
          onSubmit={editingTask ? handleUpdate : handleCreate}
          onCancel={closeForm}
          editingTask={editingTask}
          users={users}
          currentUser={user}
        />
      )}

      {deleteConfirm && (
        <div className="confirm-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-icon">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="12" stroke="var(--danger)" strokeWidth="1.5"/>
                <path d="M14 9V15M14 18V19" stroke="var(--danger)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>Delete Task?</h3>
            <p>This action cannot be undone. The task will be permanently removed.</p>
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

      <Footer />
    </div>
  );
}
