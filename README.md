# Career Copilot - AI Career Intelligence Platform

**Career Copilot** is an intelligent career development platform that analyzes resumes, identifies skill gaps, and provides personalized learning roadmaps tailored to target roles.

## 🎯 Key Features

- **Resume Analysis** — Upload resume (PDF/DOCX) and get ATS scoring
- **Skill Gap Analysis** — Identify missing skills for target roles
- **Personalized Roadmap** — Get a phase-based learning path with resources
- **Career Assessment Quiz** — Answer 4 questions to receive personalized recommendations
- **Dream Role Selection** — Browse 6+ career paths with core skill requirements
- **Interactive Dashboard** — Track progress and view comprehensive career insights

## 📊 Supported Roles

- Machine Learning Engineer
- Data Scientist
- Frontend Developer
- Full Stack Developer
- DevOps Engineer
- Intern (Entry-level)

## 🏗️ Tech Stack

**Backend:**
- FastAPI (Python web framework)
- PyMongo (MongoDB driver)
- python-docx & PyMuPDF (Document parsing)

**Frontend:**
- React 19 with Vite
- Axios (HTTP client)
- CSS3 (Custom design system)

## 📁 Project Structure

```
career-copilot/
├── backend/
│   ├── app.py              # Main FastAPI application
│   ├── utils.py            # Skill extraction & scoring
│   ├── roadmap.py          # Learning path generation
│   ├── db.py               # MongoDB connections
│   └── roadmap_extended.py # Extended resources database
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Main React component
│   │   ├── App.css         # Design system styles
│   │   ├── main.jsx        # Entry point
│   │   └── services/
│   │       └── api.js      # API client
│   ├── package.json
│   └── vite.config.js
└── docs/
    ├── README.md           # This file
    ├── ARCHITECTURE.md     # System design
    ├── API.md              # Endpoint documentation
    └── SETUP.md            # Installation guide
```

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- Node.js 16+
- MongoDB account (optional, for persistence)

### Backend Setup
```bash
cd backend
pip install fastapi uvicorn pymongo certifi python-docx PyMuPDF
uvicorn app:app --reload
```

Backend runs on: `http://127.0.0.1:8000`

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5174`

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/roles` | List all available career roles |
| GET | `/quiz` | Get career assessment quiz |
| POST | `/quiz/submit` | Submit quiz responses |
| POST | `/analyze` | Analyze resume and generate roadmap |

See [API.md](docs/API.md) for detailed endpoint documentation.

## 🎓 Learning Resources

The platform includes 40+ curated skills with resources from:
- Coursera, FreeCodeCamp, YouTube
- Official documentation (React, Node.js, AWS, etc.)
- Specialized platforms (Udemy, LeetCode, Tableau)

## 📈 How It Works

1. **Upload Resume** → Extract text from PDF/DOCX
2. **Select Target Role** → Match against 6 predefined roles
3. **Analyze Skills** → Extract detected vs. required skills
4. **Calculate Score** → ATS score (0-100) based on skill match
5. **Identify Gaps** → Segment into critical, tools, and supporting skills
6. **Generate Roadmap** → 3-phase learning plan with resources
7. **Track Progress** → Mark milestones as completed

## 🛠️ Architecture

See [ARCHITECTURE.md](docs/ARCHITECTURE.md) for detailed system design and data flow.

## 📝 Development

### Adding a New Role

1. Add to `backend/utils.py` in `ROLE_SKILLS`:
```python
"new role": {
    "core": ["skill1", "skill2"],
    "tools": ["tool1", "tool2"],
    "support": ["support1"]
}
```

2. Update `backend/app.py` `ROLE_KEYWORDS` for fuzzy matching
3. Add resources in `backend/roadmap.py` `RESOURCE_DB`

### Adding Skills & Resources

Update `backend/roadmap.py` `RESOURCE_DB` with:
```python
"skill_name": {
    "resources": [("Title", "URL"), ...],
    "project": "Project description",
    "time": "2 Weeks",
    "difficulty": "Beginner"
}
```

## 🔒 Security

- No resume data is stored permanently
- MongoDB connection uses TLS certificates
- CORS enabled for development
- All file uploads validated before processing

## 📊 Performance

- Resume analysis: ~2-3 seconds
- Quiz submission: ~500ms
- Role listing: <100ms

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

Proprietary - AI Career Intelligence Platform

## 📞 Support

For issues or questions:
- Check [docs/API.md](docs/API.md) for endpoint details
- Review [docs/SETUP.md](docs/SETUP.md) for setup issues
- See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for system design

---


