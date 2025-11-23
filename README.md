# Spotify-Clone

**UI-first music player demo (React) with a light Django API for sample tracks.**  
Focus: responsive UI, playback controls (play/pause/seek), and compact REST endpoints for demo content.

---

## Tech stack
- Frontend: React, Vite, Tailwind CSS
- Backend: Python, Django REST Framework (simple sample endpoints)
- Audio: HTML5 Audio API
- Deployment: Vercel / GitHub Pages (frontend), Heroku / Render (backend)

---

## Features
- Browse sample tracks (title, artist, album art)
- Play / pause / seek / volume controls
- Responsive layout with mobile and desktop views
- Playlist queue and basic track switching

---

## Repo layout
/backend # minimal Django API serving sample track metadata
/frontend # React app (UI + audio controls)
/public # static audio files for local demo
/docs # screenshots and demo GIF

yaml
Copy code

---

## Quickstart — local
**Backend (sample API)**
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver  # default: http://localhost:8000
Frontend

bash
Copy code
cd frontend
npm install
# if audio files are local, ensure /public contains sample mp3s
npm run dev
# open http://localhost:5173
Deployment notes
Frontend: deploy to Vercel/GitHub Pages. Point API base URL to deployed backend.

Backend: serve static audio from object storage or media endpoint; use Gunicorn + nginx for production.

Example API endpoints
GET /api/tracks/ — list demo tracks (JSON with audio URLs)

GET /api/tracks/<id>/ — track metadata

Screenshots / Demo
Add a demo GIF: /docs/spotify-demo.gif
Reference in README: ![spotify-demo](/docs/spotify-demo.gif)

Tests
Frontend: add simple component/unit tests with Jest.

Backend: pytest if tests added.

Contributing
Branch naming: feat/<feature>, fix/<bug>.

Keep UI components small and testable.

Add a brief migration or seeder for sample tracks when adding audio.

License
MIT — see LICENSE.

Contact
Sudarshan Reddy — sudarshan382003@gmail.com
Resume: /mnt/data/Sudarshan_Reddy_Medapati_Resume.pdf
