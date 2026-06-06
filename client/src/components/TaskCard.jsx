import './TaskCard.css';

const PRIORITY_CONFIG = {
  High: { color: '#ef4444', label: 'High' },
  Medium: { color: '#f59e0b', label: 'Med' },
  Low: { color: '#10b981', label: 'Low' },
};

export default function TaskCard({ task, currentUser, onEdit, onDelete, onStatusChange, onDragStart }) {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'Done';
  const isOwner = task.createdBy?._id === currentUser?._id;

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const priorityCfg = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.Medium;

  const assigneeName = task.assignedTo?.name;
  const assigneeInitial = assigneeName?.charAt(0)?.toUpperCase();

  return (
    <div
      className={`task-card ${task.status === 'Done' ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}
      draggable
      onDragStart={() => onDragStart(task)}
    >
      <div className="task-card-top">
        <span
          className="priority-badge"
          style={{ '--p-color': priorityCfg.color }}
        >
          {priorityCfg.label}
        </span>
        {isOverdue && <span className="overdue-badge">Overdue</span>}
      </div>

      <h3 className={`task-title ${task.status === 'Done' ? 'strikethrough' : ''}`}>
        {task.title}
      </h3>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-meta">
        {task.dueDate && (
          <span className={`due-date ${isOverdue ? 'overdue-text' : ''}`}>
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M7 4V7L9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            {formatDate(task.dueDate)}
          </span>
        )}

        {assigneeName && (
          <span className="assignee-badge" title={`Assigned to ${assigneeName}`}>
            <span className="assignee-avatar">{assigneeInitial}</span>
            {assigneeName.split(' ')[0]}
          </span>
        )}
      </div>

      {isOwner && (
        <div className="task-card-actions">
          <button className="action-btn edit-btn" onClick={() => onEdit(task)} title="Edit task">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="action-btn delete-btn" onClick={() => onDelete(task._id)} title="Delete task">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 4H13M5.5 4V3C5.5 2.45 5.95 2 6.5 2H9.5C10.05 2 10.5 2.45 10.5 3V4M6.5 7V12M9.5 7V12M4 4L4.5 13C4.5 13.55 4.95 14 5.5 14H10.5C11.05 14 11.5 13.55 11.5 13L12 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
