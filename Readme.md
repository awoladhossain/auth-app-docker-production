# Auth App - Full Stack Authentication System 🔐

A complete full-stack authentication application built with **React**, **Node.js/Express**, and **MongoDB**. This project demonstrates modern web development practices with Docker containerization, JWT-based authentication, and production-ready deployment.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Running the Application](#running-the-application)
- [Docker Setup](#docker-setup)
- [Team Git Workflow](#team-git-workflow)

---

## 🎯 Project Overview

**Auth App** is a complete authentication system that allows users to:
- Register new accounts securely
- Login with email and password
- Access protected routes using JWT tokens
- Manage user sessions with persistent authentication

The application is designed with a **3-tier architecture** separating the presentation layer (Frontend), business logic layer (Backend), and data storage layer (Database).

---

## ✨ Features

✅ **User Authentication**
- Secure user registration with password hashing
- Login system with JWT token generation
- Token-based API authorization

✅ **Security**
- Password hashing using bcryptjs
- JWT (JSON Web Token) authentication
- CORS protection
- Protected routes and API endpoints

✅ **Full-Stack Application**
- Modern React UI with routing
- RESTful API backend
- MongoDB database integration
- Environment variable configuration

✅ **Docker Support**
- Development environment with docker-compose.dev.yml
- Production environment with docker-compose.yml
- Separate Dockerfiles for frontend and backend
- Custom Docker network for service communication

✅ **Professional Development Setup**
- Version control with Git
- Code linting with ESLint
- Hot-reload development mode
- Build optimization

---

## 🔧 Tech Stack

### **Frontend (React)**
- React 19.1.1
- React Router DOM 7.13.1 (Client-side routing)
- Vite (Build tool & dev server)
- ESLint (Code linting)
- CSS (Styling)

### **Backend (Node.js)**
- Express.js 5.2.1 (REST API framework)
- MongoDB 9.3.1 (Database)
- JWT (Authentication)
- bcryptjs (Password hashing)
- CORS (Cross-Origin Resource Sharing)
- dotenv (Environment variables)
- Nodemon (Development hot-reload)

### **DevOps & Tools**
- Docker & Docker Compose
- Docker Networks
- Docker Volumes
- Nginx (Production server)

---

## 🏗️ Project Architecture

### **3-Tier Architecture Explained**

The application follows a classic 3-tier architecture pattern:

![Docker Full Flow](./docker_full_flow.svg)

**Tier 1 — React Frontend (Port 5173 Dev / 80 Prod)**
- Handles user interface and user interactions
- Makes API calls to the backend
- Manages client-side state with React Context
- Provides Login, Register, and Home pages

**Tier 2 — Node.js + Express Backend (Port 5000)**
- Processes business logic
- Handles authentication and authorization
- Manages API endpoints (/api/auth, /api/home)
- Validates user input
- Issues and verifies JWT tokens
- Communicates with the database

**Tier 3 — MongoDB Database (Port 27017)**
- Stores user data securely
- Persists application state
- Manages collections for user information
- Protected data persistence with volumes

### **Docker Network Communication**

All services run on a custom Docker bridge network named `todo-net`:
- Services communicate using service names as DNS (e.g., "backend", "mongodb")
- Frontend connects to backend via `http://backend:5000`
- Backend connects to MongoDB via `mongodb://mongodb:27017`
- No need for hardcoded IP addresses
- Data volumes ensure persistent MongoDB storage

---

## 📁 Project Structure

```
auth-app/
├── 📄 Readme.md                    # This file
├── 🐳 docker-compose.yml            # Production Docker setup
├── 🐳 docker-compose.dev.yml        # Development Docker setup
├── 📊 docker_full_flow.svg          # Architecture diagram
├── 📊 team_git_docker_workflow.svg  # Team workflow diagram
│
├── 📦 backend/                      # Node.js/Express Backend
│   ├── Dockerfile                   # Production container config
│   ├── Dockerfile.dev               # Development container config
│   ├── package.json                 # Node.js dependencies
│   │
│   └── src/
│       ├── server.js                # Express app initialization
│       ├── config/
│       │   └── db.js                # MongoDB connection setup
│       ├── middleware/
│       │   └── auth.js              # JWT verification middleware
│       ├── models/
│       │   └── User.js              # MongoDB User schema
│       └── routes/
│           ├── authRoutes.js        # Register, Login endpoints
│           └── homeRoutes.js        # Protected user routes
│
├── 🎨 frontend/                     # React Frontend
│   ├── Dockerfile                   # Production container config
│   ├── Dockerfile.dev               # Development container config
│   ├── package.json                 # React dependencies
│   ├── vite.config.js               # Vite build configuration
│   ├── eslint.config.js             # Code linting rules
│   ├── nginx.conf                   # Nginx server config (production)
│   ├── index.html                   # HTML entry point
│   │
│   └── src/
│       ├── main.jsx                 # React app entry point
│       ├── App.jsx                  # Main app component with routing
│       ├── App.css                  # Global styles
│       ├── index.css                # Base styles
│       ├── context/
│       │   └── AuthContext.jsx      # Auth state management
│       ├── pages/
│       │   ├── Login.jsx            # Login page component
│       │   ├── Register.jsx         # Register page component
│       │   └── Home.jsx             # Protected home page
│       ├── assets/
│       │   ├── react.svg
│       │   └── vite.svg
│       └── public/
│           └── vite.svg
│
└── 🔐 .env.example                  # Example environment variables
   (Note: actual .env is NOT in git for security)
```

---

## 🚀 Getting Started

### **Prerequisites**

Make sure you have installed:
- **Node.js** (v16+) and **npm**
- **Docker** and **Docker Compose**
- **MongoDB** (if running without Docker)
- **Git** for version control

### **1. Clone the Repository**

```bash
git clone https://github.com/awoladhossain/auth-app-docker-production.git
cd auth-app
```

### **2. Set Up Environment Variables**

Create a `.env` file in the root directory (copy from `.env.example`):

```bash
# Backend configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173

# Database configuration
MONGO_URL=mongodb://mongodb:27017/auth_db

# JWT configuration
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRES_IN=7d
```

### **3. Install Dependencies (Local Development Only)**

If you're not using Docker:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

---

## ▶️ Running the Application

### **Option 1: Using Docker (Recommended) 🐳**

#### **Development Mode**
```bash
docker-compose -f docker-compose.dev.yml up --build
```

This will:
- Start MongoDB in a container
- Start Express backend with hot-reload (port 5000)
- Start React frontend with Vite dev server (port 5173)
- All services on the custom `todo-net` Docker network

#### **Production Mode**
```bash
docker-compose up --build
```

This will:
- Build optimized production images
- Run frontend with Nginx (port 80)
- Run backend (port 5000)
- Run MongoDB (port 27017)

### **Option 2: Local Development (Without Docker)**

#### **Terminal 1 - Start MongoDB**
```bash
# Make sure MongoDB service is running
mongod
```

#### **Terminal 2 - Start Backend**
```bash
cd backend
npm install  # First time only
npm run dev
# Runs on http://localhost:5000
```

#### **Terminal 3 - Start Frontend**
```bash
cd frontend
npm install  # First time only
npm run dev
# Runs on http://localhost:5173
```

---

## 🐳 Docker Setup Explained

### **Docker Compose Services**

**`docker-compose.dev.yml`** (Development):
```yaml
Services:
- mongodb:5173    - Database
- backend:5000    - API Server (with nodemon for hot-reload)
- frontend:5173   - React Dev Server (Vite)
```

**`docker-compose.yml`** (Production):
```yaml
Services:
- mongodb:27017   - Database
- backend:5000    - API Server
- frontend:80     - Nginx serving optimized build
```

### **Key Docker Features**

✅ **Custom Bridge Network** (`todo-net`): Services communicate using service names
✅ **Named Volumes**: MongoDB data persists across container restarts
✅ **Port Mapping**: Access services from host machine
✅ **Environment Variables**: Configuration passed to containers
✅ **Multi-stage Builds**: Optimized production images

### **Docker Commands**

```bash
# View running containers
docker ps

# View logs
docker logs container_name

# Stop all containers
docker-compose down

# Remove volumes (be careful!)
docker-compose down -v

# Rebuild without cache
docker-compose build --no-cache
```

---

## 👥 Team Git Workflow

This diagram shows how team members collaborate using Git and Docker:

![Team Git Docker Workflow](./team_git_docker_workflow.svg)

### **Workflow Steps**

**1️⃣ Team Lead - GitHub Setup**

The team lead manages the main repository:
- ✅ Code files push to GitHub
- ✅ Dockerfile, docker-compose files push to GitHub
- ✅ `.env.example` (template) pushes to GitHub
- ❌ `.env` (actual secrets) DOES NOT push to GitHub
- ❌ `node_modules` DOES NOT push to GitHub
- ❌ `dist` build folder DOES NOT push to GitHub

Secrets are shared via **Slack/WhatsApp**:
```
MONGO_URL=mongodb://...
JWT_SECRET=your_secret_key
PORT=5000
```

**2️⃣ Git Branch Strategy**

```
main branch (stable/production)
    ↓
develop branch (integration)
    ↙              ↘
feature/login   feature/register
(Member A)      (Member B)
    ↓                ↓
  code            code
    ↓                ↓
   PR              PR
  review         review
  merge          merge
    ↘              ↙
develop branch (updated)
```

**3️⃣ Member A - First Time Setup**

```
1. git clone <repo_url>
2. cd auth-app
3. Copy .env values from Slack
4. Create .env file
5. docker-compose -f docker-compose.dev.yml up
6. Access http://localhost:5173
```

**4️⃣ Developer Workflow**

```
# Create feature branch
git checkout -b feature/your-feature

# Make changes
# Test locally with Docker
docker-compose -f docker-compose.dev.yml up

# Commit and push
git add .
git commit -m "Add your feature"
git push origin feature/your-feature

# Create Pull Request on GitHub
# Team review code
# Merge to develop

# For production release
# Merge develop → main
# Deploy to production server
```

---

## 🔑 API Endpoints

### **Authentication Routes** (`/api/auth`)

#### **Register User**
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response (201 Created):
{
  "success": true,
  "message": "Account created successfully!",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### **Login User**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response (200 OK):
{
  "success": true,
  "message": "Login successful!",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### **Protected Routes** (`/api/home`)

All requests must include JWT token in header:
```
Authorization: Bearer <token>
```

#### **Get User Profile**
```http
GET /api/home/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

Response (200 OK):
{
  "success": true,
  "user": { /* user data */ }
}
```

### **Health Check**

```http
GET /api/health

Response (200 OK):
{
  "status": "✅ Backend is running!"
}
```

---

## 📦 Database Schema

### **User Model**

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed with bcryptjs),
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

---

## 🔐 Security Features

✅ **Password Hashing**: Passwords hashed with bcryptjs (salt rounds: 10)
✅ **JWT Tokens**: Secure token-based authentication
✅ **Token Expiration**: Tokens expire in 7 days by default
✅ **CORS Protection**: Cross-origin requests properly configured
✅ **Environment Variables**: Sensitive data in `.env` file (not in git)
✅ **Middleware Protection**: `protect` middleware validates all protected routes
✅ **Error Handling**: Generic error messages to prevent data leakage

---

## 🛠️ Development Commands

### **Backend**
```bash
cd backend
npm install        # Install dependencies
npm run dev        # Start with nodemon
npm test           # Run tests (if configured)
```

### **Frontend**
```bash
cd frontend
npm install        # Install dependencies
npm run dev        # Start Vite dev server
npm run build      # Build for production
npm run lint       # Run ESLint
```

### **Docker**
```bash
docker compose -f docker-compose.dev.yml up --build    # ইমেজ বিল্ড করে কন্টেইনার চালু করা
docker compose -f docker-compose.dev.yml up -d         # ব্যাকগ্রাউন্ডে (Detached) চালানো
docker compose -f docker-compose.dev.yml logs -f       # রিয়েল-টাইম লগ দেখা (সব সার্ভিসের)
docker compose -f docker-compose.dev.yml down          # কন্টেইনার ও নেটওয়ার্ক বন্ধ করা

docker compose up --build -d        # প্রোডাকশন ইমেজ বিল্ড করে ব্যাকগ্রাউন্ডে চালানো
docker compose logs -f backend      # শুধুমাত্র ব্যাকএন্ড সার্ভিসের লগ দেখা
docker compose down                 # প্রোডাকশন কন্টেইনারগুলো স্টপ করা
docker compose down -v              # স্টপ করা + ডাটাবেস ভলিউম (Data) পার্মানেন্টলি ডিলিট করা

docker compose ps                   # বর্তমানে কোন কোন কন্টেইনার রানিং আছে দেখা
docker stats                        # কন্টেইনারগুলো কতটুকু RAM/CPU খাচ্ছে তা দেখা (সিনিয়র টিপস!)
docker exec -it auth-backend sh     # রানিং কন্টেইনারের ভেতরে ঢুকে ফাইল চেক করা
```

---

## 📝 Environment Variables

### **Backend Environment Variables**

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment type | `development` or `production` |
| `PORT` | Backend server port | `5000` |
| `FRONTEND_URL` | Frontend application URL | `http://localhost:5173` |
| `MONGO_URL` | MongoDB connection string | `mongodb://mongodb:27017/auth_db` |
| `JWT_SECRET` | Secret key for JWT signing | `your_secret_key_here` |
| `JWT_EXPIRES_IN` | Token expiration time | `7d` (7 days) |

---

## 🚨 Troubleshooting

### **Port Already in Use**
```bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173 (frontend)
lsof -ti:5173 | xargs kill -9

# Kill process on port 27017 (MongoDB)
lsof -ti:27017 | xargs kill -9
```

### **Docker Network Issues**
```bash
# Inspect network
docker network ls
docker network inspect todo-net

# All services must be on same network
docker-compose ps
```

### **MongoDB Connection Failed**
```bash
# Check MongoDB is running
docker exec mongodb mongosh

# Check connection string in .env
# Format: mongodb://mongodb:27017/database_name
```

### **Clear Cache and Rebuild**
```bash
docker-compose down -v
docker system prune -a
docker-compose -f docker-compose.dev.yml up --build
```

---

## 📚 Learning Resources

- **React Docs**: https://react.dev
- **Express.js Guide**: https://expressjs.com
- **MongoDB Documentation**: https://docs.mongodb.com
- **Docker Guide**: https://docs.docker.com
- **JWT.io**: https://jwt.io

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Test with Docker: `docker-compose -f docker-compose.dev.yml up`
4. Commit: `git commit -m "Add your feature"`
5. Push: `git push origin feature/your-feature`
6. Create a Pull Request

### **Code Style**
- Follow ESLint rules for frontend
- Use meaningful variable names
- Add comments for complex logic
- Write clean, readable code

---

## 📄 License

This project is open source and available under the ISC License.

---

## 👨‍💻 Author

**Awolad Hossain**
- GitHub: [@awoladhossain](https://github.com/awoladhossain)

---

## ✅ Project Status

- ✅ User Registration & Login
- ✅ JWT Authentication
- ✅ Protected Routes
- ✅ Docker Support
- ✅ Production Ready
- 🔄 Coming Soon: Email Verification, Password Reset, 2FA

---

**Last Updated**: March 2026
**Version**: 1.0.0

