# TaoCrowd Skills Test

A fullstack MERN application developed as a technical test.

## Live Deployments

- **Frontend with Mock API**: [https://taocrowdskilltest-mock.vercel.app/](https://taocrowdskilltest-mock.vercel.app/)
- **Frontend with Real API**: [https://tao-crowd-skills-test.vercel.app/](https://tao-crowd-skills-test.vercel.app/)
- **Backend API**: [https://taocrowdskilltestapi.onrender.com/](https://taocrowdskilltestapi.onrender.com/)

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **ORM**: Prisma
- **Deployment**: Vercel (Frontend) & Render (Backend)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB instance
- Git

## Local Development Setup

### 1. Clone the Repository

```bash
git clone git@github.com:Danvictorgithub/TaoCrowd_Skills_Test.git
cd TaoCrowd_Skills_Test
```

### 2. Environment Setup

#### Backend Configuration

1. Navigate to the backend directory

```bash
cd backend
```

2. Create a `.env` file based on `env.sample`

```
DATABASE_URL="your_mongodb_connection_string"
```

#### Frontend Configuration

1. Navigate to the frontend directory

```bash
cd frontend_api
```

2. Create a `.env` file based on `env.example`

```
VITE_BACKEND_URL=http://localhost:5000
```

### 3. Backend Setup

```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run seed  # Generate sample data
npm run dev   # Start development server
```

### 4. Frontend Setup

```bash
cd frontend_api
npm install
npm run dev
```

## Development Ports

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:5000](http://localhost:5000)

## About

This project is a technical assessment for the Fullstack Developer (MERN) position at [TaoCrowd](https://taocrowd.com/).
