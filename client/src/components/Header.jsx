import { useState } from 'react';
import './Header.css';

const CATEGORIES = ['All', 'General', 'Work', 'Personal', 'Shopping', 'Health', 'Education', 'Finance', 'Other'];
const SORT_OPTIONS = [
  { value: '', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'dueDate', label: 'Due Date' },
  { value: 'title', label: 'Title A-Z' },
];

export default function Header({ onFilterChange, onAddClick, taskCount }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSort, setActiveSort] = useState('');

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    onFilterChange({
      category: cat === 'All' ? '' : cat,
      completed: activeFilter === 'all' ? undefined : activeFilter === 'completed' ? 'true' : 'false',
      sort: activeSort,
    });
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    onFilterChange({
      category: activeCategory === 'All' ? '' : activeCategory,
      completed: filter === 'all' ? undefined : filter === 'completed' ? 'true' : 'false',
      sort: activeSort,
    });
  };

  const handleSortChange = (sort) => {
    setActiveSort(sort);
    onFilterChange({
      category: activeCategory === 'All' ? '' : activeCategory,
      completed: activeFilter === 'all' ? undefined : activeFilter === 'completed' ? 'true' : 'false',
      sort,
    });
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-brand">
          <div className="logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
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
            <p className="header-subtitle">{taskCount} task{taskCount !== 1 ? 's' : ''} total</p>
          </div>
        </div>
        <button className="btn-add" onClick={onAddClick}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          New Task
        </button>
      </div>

      <div className="header-filters">
        <div className="filter-group">
          <div className="status-filters">
            {['all', 'active', 'completed'].map((filter) => (
              <button
                key={filter}
                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => handleFilterChange(filter)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="filter-group">
          <div className="category-pills">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="filter-group">
          <select
            className="sort-select"
            value={activeSort}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
}
