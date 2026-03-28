import './EmptyState.css';

export default function EmptyState({ onAddClick }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <rect x="12" y="18" width="56" height="50" rx="8" stroke="url(#emptyGrad)" strokeWidth="2" fill="none" />
          <path d="M24 34H56M24 44H44M24 54H36" stroke="url(#emptyGrad)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="60" cy="56" r="14" fill="var(--bg-primary)" stroke="url(#emptyGrad)" strokeWidth="2" />
          <path d="M55 56H65M60 51V61" stroke="url(#emptyGrad)" strokeWidth="2" strokeLinecap="round" />
          <defs>
            <linearGradient id="emptyGrad" x1="12" y1="18" x2="70" y2="68">
              <stop stopColor="#6366f1" />
              <stop offset="1" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <h3 className="empty-title">No tasks yet</h3>
      <p className="empty-desc">Create your first task and start being productive!</p>
      <button className="btn-add-empty" onClick={onAddClick}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 3V15M3 9H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        Create Task
      </button>
    </div>
  );
}
