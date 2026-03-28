import './TaskCard.css';

const CATEGORY_COLORS = {
  General: '#94a3b8',
  Work: '#6366f1',
  Personal: '#8b5cf6',
  Shopping: '#f59e0b',
  Health: '#10b981',
  Education: '#06b6d4',
  Finance: '#ef4444',
  Other: '#ec4899',
};

export default function TaskCard({ task, onComplete, onEdit, onDelete }) {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const categoryColor = CATEGORY_COLORS[task.category] || CATEGORY_COLORS.General;

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <div className="task-card-left">
        <button
          className={`check-btn ${task.completed ? 'checked' : ''}`}
          onClick={() => !task.completed && onComplete(task._id)}
          disabled={task.completed}
          title={task.completed ? 'Already completed' : 'Mark as completed'}
        >
          {task.completed && (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </div>

      <div className="task-card-content">
        <div className="task-card-header">
          <h3 className={`task-title ${task.completed ? 'strikethrough' : ''}`}>{task.title}</h3>
          <span className="category-badge" style={{ '--cat-color': categoryColor }}>
            {task.category}
          </span>
        </div>

        {task.description && (
          <p className="task-description">{task.description}</p>
        )}

        <div className="task-meta">
          {task.dueDate && (
            <span className={`due-date ${isOverdue ? 'overdue-text' : ''}`}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M7 4V7L9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              {formatDate(task.dueDate)}
            </span>
          )}
          <span className="created-date">
            Created {formatDate(task.createdAt)}
          </span>
        </div>
      </div>

      <div className="task-card-actions">
        <button className="action-btn edit-btn" onClick={() => onEdit(task)} title="Edit task">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className="action-btn delete-btn" onClick={() => onDelete(task._id)} title="Delete task">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 4H13M5.5 4V3C5.5 2.45 5.95 2 6.5 2H9.5C10.05 2 10.5 2.45 10.5 3V4M6.5 7V12M9.5 7V12M4 4L4.5 13C4.5 13.55 4.95 14 5.5 14H10.5C11.05 14 11.5 13.55 11.5 13L12 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
