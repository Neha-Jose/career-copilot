# Setup Guide - Career Copilot

Complete step-by-step instructions to set up Career Copilot locally.

## Prerequisites

### Required
- **Python 3.9+** — [Download](https://www.python.org/downloads/)
- **Node.js 16+** — [Download](https://nodejs.org/)
- **Git** — [Download](https://git-scm.com/)

### Optional
- **MongoDB** — For persistent data storage
- **Postman** — For API testing
- **VS Code** — Recommended editor

## System Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| RAM | 4GB | 8GB+ |
| Disk | 500MB | 2GB |
| OS | Windows/Mac/Linux | Windows 10+, macOS 10.14+, Ubuntu 18+ |

## Backend Setup

### Step 1: Navigate to Backend Directory

```bash
cd career-copilot/backend
```

### Step 2: Create Python Virtual Environment

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

You should see `(venv)` in your terminal.

### Step 3: Install Python Dependencies

```bash
pip install --upgrade pip
pip install fastapi uvicorn pymongo certifi python-docx PyMuPDF axios
```

**Dependency Details:**
- `fastapi` — Web framework
- `uvicorn` — ASGI server
- `pymongo` — MongoDB driver
- `certifi` — SSL certificates for MongoDB
- `python-docx` — Word document parsing
- `PyMuPDF` — PDF text extraction

### Step 4: (Optional) Configure MongoDB

If you want persistent data storage, add MongoDB connection:

1. Create MongoDB account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and get connection string
3. The `db.py` file already contains MongoDB setup:

```python
MONGO_URI = "mongodb+srv://username:password@cluster.mongodb.net/?appName=Cluster0"
```

**Note:** Leave MongoDB setup optional. The app works without it.

### Step 5: Start Backend Server

```bash
uvicorn app:app --reload
```

**Expected Output:**
```
INFO:     Will watch for changes in these directories: ['/path/to/backend']
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Application startup complete
```

**Verify Backend:**
```bash
curl http://127.0.0.1:8000/
# Should return: {"message": "Career Copilot API Running"}
```

### Backend is Running ✓

Keep this terminal open. Backend runs on `http://127.0.0.1:8000`

---

## Frontend Setup

### Step 1: Open New Terminal Window

Do **not** close the backend terminal.

### Step 2: Navigate to Frontend Directory

```bash
cd career-copilot/frontend
```

### Step 3: Install Node Dependencies

```bash
npm install
```

This installs React, Vite, Axios, and other dependencies from `package.json`.

**Expected Time:** 2-5 minutes depending on internet speed.

### Step 4: Start Frontend Dev Server

```bash
npm run dev
```

**Expected Output:**
```
Port 5173 is in use, trying another one...
  VITE v8.0.11  ready in 407 ms

  ➜  Local:   http://localhost:5174/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**Note:** Port may vary if 5173/5174 are in use.

### Step 5: Open in Browser

Click the local URL or open:
```
http://localhost:5174
```

### Frontend is Running ✓

You should see the Career Copilot application!

---

## Running Both Servers

### Terminal 1 (Backend)
```bash
cd career-copilot/backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
uvicorn app:app --reload
# Runs on http://127.0.0.1:8000
```

### Terminal 2 (Frontend)
```bash
cd career-copilot/frontend
npm run dev
# Runs on http://localhost:5174
```

---

## Troubleshooting

### Backend Issues

**Error: `ModuleNotFoundError: No module named 'fastapi'`**
- Solution: Ensure virtual environment is activated and dependencies installed
```bash
source venv/bin/activate  # Activate venv first
pip install -r requirements.txt
```

**Error: `Port 8000 already in use`**
- Solution: Use different port
```bash
uvicorn app:app --reload --port 8001
```

**Error: `Failed to extract resume`**
- Solution: Ensure file is valid PDF/DOCX with readable text

**MongoDB Connection Error**
- Solution: This is optional. App works without MongoDB. Remove or comment out MongoDB code in `db.py`

### Frontend Issues

**Error: `npm: command not found`**
- Solution: Install Node.js from [nodejs.org](https://nodejs.org/)

**Error: `Port 5173/5174 already in use`**
- Solution: Vite will auto-select next available port. Check console output for actual port.

**Error: `Cannot GET /`**
- Solution: Ensure you're using correct URL from console output (usually `http://localhost:5174`)

**Error: `Backend connection failed`**
- Solution: Ensure backend is running on `http://127.0.0.1:8000`
- Check browser console for CORS errors
- Verify API is accessible: `curl http://127.0.0.1:8000/`

**Page shows blank/no styles**
- Solution: Clear browser cache (Ctrl+Shift+Delete) and hard refresh (Ctrl+F5)

---

## Testing the Application

### 1. Test Backend API

```bash
# Health check
curl http://127.0.0.1:8000/

# Get available roles
curl http://127.0.0.1:8000/roles

# Get quiz
curl http://127.0.0.1:8000/quiz
```

### 2. Test Frontend

1. Open `http://localhost:5174`
2. Click **"Dream Role"** tab
3. Verify all 6 roles appear
4. Click **"Career Quiz"** tab
5. Verify 4 questions appear

### 3. Test Resume Analysis

1. Prepare a test resume (PDF or DOCX)
2. Click **"Upload Resume"** tab
3. Upload resume file
4. Select a role from dropdown
5. Click **"Analyse Resume"**
6. Verify results appear (score, skills, roadmap)

### 4. Test Error Handling

1. Try uploading invalid file (non-PDF/DOCX)
2. Try selecting a role and analyzing without file
3. Try selecting unsupported role
4. Verify error messages appear

---

## Development Workflow

### Making Backend Changes

1. Edit files in `backend/` directory
2. Changes auto-reload (watch mode enabled with `--reload`)
3. Test with `curl` or browser

### Making Frontend Changes

1. Edit files in `frontend/src/` directory
2. Changes auto-reload in browser (Vite HMR)
3. No need to restart

### Adding New Features

See [ARCHITECTURE.md](ARCHITECTURE.md) for:
- Adding new roles
- Adding new skills
- Customizing scoring algorithm

---

## Building for Production

### Frontend Build

```bash
cd frontend
npm run build
```

Creates optimized build in `frontend/dist/` directory.

**Deploy to:**
- Vercel (recommended)
- Netlify
- AWS S3 + CloudFront
- Any static host

### Backend Deployment

**Option 1: Railway.app** (Recommended)
```bash
npm install -g railway
railway login
railway up
```

**Option 2: Render.com**
```
- Connect GitHub repo
- Set build command: pip install -r requirements.txt
- Set start command: uvicorn app:app --host 0.0.0.0 --port $PORT
```

**Option 3: AWS EC2**
```bash
ssh ubuntu@your-instance
git clone https://github.com/your-repo.git
cd career-copilot/backend
pip install -r requirements.txt
nohup uvicorn app:app --host 0.0.0.0 --port 8000 &
```

---

## Project Structure Reference

```
career-copilot/
├── backend/
│   ├── app.py                    # Main FastAPI application
│   ├── utils.py                  # Skill extraction
│   ├── roadmap.py                # Learning roadmap
│   ├── db.py                     # MongoDB config
│   └── roadmap_extended.py       # Resources database
├── frontend/
│   ├── src/
│   │   ├── App.jsx               # Main component
│   │   ├── App.css               # Styles
│   │   ├── main.jsx              # Entry point
│   │   └── services/api.js       # API client
│   ├── package.json              # Dependencies
│   └── vite.config.js            # Vite config
├── README.md                     # Project overview
├── ARCHITECTURE.md               # System design
├── API.md                        # API documentation
└── SETUP.md                      # This file
```

---

## Environment Variables

### Backend (.env)

Optional configuration:

```env
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/career_copilot
CORS_ORIGINS=http://localhost:5174
LOG_LEVEL=info
```

### Frontend (.env)

Optional configuration:

```env
VITE_API_URL=http://127.0.0.1:8000
VITE_LOG_LEVEL=debug
```

---

## Performance Tips

1. **Optimize Resume Files** — Keep under 5MB (large PDFs slow parsing)
2. **Browser Cache** — Clear after major updates
3. **Development Server** — Close unused tabs to reduce memory usage
4. **Database** — Only needed for persistence; app works without it

---

## Security Checklist

- [ ] No sensitive data in version control
- [ ] Database credentials in environment variables
- [ ] CORS restricted in production
- [ ] Resume files validated before processing
- [ ] Input sanitized for role matching

---

## Getting Help

1. Check [API.md](API.md) for endpoint details
2. Review [ARCHITECTURE.md](ARCHITECTURE.md) for system design
3. Check browser console for client-side errors
4. Check terminal for backend errors
5. Enable debug logging for verbose output

---

## Next Steps

After setup is complete:

1. ✓ Test all features
2. ✓ Upload sample resume
3. ✓ Take career quiz
4. ✓ Review generated roadmap
5. ✓ Explore adding new roles/skills
6. ✓ Deploy to production (optional)

---

**Setup complete! Happy coding! 🚀**

Last updated: May 2026
