# Architecture - Career Copilot

## System Overview

Career Copilot is a **client-server architecture** with a React frontend and FastAPI backend. The system processes resumes, analyzes skills, and generates personalized learning roadmaps.

```
┌─────────────────────────────────────────────────────────────────┐
│                      FRONTEND (React + Vite)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ Upload Tab   │  │ Dream Role   │  │ Career Quiz          │  │
│  │ - File input │  │ - Role cards │  │ - Questions          │  │
│  │ - Role sel.  │  │ - Skills     │  │ - Recommendations    │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
│         │                 │                      │               │
│         └─────────────────┼──────────────────────┘               │
│                           │                                      │
│         ┌─────────────────▼──────────────────┐                 │
│         │    API Client (axios)              │                 │
│         │    http://127.0.0.1:8000           │                 │
│         └─────────────────┬──────────────────┘                 │
└─────────────────────────────────────────────────────────────────┘
                            │
                    HTTP/CORS │
                            │
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND (FastAPI)                           │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Routes                                                      │ │
│  │  ├─ GET  /               (Health check)                    │ │
│  │  ├─ GET  /roles          (List available roles)            │ │
│  │  ├─ GET  /quiz           (Get quiz questions)              │ │
│  │  ├─ POST /quiz/submit    (Process quiz responses)          │ │
│  │  └─ POST /analyze        (Resume analysis & roadmap)       │ │
│  └────────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Core Modules                                               │ │
│  │  ├─ utils.py            (Skill extraction & scoring)       │ │
│  │  ├─ roadmap.py          (Learning path generation)         │ │
│  │  └─ db.py               (MongoDB persistence)              │ │
│  └────────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ External Services                                          │ │
│  │  └─ MongoDB Atlas       (Optional data storage)            │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Resume Analysis Flow

```
User Upload
    │
    ├─ Resume (PDF/DOCX)
    └─ Target Role
        │
        ▼
    [Extract Text]
    │
    ├─ PyMuPDF (PDF) or python-docx (DOCX)
    └─ Convert to lowercase text
        │
        ▼
    [Extract Skills]
    │
    ├─ Match role's skills against resume text
    ├─ Return detected skills
    └─ Filter to only role-relevant skills
        │
        ▼
    [Calculate ATS Score]
    │
    ├─ Core skills: 50%
    ├─ Tools: 30%
    └─ Support skills: 20%
        │
        ▼
    [Identify Skill Gaps]
    │
    ├─ Critical: Required core skills missing
    ├─ Tools: Missing frameworks/tools
    └─ Support: Missing soft skills
        │
        ▼
    [Generate Roadmap]
    │
    ├─ Phase 1: Critical Skills
    ├─ Phase 2: Tools & Frameworks
    └─ Phase 3: Supporting Skills
        │
        ▼
    [Return Analysis]
    └─ Score, Skills, Gaps, Roadmap
```

### 2. Quiz Assessment Flow

```
User Takes Quiz
    │
    ├─ GET /quiz
    │  ├─ Learning hours commitment
    │  ├─ Learning style preference
    │  ├─ Experience level
    │  └─ Career goals
    │
    ▼
POST /quiz/submit
    │
    ├─ Parse responses
    ├─ Generate recommendations
    │  ├─ Suggested roles
    │  ├─ Study schedule
    │  ├─ Roadmap duration
    │  └─ Next steps
    │
    ▼
Return Personalized Path
```

## Role Definition Structure

Each role contains three skill categories:

```python
{
    "core": [          # Essential skills (50% of ATS score)
        "python",
        "machine learning"
    ],
    "tools": [         # Frameworks/technologies (30% of ATS score)
        "tensorflow",
        "pytorch"
    ],
    "support": [       # Soft skills (20% of ATS score)
        "statistics"
    ]
}
```

## Skill-to-Resource Mapping

```
Skill → RESOURCE_DB → Project + Resources + Timeline
├─ React
│  ├─ Resources: [React Docs, YouTube tutorials]
│  ├─ Project: Build interactive dashboard
│  ├─ Time: 3 Weeks
│  └─ Difficulty: Beginner
├─ Kubernetes
│  ├─ Resources: [Official Docs, Course videos]
│  ├─ Project: Deploy containerized app
│  ├─ Time: 4 Weeks
│  └─ Difficulty: Advanced
```

## Frontend State Management

```
App.jsx
├─ mainTab              # Active tab (upload, dream-role, quiz, dashboard)
├─ selectedRole         # User's selected target role
├─ resume               # Uploaded file
├─ data                 # Analysis results
│  ├─ score
│  ├─ skills
│  ├─ gaps
│  └─ roadmap
├─ error                # Error messages
├─ completedTasks       # Track milestone progress
├─ roles                # List from /roles API
├─ quizQuestions        # List from /quiz API
└─ quizResponses        # User answers

API Calls:
├─ fetchRoles()         # GET /roles
├─ fetchQuiz()          # GET /quiz
├─ handleSubmit()       # POST /analyze
└─ handleQuizSubmit()   # POST /quiz/submit
```

## API Response Schemas

### POST /analyze Response
```json
{
    "score": 75,
    "skills": ["python", "react", "git"],
    "gaps": {
        "critical": ["typescript", "testing"],
        "tools": ["docker"],
        "support": ["communication"]
    },
    "roadmap": [
        {
            "title": "Critical Skills",
            "items": [
                {
                    "skill": "typescript",
                    "resources": [["TypeScript Handbook", "url"], ...],
                    "project": "Convert project to TypeScript",
                    "time": "2 Weeks",
                    "difficulty": "Intermediate",
                    "status": "Not Started",
                    "progress": 0
                }
            ]
        }
    ]
}
```

### GET /roles Response
```json
{
    "roles": [
        {
            "name": "Machine Learning Engineer",
            "value": "machine learning engineer",
            "description": "Build machine learning models and AI systems",
            "core_skills": ["python", "machine learning", "deep learning"]
        }
    ]
}
```

### GET /quiz Response
```json
{
    "questions": [
        {
            "id": 1,
            "question": "How many hours per week can you dedicate to learning?",
            "type": "radio",
            "options": [
                {"value": "low", "label": "5-10 hours"},
                {"value": "medium", "label": "10-15 hours"}
            ]
        }
    ]
}
```

## Scoring Algorithm

```
ATS_SCORE = (CORE_MATCH * 0.50) + (TOOLS_MATCH * 0.30) + (SUPPORT_MATCH * 0.20)

Where:
- CORE_MATCH = (Detected Core Skills / Total Core Skills) × 100
- TOOLS_MATCH = (Detected Tools / Total Tools) × 100
- SUPPORT_MATCH = (Detected Support / Total Support) × 100

Result: 0-100 score
```

## Database Schema (MongoDB - Optional)

```javascript
// analysis collection
{
    _id: ObjectId,
    timestamp: ISODate,
    user_email: String,
    target_role: String,
    resume_filename: String,
    score: Number,
    skills_detected: [String],
    skills_missing: [String],
    roadmap: Array,
    completed_milestones: [String]
}
```

## Performance Considerations

| Operation | Time | Notes |
|-----------|------|-------|
| Extract text (PDF) | 500-800ms | Depends on file size |
| Skill matching | 100-200ms | Linear search |
| Roadmap generation | 50-100ms | Template creation |
| Total /analyze | 2-3s | Network + processing |

## Error Handling

```
Try-Except Flow:
├─ File parsing errors
│  └─ Return: "Error extracting resume text"
├─ Role not found
│  └─ Return: "Role not supported. Supported roles: [...]"
├─ Missing parameters
│  └─ Return: "Role not specified"
└─ Database errors
   └─ Return: "Error saving analysis to database"
```

## Security Architecture

1. **CORS** — Cross-Origin Resource Sharing enabled for frontend
2. **File Validation** — Only PDF/DOCX accepted
3. **Data Isolation** — No persistent user storage (optional MongoDB)
4. **TLS Connection** — MongoDB uses certificate authentication
5. **Input Sanitization** — Role names normalized and validated

## Deployment Architecture

```
Production Setup (Recommended):
├─ Frontend
│  └─ Vercel / Netlify (Static build)
├─ Backend
│  └─ AWS EC2 / Railway / Render (FastAPI container)
└─ Database
   └─ MongoDB Atlas (Cloud-hosted)

Environment Variables:
├─ MONGO_URI (for database connection)
├─ CORS_ORIGINS (allowed frontend domains)
└─ LOG_LEVEL (debug/info/error)
```

## Extensibility

### Adding a New Role
1. **Define in utils.py** — Add to ROLE_SKILLS dict
2. **Add keywords** — Update ROLE_KEYWORDS for fuzzy matching
3. **Add resources** — Update roadmap.py RESOURCE_DB
4. **Test** — Verify with sample resumes

### Adding a Skill
1. **Add to RESOURCE_DB** in roadmap.py
2. **Update role definitions** — Add skill to appropriate categories
3. **Provide resources** — Links to learning materials

### Custom Scoring
Modify `ats_score()` in utils.py to adjust weights or add custom logic.

---

**System designed for scalability and easy customization**
