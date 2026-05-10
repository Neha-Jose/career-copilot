# API Documentation - Career Copilot

## Base URL

```
http://127.0.0.1:8000
```

## Authentication

No authentication required. All endpoints are public.

---

## Endpoints

### 1. Health Check

**GET** `/`

Returns server status.

#### Response (200 OK)
```json
{
    "message": "Career Copilot API Running"
}
```

#### Example
```bash
curl http://127.0.0.1:8000/
```

---

### 2. Get Available Roles

**GET** `/roles`

Returns list of all available career roles with descriptions and core skills.

#### Response (200 OK)
```json
{
    "roles": [
        {
            "name": "Machine Learning Engineer",
            "value": "machine learning engineer",
            "description": "Build machine learning models and AI systems",
            "core_skills": ["python", "machine learning", "deep learning"]
        },
        {
            "name": "Data Scientist",
            "value": "data scientist",
            "description": "Analyze data and build predictive models",
            "core_skills": ["python", "machine learning", "statistics"]
        },
        {
            "name": "Frontend Developer",
            "value": "frontend developer",
            "description": "Build user interfaces and web applications",
            "core_skills": ["react", "javascript", "css"]
        },
        {
            "name": "Full Stack Developer",
            "value": "full stack developer",
            "description": "Work on both frontend and backend systems",
            "core_skills": ["javascript", "react", "node.js"]
        },
        {
            "name": "DevOps Engineer",
            "value": "devops engineer",
            "description": "Manage infrastructure and deployment pipelines",
            "core_skills": ["docker", "kubernetes", "aws"]
        },
        {
            "name": "Intern",
            "value": "intern",
            "description": "Entry-level position to gain experience",
            "core_skills": ["python", "communication", "problem solving"]
        }
    ]
}
```

#### Example
```bash
curl http://127.0.0.1:8000/roles
```

#### Frontend Usage
```javascript
const response = await API.get("/roles");
const roles = response.data.roles;
```

---

### 3. Get Career Assessment Quiz

**GET** `/quiz`

Returns career assessment quiz with questions for personalizing recommendations.

#### Response (200 OK)
```json
{
    "questions": [
        {
            "id": 1,
            "question": "How many hours per week can you dedicate to learning?",
            "type": "radio",
            "options": [
                {"value": "low", "label": "5-10 hours"},
                {"value": "medium", "label": "10-15 hours"},
                {"value": "high", "label": "15-20 hours"},
                {"value": "very_high", "label": "20+ hours"}
            ]
        },
        {
            "id": 2,
            "question": "What is your preferred learning style?",
            "type": "radio",
            "options": [
                {"value": "video", "label": "Video tutorials"},
                {"value": "text", "label": "Reading & documentation"},
                {"value": "interactive", "label": "Interactive coding"},
                {"value": "mixed", "label": "Mixed approach"}
            ]
        },
        {
            "id": 3,
            "question": "What is your current experience level?",
            "type": "radio",
            "options": [
                {"value": "beginner", "label": "Beginner"},
                {"value": "intermediate", "label": "Intermediate"},
                {"value": "advanced", "label": "Advanced"},
                {"value": "expert", "label": "Expert"}
            ]
        },
        {
            "id": 4,
            "question": "What are your career goals?",
            "type": "checkbox",
            "options": [
                {"value": "promotion", "label": "Get a promotion"},
                {"value": "new_role", "label": "Switch to a new role"},
                {"value": "freelance", "label": "Start freelancing"},
                {"value": "startup", "label": "Start a startup"}
            ]
        }
    ]
}
```

#### Example
```bash
curl http://127.0.0.1:8000/quiz
```

#### Frontend Usage
```javascript
const response = await API.get("/quiz");
const questions = response.data.questions;
```

---

### 4. Submit Career Quiz

**POST** `/quiz/submit`

Process quiz responses and return personalized learning recommendations.

#### Request Body
```json
{
    "1": "low",
    "2": "video",
    "3": "beginner",
    "4": ["promotion", "new_role"]
}
```

**Parameters:**
- `"1"` (string) — Learning hours (low, medium, high, very_high)
- `"2"` (string) — Learning style (video, text, interactive, mixed)
- `"3"` (string) — Experience level (beginner, intermediate, advanced, expert)
- `"4"` (string[]) — Career goals (array of goals)

#### Response (200 OK)
```json
{
    "success": true,
    "recommendations": {
        "learning_pace": "Moderate",
        "suggested_roles": [
            "data scientist",
            "machine learning engineer",
            "frontend developer"
        ],
        "roadmap_duration": "8-12 weeks",
        "study_schedule": "2 sessions per week, 2.5-5 hours each",
        "next_steps": [
            "Complete the career assessment",
            "Upload your resume",
            "Review your personalized roadmap",
            "Join the learning community"
        ]
    }
}
```

#### Error Response (400 Bad Request)
```json
{
    "error": "Please answer all questions"
}
```

#### Example
```bash
curl -X POST http://127.0.0.1:8000/quiz/submit \
  -H "Content-Type: application/json" \
  -d '{
    "1": "medium",
    "2": "video",
    "3": "intermediate",
    "4": ["new_role"]
  }'
```

#### Frontend Usage
```javascript
const responses = {
    "1": "medium",
    "2": "video",
    "3": "intermediate",
    "4": ["new_role"]
};

const result = await API.post("/quiz/submit", responses);
console.log(result.data.recommendations);
```

---

### 5. Analyze Resume & Generate Roadmap

**POST** `/analyze`

Upload resume and get complete career analysis with ATS score, skill gaps, and personalized learning roadmap.

#### Request
- **Method:** POST (multipart/form-data)
- **Content-Type:** multipart/form-data

#### Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| resume | File | Yes | Resume file (PDF or DOCX) |
| role | String | Yes | Target career role |

#### Response (200 OK)
```json
{
    "score": 75,
    "skills": ["python", "react", "sql", "git"],
    "gaps": {
        "critical": ["typescript", "testing"],
        "tools": ["docker"],
        "support": ["communication", "teamwork"]
    },
    "roadmap": [
        {
            "title": "Critical Skills",
            "items": [
                {
                    "skill": "typescript",
                    "resources": [
                        ["TypeScript Handbook", "https://www.typescriptlang.org/docs/"],
                        ["TypeScript Course", "https://www.youtube.com/watch?v=d56mHESJ2DY"]
                    ],
                    "project": "Convert a JavaScript project to TypeScript",
                    "time": "2 Weeks",
                    "difficulty": "Intermediate",
                    "progress": 0,
                    "status": "Not Started"
                },
                {
                    "skill": "testing",
                    "resources": [
                        ["Jest Testing", "https://jestjs.io/"],
                        ["Testing Library", "https://testing-library.com/"]
                    ],
                    "project": "Write comprehensive unit and integration tests",
                    "time": "2 Weeks",
                    "difficulty": "Intermediate",
                    "progress": 0,
                    "status": "Not Started"
                }
            ]
        },
        {
            "title": "Tools & Frameworks",
            "items": [
                {
                    "skill": "docker",
                    "resources": [
                        ["Docker Mastery", "https://www.udemy.com/course/docker-mastery/"],
                        ["Docker Tutorial", "https://www.youtube.com/watch?v=3c-iBn73dDE"]
                    ],
                    "project": "Containerize a full-stack application",
                    "time": "3 Weeks",
                    "difficulty": "Intermediate",
                    "progress": 0,
                    "status": "Not Started"
                }
            ]
        },
        {
            "title": "Supporting Skills",
            "items": [
                {
                    "skill": "communication",
                    "resources": [
                        ["Toastmasters", "https://www.toastmasters.org/"],
                        ["Communication Guide", "https://www.youtube.com/watch?v=NeXHu9FVxWo"]
                    ],
                    "project": "Practice technical presentations",
                    "time": "2 Weeks",
                    "difficulty": "Beginner",
                    "progress": 0,
                    "status": "Not Started"
                }
            ]
        }
    ]
}
```

#### Error Responses

**400 - Missing Parameters**
```json
{
    "error": "Role not specified"
}
```

**400 - Unsupported Role**
```json
{
    "error": "Role not supported. Supported roles: machine learning engineer, data scientist, frontend developer, full stack developer, devops engineer, intern"
}
```

**400 - File Processing Error**
```json
{
    "error": "[Specific error message]"
}
```

#### Supported Roles
- `machine learning engineer` (or `ml engineer`, `ml`, `machine learning`)
- `data scientist` (or `data science`, `ds`)
- `frontend developer` (or `frontend`, `react developer`)
- `full stack developer` (or `full stack`, `fullstack`)
- `devops engineer` (or `devops`, `infrastructure engineer`)
- `intern` (or `internship`, `entry level`, `early career`)

#### Supported File Formats
- `.pdf` — PDF documents
- `.docx` — Microsoft Word documents

#### Example (cURL)
```bash
curl -X POST http://127.0.0.1:8000/analyze \
  -F "resume=@resume.pdf" \
  -F "role=frontend developer"
```

#### Example (Frontend JavaScript)
```javascript
const formData = new FormData();
formData.append("resume", resumeFile);
formData.append("role", "frontend developer");

const response = await API.post("/analyze", formData, {
    headers: { "Content-Type": "multipart/form-data" }
});

const { score, skills, gaps, roadmap } = response.data;
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| score | Number | ATS match score (0-100) |
| skills | String[] | Skills detected in resume |
| gaps.critical | String[] | Missing core/critical skills |
| gaps.tools | String[] | Missing frameworks/tools |
| gaps.support | String[] | Missing soft skills |
| roadmap | Object[] | 3-phase learning plan |
| roadmap[].title | String | Phase name |
| roadmap[].items | Object[] | Skills in phase |
| roadmap[].items[].skill | String | Skill name |
| roadmap[].items[].resources | Array[] | Learning resources [title, url] |
| roadmap[].items[].project | String | Suggested project |
| roadmap[].items[].time | String | Estimated completion time |
| roadmap[].items[].difficulty | String | Beginner/Intermediate/Advanced |

---

## Rate Limiting

None currently implemented. Production deployment should include rate limiting.

---

## CORS

CORS is enabled for all origins during development:
```python
allow_origins=["*"]
allow_methods=["*"]
allow_headers=["*"]
```

For production, restrict to:
```python
allow_origins=["https://yourdomain.com"]
```

---

## Error Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | Analysis complete |
| 400 | Bad Request | Missing role parameter |
| 422 | Validation Error | Invalid file format |
| 500 | Server Error | Database connection failed |

---

## Response Headers

All responses include:
```
Content-Type: application/json
Access-Control-Allow-Origin: *
```

---

## Best Practices

1. **File Uploads** — Limit to 10MB max file size on frontend
2. **Error Handling** — Check for `error` field in response
3. **Caching** — `/roles` and `/quiz` results can be cached for 1 hour
4. **Retry Logic** — Implement exponential backoff for failed requests
5. **Progress Indicators** — Show loading state during `/analyze` (2-3s typical)

---

## Testing

### Test Resume Analysis
```bash
# Using sample role
curl -X POST http://127.0.0.1:8000/analyze \
  -F "resume=@test.pdf" \
  -F "role=data scientist"
```

### Test Role Fuzzy Matching
```bash
# These all work:
- "data science"
- "data scientist"
- "ds"
- "ML"
- "ml engineer"
- "machine learning engineer"
```

---

## Webhooks

Not currently supported. Future versions may include webhook callbacks for long-running operations.

---

**Last Updated:** May 2026  
**API Version:** 1.0  
**Status:** Production Ready
