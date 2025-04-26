# Redeem Application

Redeem is a full-stack web application that allows users to redeem rewards using their accumulated points. The platform features a modern frontend and a robust backend, supporting authentication, user management, reward redemptions, and admin controls.

---

## Table of Contents
- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Backend](#backend)
- [Frontend](#frontend)
- [Data Models](#data-models)
- [How to Run](#how-to-run)

---

## Overview

Redeem is designed for organizations or communities to manage a points-based reward system. Users can:
- View available rewards
- Redeem rewards using their points
- View their redemption history
- (Admins) Manage users, add points, and create new rewards

---

## Technologies Used

### Backend
- **Elixir** (v1.15+)
- **Phoenix Framework** (v1.8+)
- **Absinthe** (GraphQL API)
- **Ecto** (Database ORM)
- **PostgreSQL** (Database)
- **Dataloader** (Efficient GraphQL data loading)
- **Bcrypt** (Password hashing)
- **JWT** (Authentication)

### Frontend
- **Next.js** (v15+)
- **React** (v19+)
- **Apollo Client** (GraphQL client)
- **Tailwind CSS** & **daisyUI** (UI styling)
- **TypeScript**

---

## Backend

The backend is built with Elixir and Phoenix, exposing a GraphQL API using Absinthe. Key features:
- **User authentication** (JWT-based)
- **Role-based access** (admin, user)
- **Reward and redemption management**
- **GraphQL queries and mutations**

**Start backend:**
```bash
cd api
mix setup
mix phx.server
```
GraphQL endpoint: `http://localhost:4000/graphql`

---

## Frontend

The frontend is a Next.js app using Apollo Client to communicate with the backend GraphQL API. Key features:
- **Login/Register**
- **View and redeem rewards**
- **View redemption history**
- **Admin dashboard for user and reward management**

**Start frontend:**
```bash
cd ui
npm install
npm run dev
```
App runs at: `http://localhost:3000`

---

## Data Models

### User
- `id`: string
- `email`: string
- `role`: string ("admin" or "user")
- `balance_points`: integer

### Reward
- `id`: string
- `name`: string
- `description`: string
- `value_per_unit`: integer
- `quantity`: integer
- `inserted_at`, `updated_at`: datetime

### Redemption
- `id`: string
- `quantity`: integer
- `reward`: Reward
- `inserted_at`, `updated_at`: datetime

---

## How to Run

1. **Backend**
    - Go to `api/`
    - Run `mix setup` to install dependencies and setup the database
    - Start the server: `mix phx.server`
2. **Frontend**
    - Go to `ui/`
    - Run `npm install` to install dependencies
    - Start the app: `npm run dev`

---

## Project Structure

```
redeem/
├── api/        # Phoenix backend (GraphQL API)
├── ui/         # Next.js frontend
└── README.md   # Project overview (this file)
```

---

## License
MIT
