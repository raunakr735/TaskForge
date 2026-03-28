<<<<<<< HEAD
<h1 align="center">🚀 Placify</h1>
<h3 align="center">Campus Placement Management System (Full Stack)</h3>


---

## 📘 Overview
**Placify** is a **full-stack placement management system** built with **React (frontend)**, **Spring Boot (backend)**, and **MongoDB (database)**.  
It helps **students, recruiters, and admins** efficiently manage campus placement workflows, and includes a **Quiz Module** to assess student skills.

---

## 🎯 Objectives
- Digitize and automate campus placement workflows.  
- Provide dashboards for students, recruiters, and admins.  
- Use MongoDB for scalable, flexible data storage.  
- Enable a modern, responsive, and interactive UI with React.  
- Assess students’ technical and aptitude skills through quizzes.

---

## 🧩 Key Features

### 👨‍🎓 Student Module
- Register, log in, and manage profiles  
- Browse placement drives and apply for jobs  
- Track application status and placement results  
- Attempt quizzes to evaluate technical and aptitude skills  

### 🏢 Company Module
- Post job openings with eligibility filters  
- View eligible students and shortlist candidates  
- Manage interviews and selection results  

### 🧑‍💼 Admin Module
- Approve/reject student & company registrations  
- Manage placement schedules and announcements  
- Generate reports and analytics dashboards  
- Create and manage quizzes for students  

### 📝 Quiz Module
- Admin can create multiple-choice quizzes  
- Students can attempt quizzes and get instant results  
- Quiz results help in candidate shortlisting  
- Supports technical, aptitude, and domain-specific quizzes  

---

## ⚙️ Tech Stack

<p align="left">
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" alt="React" width="50" height="50"/>
  <img src="https://www.vectorlogo.zone/logos/springio/springio-icon.svg" alt="Spring Boot" width="50" height="50"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg" alt="MongoDB" width="50" height="50"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg" alt="Java" width="50" height="50"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" alt="HTML5" width="50" height="50"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" alt="CSS3" width="50" height="50"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="JS" width="50" height="50"/>
</p>

---

## 🏗️ Project Structure

............

## 🛠️ Setup Instructions
```bash
# 1️⃣ Clone the Repository
git clone https://github.com/ujjawal-singh1/Placify.git
cd Placify

# 2️⃣ Backend (Spring Boot + MongoDB)
cd backend

# Configure MongoDB in application.properties:
# spring.data.mongodb.uri=mongodb://localhost:27017/placify_db
# spring.data.mongodb.database=placify_db

# Build & run the backend
mvn spring-boot:run

# 3️⃣ Frontend (React)
cd ../frontend
npm install
npm start

# Open in browser: http://localhost:3000


🧠 Future Enhancements
- Email/SMS notifications for students and recruiters
- AI-based resume screening & job recommendations
- Advanced analytics dashboards for admins
- Mobile app or PWA for real-time updates
- Timed quizzes with leaderboard for student assessments

👨‍💻 Team Members
Name           | Role
---------------|---------------------------------------
Ujjawal Kumar  | Full Stack Lead (React + Spring Boot + MongoDB)
Mana Panda     | Frontend Developer (React + UI/UX)
Rohit Soni     | Backend & Database (MongoDB)
Shubham Sharma | UI/UX & Testing

🧑‍🏫 Guided By
Tapas Pal Sir
Department of Information Technology
Asansol Engineering College

🪪 License
This project is for educational purposes.
=======
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
│   └── src/
│       ├── components/        # React components
│       ├── services/          # API service layer
│       ├── App.jsx            # Main app component
│       └── index.css          # Design system
├── tests/
│   └── task.test.js           # Unit tests
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
   git clone <your-repo-url>
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
|------------|--------------------------------------|--------------------|
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
>>>>>>> a7abd80 (feat: initialize full-stack TaskForge application with React frontend and Node.js backend API)
