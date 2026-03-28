# TaskForge 🚀

A full-featured **Task Management** application built with **Node.js**, **Express**, **MongoDB**, and **React**. Features a beautiful dark-themed UI with glassmorphism design, smooth animations, and complete CRUD operations.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)

## ✨ Features

- **Create** tasks with title, description, due date, and category
- **View** all tasks with filtering and sorting
- **Edit** task details
- **Mark tasks as completed** (with guard against double-completion)
- **Delete** tasks with confirmation dialog
- **Filter** by status (all/active/completed) and category
- **Sort** by newest, oldest, due date, or title
- **Due dates** with overdue detection
- **8 task categories**: General, Work, Personal, Shopping, Health, Education, Finance, Other
- **Responsive** dark-themed UI with glassmorphism and animations
- **Toast notifications** for all operations
- **Form validation** (client-side and server-side)
- **Unit tests** with Jest & Supertest

## 🏗️ Project Structure

```
TaskForge/
├── src/                        # Backend source
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   └── taskController.js  # CRUD logic
│   ├── middleware/
│   │   ├── errorHandler.js    # Global error handler
│   │   └── validate.js        # Input validation
│   ├── models/
│   │   └── Task.js            # Mongoose schema
│   ├── routes/
│   │   └── taskRoutes.js      # API routes
│   ├── app.js                 # Express app setup
│   └── server.js              # Entry point
├── client/                     # React frontend (Vite)
│   ├── public/                # Static assets
│   └── src/
│       ├── components/        # React components
│       ├── services/          # API service layer
│       ├── App.jsx            # Main app component
│       └── index.css          # Design system
├── .env.example               # Environment template
├── package.json
└── README.md
```

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
   Edit `.env` and set your MongoDB connection string:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/taskforge
   ```

5. **Start the backend** (in terminal 1)
   ```bash
   npm run dev
   ```

6. **Start the frontend** (in terminal 2)
   ```bash
   npm run client:dev
   ```

7. Open **http://localhost:5173** in your browser

### Running Tests

```bash
npm test
```

Tests use an in-memory MongoDB instance (`mongodb-memory-server`), so no MongoDB connection is needed.

## 📡 API Reference

Base URL: `http://localhost:3000/api`

| Method   | Endpoint              | Description                     |
|----------|-----------------------|---------------------------------|
| `POST`   | `/api/tasks`          | Create a new task               |
| `GET`    | `/api/tasks`          | Get all tasks (with filters)    |
| `GET`    | `/api/tasks/:id`      | Get a single task               |
| `PUT`    | `/api/tasks/:id`      | Update task details             |
| `PATCH`  | `/api/tasks/:id/complete` | Mark task as completed      |
| `DELETE` | `/api/tasks/:id`      | Delete a task                   |

### Query Parameters (GET /api/tasks)

| Param      | Values                               | Description        |
|------------|--------------------------------------|---------------------|
| `completed`| `true` / `false`                     | Filter by status   |
| `category` | `General`, `Work`, `Personal`, etc.  | Filter by category |
| `sort`     | `dueDate`, `title`, `oldest`         | Sort order         |

### Request Body (POST / PUT)

```json
{
  "title": "Complete project",
  "description": "Finish all requirements",
  "dueDate": "2026-04-15",
  "category": "Work"
}
```

### Response Format

```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [{ "field": "title", "message": "Task title is required" }]
}
```

## 🎨 Design Decisions

1. **Separation of Concerns**: Backend is split into config, models, controllers, middleware, and routes layers for maintainability.
2. **Express-Validator**: Used for server-side validation instead of relying solely on Mongoose validation, giving more control over error messages.
3. **Global Error Handler**: A centralized middleware catches all errors (Mongoose validation, CastError, duplicate keys) and returns consistent JSON responses.
4. **Completion Guard**: The PATCH `/complete` endpoint explicitly prevents marking already-completed tasks as completed again, returning a `400` error.
5. **React + Vite**: Frontend uses Vite for fast development with HMR. Proxy configuration forwards API calls to Express in development.
6. **Dark Theme Design**: Modern glassmorphism aesthetic with animated background blobs, gradient accents, smooth micro-animations, and responsive layout.
7. **In-Memory Test DB**: Tests use `mongodb-memory-server` for isolation — no external database needed to run tests.

## 📝 License

ISC
