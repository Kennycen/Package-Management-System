# Package Management System

A modern, full-stack web application designed to streamline package management in residential and commercial buildings. This system allows front desk staff to efficiently **log, track, and manage package deliveries** with automated tenant notifications.

## Features

- **Package Tracking** – Log and track incoming packages with detailed information
- **Smart Notifications** – Automated email notifications when packages arrive
- **Secure Authentication** – JWT-based authentication for front desk staff
- **Status Management** – Three-stage workflow: **Arrived → Notified → Picked Up**
- **Advanced Search** – Filter packages by tenant, carrier, date, or status
- **Responsive Design** – Works seamlessly on desktop, tablet, and mobile
- **AI Chatbot** – Built-in assistant for package management queries
- **Analytics** – Track package volume and pickup patterns

## Architecture

### Backend (Node.js + Express)
- **RESTful API** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT Authentication** with bcrypt password hashing
- **Email Service** with Nodemailer
- **AI Integration** with Google Generative AI
- **Comprehensive Testing** with Vitest

### Frontend (React + Vite)
- **Modern React** with hooks and context
- **Vite** for fast development and building
- **Tailwind CSS** for responsive styling
- **Framer Motion** for smooth animations
- **React Router** for navigation
- **Axios** for API communication

### DevOps & Deployment
- **Docker** containerization for both dev and production
- **GitHub Actions** CI/CD pipeline
- **Multi-stage builds** for optimized production images
- **Health checks** and monitoring
- **Automated deployment** to AWS EC2

## Quick Start

### Prerequisites
- **Node.js** (v20 or higher)
- **Docker** and **Docker Compose**
- **MongoDB** (local or MongoDB Atlas)
- **Git**

### Option 1: Docker Development (Recommended)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/package-management-system.git
   cd package-management-system
   ```

2. **Start development environment:**
   ```bash
   # Start backend and frontend with hot reload
   docker compose -f docker-compose.dev.yml up -d
   ```

3. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:4000
   - Health Check: http://localhost:4000/health

## Testing

### Run All Tests
```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test

# Run tests in Docker
docker compose -f docker-compose.dev.yml exec backend npm test
docker compose -f docker-compose.dev.yml exec frontend npm test
```

## Deployment

### Automated Deployment (CI/CD)

The project includes a complete CI/CD pipeline:

1. **Continuous Integration (CI)**
   - Runs on every push and pull request
   - Lints code with ESLint
   - Runs comprehensive test suites
   - Builds and validates both frontend and backend

2. **Continuous Deployment (CD)**
   - Automatically deploys to production on main branch
   - Builds optimized Docker images
   - Deploys to AWS EC2 with zero downtime

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 
