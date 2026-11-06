# Django + React Notes App

<<<<<<< HEAD
A full-stack notes application built with Django REST Framework on the backend and React + Vite on the frontend. The app allows users to register, log in securely with JWT authentication, and manage their personal notes.

## Features

- User registration
- JWT-based login and authentication
- Protected routes for authenticated users only
- Create, view, and delete notes
- Responsive and modern dashboard UI
- Dark glassmorphism-inspired design
- API integration between frontend and backend
=======
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
>>>>>>> b7572688a4e14e285c0d125dc0abbecd438e475b

## Tech Stack

### Backend
<<<<<<< HEAD
- Python
- Django
- Django REST Framework
- djangorestframework-simplejwt
- SQLite database (can be switched to PostgreSQL/MySQL)

### Frontend
- React
- Vite
- React Router
- Axios
- Modern CSS styling
=======
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
>>>>>>> b7572688a4e14e285c0d125dc0abbecd438e475b

## Project Structure

```bash
Django-React/
├── backend/
│   ├── api/
│   ├── backend/
<<<<<<< HEAD
│   ├── db.sqlite3
=======
>>>>>>> b7572688a4e14e285c0d125dc0abbecd438e475b
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
<<<<<<< HEAD
```

## Screens and Pages

- Login page
- Registration page
- Home dashboard page with notes list
- Protected route handling for authenticated users
- Not Found page for invalid routes

## API Endpoints

### Authentication
- `POST /api/user/register/` — create a new user
- `POST /api/token/` — login and receive access/refresh tokens
- `POST /api/token/refresh/` — refresh expired access token

### Notes
- `GET /api/notes/` — get all notes for the authenticated user
- `POST /api/notes/` — create a note
- `DELETE /api/notes/delete/<id>/` — delete a note

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd Django-React
```

### 2. Backend setup

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Linux/macOS
# or
venv\Scripts\activate      # Windows

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

The backend runs at:

```bash
http://localhost:8000
```

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` folder:

```env
VITE_API_URL=http://localhost:8000
```

Then start the app:

```bash
npm run dev
```

The frontend runs at:

```bash
http://localhost:5173
```

## Environment Variables

### Backend
You can configure:

```env
SECRET_KEY=your_secret_key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

### Frontend
```env
VITE_API_URL=http://localhost:8000
```

## Usage

1. Open the frontend in the browser.
2. Register a new account.
3. Log in with your username and password.
4. Create your notes from the dashboard.
5. View or delete notes from the notes section.

## Notes

This project is a simple but complete example of a full-stack application using Django and React, with JWT authentication and CRUD operations for notes.

## License

This project is open for learning and personal use.

## Author

Built as a full-stack Django + React project for note management and secure authentication.
=======
>>>>>>> b7572688a4e14e285c0d125dc0abbecd438e475b
