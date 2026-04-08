# Project Setup

This document explains how to set up and run both the **frontend** and **backend** of the project.

---

## Prerequisites

Make sure you have the following installed:

- **Node.js** version `20.20.x` (use [nvm](https://github.com/nvm-sh/nvm) to manage versions)
- **Yarn** package manager (v1.22.22 recommended)
- **Docker** and **Docker Compose** for backend

---

## Frontend Setup

The frontend is a Vite project running on **localhost:3000**. All API requests are proxied to **localhost:8000**.

### 1. Use the correct Node version

```bash
nvm use 20.20.x
```
### 2. Install Yarn globally (if needed)
```bash
npm install --global yarn
```
### 3. Verify Yarn installation
```
yarn --version
# Expected output: 1.22.22
```
### 4. Install project dependencies
```
yarn install
```
### 5. Run the development server
```
yarn run dev
```
The frontend will be available at http://localhost:3000.
### 6. Run lint checks
```
yarn run lint
```

## Backend Setup

The backend runs inside Docker containers using Docker Compose and is accessible on localhost:8000.

### 1. Build Docker images (no cache)
```
docker-compose build --no-cache
```
### 2. Start the backend
```
docker-compose up
```
### 3. Verify
The backend API should now be accessible at http://localhost:8000/api