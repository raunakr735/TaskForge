import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Header.css';

export default function Header({ onSearchChange, onAddClick, onFilterChange, filters }) {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [activePriority, setActivePriority] = useState('');

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    onSearchChange(e.target.value);
  };

  const handlePriorityFilter = (priority) => {
    const newPriority = activePriority === priority ? '' : priority;
    setActivePriority(newPriority);
    onFilterChange({ ...filters, priority: newPriority || undefined });
  };

  const userInitial = user?.name?.charAt(0)?.toUpperCase() || '?';

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-brand">
          <div className="logo">
            <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="url(#logoGrad)" />
              <path d="M9 16L14 21L23 11" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32">
                  <stop stopColor="#6366f1" />
                  <stop offset="1" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div>
            <h1 className="header-title">TaskForge</h1>
            <p className="header-subtitle">Team Task Manager</p>
          </div>
        </div>

        <div className="header-actions">
          <div className="search-wrapper">
            <svg className="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search tasks..."
              value={searchValue}
              onChange={handleSearch}
              id="search-tasks"
            />
            {searchValue && (
              <button
                className="search-clear"
                onClick={() => { setSearchValue(''); onSearchChange(''); }}
                title="Clear search"
              >
                ×
              </button>
            )}
          </div>

          <button className="btn-add" onClick={onAddClick} id="add-task-btn">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 3V15M3 9H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="btn-add-text">New Task</span>
          </button>

          <div className="user-menu-wrapper">
            <button
              className="user-avatar-btn"
              onClick={() => setShowUserMenu(!showUserMenu)}
              title={user?.name}
              id="user-menu-btn"
            >
              {userInitial}
            </button>

            {showUserMenu && (
              <>
                <div className="user-menu-backdrop" onClick={() => setShowUserMenu(false)} />
                <div className="user-menu">
                  <div className="user-menu-info">
                    <div className="user-menu-avatar">{userInitial}</div>
                    <div>
                      <p className="user-menu-name">{user?.name}</p>
                      <p className="user-menu-email">{user?.email}</p>
                    </div>
                  </div>
                  <div className="user-menu-divider" />
                  <button className="user-menu-item logout-btn" onClick={logout} id="logout-btn">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 2H3C2.45 2 2 2.45 2 3V13C2 13.55 2.45 14 3 14H6M11 11L14 8L11 5M5.5 8H14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Sign Out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="header-filters">
        <div className="priority-filters">
          <span className="filter-label">Priority:</span>
          {['High', 'Medium', 'Low'].map((p) => (
            <button
              key={p}
              className={`priority-pill priority-${p.toLowerCase()} ${activePriority === p ? 'active' : ''}`}
              onClick={() => handlePriorityFilter(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
