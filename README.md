# 🚀 TaskFlow – Smart Task Management System

TaskFlow is a **full-stack role-based task management system** built using the MERN stack.  
It allows users to register, login, and manage daily tasks with a clean and modern dashboard UI.

The project includes **JWT authentication, role-based access, CRUD operations, analytics dashboard, and responsive frontend UI**.

---

## ✨ Features

### 🔐 Authentication
- User Registration & Login
- JWT-based authentication
- Password hashing (bcrypt)
- Protected routes

### 👤 Role-Based Access
- User & Admin roles (scalable architecture)

### 📋 Task Management (CRUD)
- Create tasks
- Read all tasks
- Update tasks
- Delete tasks
- Mark tasks as completed/pending

### 📊 Dashboard Features
- Task statistics (Total / Completed / Pending)
- Interactive Doughnut chart
- Dynamic greeting (Good morning/afternoon/evening)
- Search & filter tasks

### 🎨 Frontend UI
- Modern SaaS-style dashboard
- Responsive design (mobile/tablet/desktop)
- Beautiful task cards with animations
- Clean authentication pages

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Axios
- React Router DOM
- Chart.js + react-chartjs-2
- React Toastify
- CSS3 (Custom Responsive UI)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs
- CORS

---

## 📁 Project Structure
TaskFlow/
│
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── server.js
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/
│ │ ├── App.jsx
│ │ └── main.jsx
│
└── README.md


---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/taskflow.git
cd taskflow

2️⃣ Backend Setup

cd backend
npm install

Create .env file:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


Run backend:
npm start

3️⃣ Frontend Setup
cd frontend
npm install

Create .env file:
VITE_API_URL=http://localhost:5000/api/v1

Run frontend:
npm run dev

🌐 API Endpoints
Auth Routes
POST /api/v1/auth/register
POST /api/v1/auth/login

Task Routes (Protected)
GET    /api/v1/tasks
POST   /api/v1/tasks
PUT    /api/v1/tasks/:id
DELETE /api/v1/tasks/:id

Deployment
Frontend: Vercel / Netlify
Backend: Render
Database: MongoDB Atlas

🔒 Security Features
JWT authentication
Password hashing
Protected routes
Input validation
CORS configuration

Future Improvements
Dark mode 🌙
Drag & drop tasks
Real-time updates (Socket.io)
Redis caching
Email notifications

👨‍💻 Author
Samal Kumar
Full Stack Developer (MERN)
