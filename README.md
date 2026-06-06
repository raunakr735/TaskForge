# TaskForge 🚀

A full-stack **Team Task Management System** built with **Node.js**, **Express**, **MongoDB**, and **React**. Features a Kanban board, JWT authentication, team collaboration, drag-and-drop task management, and a beautiful dark-themed UI with glassmorphism design.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white)

## 🎯 Project Overview

TaskForge is a real-world productivity tool (similar to a simplified Trello) where users can:

- **Register and authenticate** securely with JWT tokens
- **Create, manage, and track tasks** through a visual Kanban board
- **Collaborate with team members** by assigning tasks to other users
- **Search and filter** tasks by priority and keyword
- **Drag and drop** tasks between status columns (To Do → In Progress → Done)

This is not a tutorial CRUD app — it's a thoughtfully built system with proper error handling, input validation, permission checks, and a polished user experience.

## ✨ Features

### Authentication
- JWT-based register/login/logout
- Protected routes — unauthenticated users cannot access the dashboard
- Password hashing with bcrypt (12 salt rounds)
- Token persistence in localStorage with auto-verification on page load

### Task Management (Kanban Board)
- **Three-column Kanban**: To Do → In Progress → Done
- **Drag and drop** between columns (HTML5 DnD API — zero dependencies)
- Create tasks with title, description, status, priority, due date, and assignee
- Edit and delete with permission checks (only task creators can modify/delete)
- Assignees can update task status but not edit other fields

### Team Collaboration
- Assign tasks to any registered user
- View tasks you created and tasks assigned to you
- User list fetched dynamically for the assignment dropdown

### Search & Filters
- Real-time search with debounce (350ms) across title and description
- Filter by priority (High / Medium / Low)
- Dashboard stats bar: Total, To Do, In Progress, Done, Overdue counts

### UI/UX
- Dark theme with glassmorphism and animated background blobs
- Responsive design (desktop Kanban → mobile stacked columns)
- Micro-animations: card slide-in, modal transitions, shake on error, hover effects
- Toast notifications for all operations
- User avatar menu with profile info and sign-out
- Footer with developer info and social links

### Data Handling
- Server-side validation with `express-validator`
- Client-side validation with clear error messages
- Centralized error handler for Mongoose errors (CastError, ValidationError, duplicate keys)
- Efficient data fetching — parallel `Promise.all` for tasks + stats
- MongoDB indexes for optimized queries

## 🏗️ Architecture

```
TaskForge/
├── src/                           # Backend (Express + Node.js)
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Register, login, getMe, getUsers
│   │   └── taskController.js     # CRUD + stats + permission checks
│   ├── middleware/
│   │   ├── auth.js               # JWT verification + role authorization
│   │   ├── errorHandler.js       # Centralized error handling
│   │   └── validate.js           # Input validation rules
│   ├── models/
│   │   ├── User.js               # User schema (bcrypt, roles)
│   │   └── Task.js               # Task schema (status, priority, refs)
│   ├── routes/
│   │   ├── authRoutes.js         # /api/auth/*
│   │   └── taskRoutes.js         # /api/tasks/* (protected)
│   ├── app.js                    # Express app setup
│   └── server.js                 # Entry point
├── client/                        # Frontend (React + Vite)
│   └── src/
│       ├── components/
│       │   ├── AuthPage.jsx      # Login/Register with tab switching
│       │   ├── Dashboard.jsx     # Kanban board + stats + DnD
│       │   ├── Header.jsx        # Search, filters, user menu
│       │   ├── TaskCard.jsx      # Draggable task card
│       │   ├── TaskForm.jsx      # Create/edit modal
│       │   ├── Footer.jsx        # Developer links
│       │   └── Toast.jsx         # Notification system
│       ├── context/
│       │   └── AuthContext.jsx   # Auth state management
│       ├── services/
│       │   ├── authApi.js        # Auth API calls
│       │   └── taskApi.js        # Task API calls (JWT-aware)
│       └── App.jsx               # Root with auth routing
├── vercel.json                    # Deployment configuration
├── .env.example                   # Environment template
└── README.md
```

## 🛠️ Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Runtime** | Node.js | Non-blocking I/O, large ecosystem |
| **Backend** | Express.js | Minimal, flexible, industry standard |
| **Database** | MongoDB + Mongoose | Flexible schema for evolving task fields, built-in validation |
| **Auth** | JWT + bcryptjs | Stateless auth, secure password hashing |
| **Validation** | express-validator | Declarative server-side validation |
| **Frontend** | React 19 + Vite | Fast HMR, modern hooks, efficient bundling |
| **Styling** | Vanilla CSS (design tokens) | Full control, no framework lock-in, consistent design system |
| **Testing** | Jest + Supertest | Standard for Node.js APIs |

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ — [Download](https://nodejs.org/)
- **MongoDB** — [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ujjawal-singh1/TaskForge.git
   cd TaskForge
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client && npm install && cd ..
   ```

4. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   Edit `.env`:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/taskforge
   JWT_SECRET=your_strong_secret_here
   JWT_EXPIRE=7d
   ```

5. **Start the backend** (terminal 1)
   ```bash
   npm run dev
   ```

6. **Start the frontend** (terminal 2)
   ```bash
   npm run client:dev
   ```

7. Open **http://localhost:5173** in your browser

### Running Tests

```bash
npm test
```

Tests use an in-memory MongoDB instance (`mongodb-memory-server`), so no running database is needed.

## 📡 API Reference

Base URL: `http://localhost:3000/api`

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/auth/register` | Create a new account | No |
| `POST` | `/api/auth/login` | Login and get JWT | No |
| `GET` | `/api/auth/me` | Get current user | Yes |
| `GET` | `/api/auth/users` | List all users | Yes |

### Tasks (all require JWT)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/tasks` | Create a new task |
| `GET` | `/api/tasks` | Get user's tasks (with filters) |
| `GET` | `/api/tasks/stats` | Get dashboard statistics |
| `GET` | `/api/tasks/:id` | Get a single task |
| `PUT` | `/api/tasks/:id` | Update a task |
| `DELETE` | `/api/tasks/:id` | Delete a task |

### Query Parameters (GET /api/tasks)

| Param | Example | Description |
|-------|---------|-------------|
| `status` | `To Do`, `In Progress`, `Done` | Filter by status |
| `priority` | `High`, `Medium`, `Low` | Filter by priority |
| `search` | `project` | Search title & description |
| `sort` | `dueDate`, `title`, `oldest`, `priority` | Sort order |
| `assignedTo` | `<userId>` | Filter by assignee |

### Request Body Examples

**Register:**
```json
{ "name": "John Doe", "email": "john@example.com", "password": "securepass" }
```

**Create Task:**
```json
{
  "title": "Design landing page",
  "description": "Create wireframes and final design",
  "status": "To Do",
  "priority": "High",
  "dueDate": "2026-04-20",
  "assignedTo": "userId123"
}
```

## 🎨 Key Design Decisions

1. **Express + React over Next.js**: The existing codebase was already structured as a separate backend (Express) and frontend (React+Vite). Migrating to Next.js under time constraints would introduce risk without proportional benefit. This separation also better demonstrates understanding of API design and full-stack architecture.

2. **Vanilla CSS Design System**: Instead of Tailwind, I maintain a CSS custom properties (design tokens) system. This gives full control over the design, avoids class name bloat, and creates a consistent visual language with variables for colors, spacing, shadows, and transitions.

3. **HTML5 Drag & Drop (no library)**: Kanban drag-and-drop is implemented using native browser APIs rather than `react-beautiful-dnd` or similar. This demonstrates understanding of browser APIs and keeps the bundle small.

4. **JWT in localStorage**: For this demo application, JWT stored in localStorage provides a clean authentication flow. In a production system with higher security requirements, httpOnly cookies would be preferred to mitigate XSS risks.

5. **Permission Model**: Task creators have full CRUD access. Assigned users can only change task status. This simple but practical model prevents unauthorized modifications while enabling collaboration.

6. **Optimistic parallel fetching**: Dashboard loads tasks and stats simultaneously via `Promise.all`, reducing perceived load time.

7. **Debounced search**: The search input waits 350ms after the user stops typing before hitting the API, preventing unnecessary requests during rapid typing.

## ⚡ Performance Considerations

- **MongoDB indexes** on `createdBy`, `assignedTo`, and text search fields
- **Debounced search** reduces API calls during typing
- **Parallel data fetching** with `Promise.all` for tasks + stats
- **Component-level CSS** — no unused styles loaded
- **Vite code splitting** — production builds are automatically optimized
- **Conditional rendering** — components mount/unmount based on auth state, not hidden with CSS

## 🔒 Security

- Passwords hashed with bcrypt (12 salt rounds)
- JWT tokens verified on every protected request
- Server-side input validation and sanitization
- MongoDB injection prevention via Mongoose parameterized queries
- CORS enabled for cross-origin API access
- `.env` excluded from version control

## 📝 License

ISC
