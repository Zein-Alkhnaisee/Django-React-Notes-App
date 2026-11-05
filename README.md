# Django + React Notes App

A full-stack notes application built with Django REST Framework on the backend and React (Vite) on the frontend. The app allows users to register, log in securely with JWT authentication, and manage their personal notes.

## Live Demo
[Click here to view the live application](https://notes-app-frontend-bm2k.onrender.com)

**Important Note:** Because this app is hosted on Render's free tier, the backend server might take 30-50 seconds to wake up on the first request. Please be patient if the initial load is slow.

## Features

- User registration and secure authentication.
- JWT-based login (Access and Refresh tokens).
- Protected routes for authenticated users only.
- Create, view, and delete personal notes.
- Responsive and modern dashboard UI.
- Dark glassmorphism-inspired design.
- Toast notifications for a smooth user experience.
- Full API integration between frontend and backend.

## Tech Stack

### Backend
- Python / Django
- Django REST Framework (DRF)
- djangorestframework-simplejwt (for authentication)
- PostgreSQL (Production Database) / SQLite (Local Development)
- Gunicorn (WSGI Server) and WhiteNoise (Static Files)

### Frontend
- React.js (Vite)
- React Router DOM
- Axios (for API requests)
- Tailwind CSS (for styling)

### Deployment and DevOps
- Render (Web Service, Static Site, PostgreSQL Database)
- GitHub (Version Control)

## Project Structure

```bash
Django-React/
├── backend/
│   ├── api/
│   ├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   └── build.sh
├── frontend/
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
└── README.md
