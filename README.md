<h1 align="center">ProductHub 🛍️</h1>

<p align="center">
  A modern full-stack e-commerce platform built with TypeScript, featuring a React frontend, Node.js API, PostgreSQL database, and Clerk authentication.
</p>

<div align="center">
  <img src="./client/public/banner.png" alt="Banner" width="900">
</div>

## 🔋 Features

- 🛒 **Full-featured product store** with shopping cart and checkout flow
- 🔐 **Secure authentication** using Clerk with role-based access
- 🗄️ **Type-safe database operations** with Drizzle ORM and PostgreSQL
- ⚛️ **Modern React frontend** with responsive design and beautiful UI
- ⚡ **Optimized data fetching** using TanStack Query for caching and performance
- 🎨 **Styled with Tailwind CSS** and DaisyUI components for rapid development
- 🟦 **Full TypeScript integration** across frontend and backend
- 🔄 **Real-time updates** and seamless API integration
- 📦 **Clean architecture** with separation of concerns and best practices
- 🚀 **Production-ready** with deployment guides and live demo

## ⚙️ Tech Stack

- **🎨 Frontend**: React, TypeScript, Tailwind CSS, DaisyUI, TanStack Query, Clerk
- **🛠 Backend**: Node.js, Express.js, TypeScript
- **🗄 Database**: PostgreSQL, Drizzle ORM
- **🔐 Authentication**: Clerk
- **📦 State Management**: TanStack Query, React Context
- **🔄 API Communication**: REST API with Axios

## 🤸 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/soumadip-dev/ProductHub.git
cd ProductHub
```

### 2. Backend Setup

```bash
cd server
pnpm install
```

Create a `.env` file in the `server` directory with the following variables:

```env
PORT=<YOUR_PORT_NUMBER>
DATABASE_URL=<YOUR_DB_URL>
NODE_ENV=<YOUR_NODE_ENV>
FRONTEND_URL=<YOUR_FRONTEND_URL>
CLERK_PUBLISHABLE_KEY=<YOUR_CLERK_PUBLISHABLE_KEY>
CLERK_SECRET_KEY=<YOUR_CLERK_SECRET_KEY>
```

### 3. Frontend Setup

```bash
cd ../client
pnpm install
```

Create a `.env` file in the `client` directory with the following variables:

```env
VITE_CLERK_PUBLISHABLE_KEY=<YOUR_CLERK_PUBLISHABLE_KEY>
VITE_API_URL=http://localhost:3000/api
```

### 4. Run the Application

- **Backend (Terminal 1)**:

```bash
cd server
pnpm run dev
```

- **Frontend (Terminal 2)**:

```bash
cd ../client
pnpm run dev
```
