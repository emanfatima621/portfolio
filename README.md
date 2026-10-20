# Portfolio Flask backend

This folder contains the API for the React/Vite portfolio. It stores portfolio content and contact messages in MongoDB.

## 1. Requirements
- Python 3.10 or newer
- MongoDB Community running locally **or** a MongoDB Atlas database

## 2. Install
Open a terminal in this `backend` folder. On Windows, try `py` if `python` is not recognised:

```powershell
py -m venv .venv
.venv\Scripts\activate
py -m pip install -r requirements.txt
copy .env.example .env
```
Edit `.env` and replace `SECRET_KEY` with a long random value. If using MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string. Keep `.env` private.

## 3. Optional admin account
Set `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `.env` before seeding, for example:

```env
ADMIN_USERNAME=eman_admin
ADMIN_PASSWORD=use-a-strong-unique-password-here
```

Then run:

```powershell
py seed.py
```
The seed script adds the known projects and experience. It does not invent achievements or blog articles. Existing records are not overwritten.

## 4. Start the API
Make sure MongoDB is running, then:

```powershell
py app.py
```
API base URL: `http://localhost:5000/api`
Health check: `http://localhost:5000/api/health`

## Endpoints
- `GET /api/health`
- `GET /api/projects`
- `GET /api/experience`
- `GET /api/blog`
- `GET /api/achievements`
- `POST /api/contacts` with `{ "name": "...", "email": "...", "message": "..." }`
- `POST /api/auth/login` with `{ "username": "...", "password": "..." }`
- `GET /api/admin/contacts` with `Authorization: Bearer <access_token>`
- `POST /api/admin/projects|experience|blog|achievements` with a Bearer token
- `DELETE /api/admin/<collection>/<id>` with a Bearer token

Blog and achievement lists are empty until you add real content. New admin-created content defaults to unpublished; set `published: true` to make it public.

## Connect React
`src/lib/api.js` provides helpers for calling the API. To configure the URL, copy the frontend `.env.example` to `.env` in the project root and set `VITE_API_URL=http://localhost:5000/api`, then restart Vite. Existing frontend sections currently use local data files, so the API is available but not automatically substituted into every section; connect a section using `getProjects()` / `getExperience()` when you're ready.

## Safety notes
- Change the development secret and use a strong admin password.
- Never commit `.env` or publish credentials.
- Use HTTPS and a production WSGI server when deploying. Restrict CORS to your actual frontend domain.
