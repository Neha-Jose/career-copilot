from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware

from utils import (
    extract_text,
    extract_skills,
    ats_score,
    skill_gap,
    ROLE_SKILLS
)

from roadmap import generate_roadmap

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ROLE_ALIASES = {
    "ml engineer": "machine learning engineer",
    "ml": "machine learning engineer",
    "ds": "data scientist",
    "internship": "intern",
}

ROLE_KEYWORDS = {
    "machine learning engineer": ["machine learning engineer", "ml engineer", "machine learning", "ml"],
    "data scientist": ["data scientist", "data science", "ds"],
    "intern": ["intern", "internship", "entry level", "early career"],
    "frontend developer": ["frontend developer", "frontend", "react developer", "vue developer"],
    "full stack developer": ["full stack developer", "full stack", "fullstack"],
    "devops engineer": ["devops engineer", "devops", "infrastructure engineer"],
}

def resolve_role(role: str):
    normalized = role.lower().strip()
    if normalized in ROLE_SKILLS:
        return normalized

    if normalized in ROLE_ALIASES:
        return ROLE_ALIASES[normalized]

    for canonical, keywords in ROLE_KEYWORDS.items():
        if any(keyword in normalized for keyword in keywords):
            return canonical

    return None

@app.get("/")
def home():
    return {
        "message": "Career Copilot API Running"
    }

@app.get("/roles")
def get_roles():
    """Get list of available career roles"""
    roles = list(ROLE_SKILLS.keys())
    role_details = [
        {
            "name": "Machine Learning Engineer",
            "value": "machine learning engineer",
            "description": "Build machine learning models and AI systems",
            "core_skills": ROLE_SKILLS["machine learning engineer"]["core"]
        },
        {
            "name": "Data Scientist",
            "value": "data scientist",
            "description": "Analyze data and build predictive models",
            "core_skills": ROLE_SKILLS["data scientist"]["core"]
        },
        {
            "name": "Frontend Developer",
            "value": "frontend developer",
            "description": "Build user interfaces and web applications",
            "core_skills": ROLE_SKILLS.get("frontend developer", {}).get("core", [])
        },
        {
            "name": "Full Stack Developer",
            "value": "full stack developer",
            "description": "Work on both frontend and backend systems",
            "core_skills": ROLE_SKILLS.get("full stack developer", {}).get("core", [])
        },
        {
            "name": "DevOps Engineer",
            "value": "devops engineer",
            "description": "Manage infrastructure and deployment pipelines",
            "core_skills": ROLE_SKILLS.get("devops engineer", {}).get("core", [])
        },
        {
            "name": "Intern",
            "value": "intern",
            "description": "Entry-level position to gain experience",
            "core_skills": ROLE_SKILLS.get("intern", {}).get("core", [])
        }
    ]
    return {"roles": role_details}

@app.post("/analyze")
async def analyze_resume(
    resume: UploadFile,
    role: str = Form(...)
):
    try:
        role = resolve_role(role)

        if role not in ROLE_SKILLS:
            return {
                "error": f"Role not supported. Supported roles: {', '.join(ROLE_SKILLS.keys())}"
            }

        text = extract_text(resume)
        print("TEXT EXTRACTED")

        role_data = ROLE_SKILLS[role]

        skills = extract_skills(text, role)
        print("SKILLS:", skills)

        score = ats_score(skills, role_data)
        gaps = skill_gap(skills, role_data)
        roadmap = generate_roadmap(gaps)

        return {
            "score": score,
            "skills": skills,
            "gaps": gaps,
            "roadmap": roadmap
        }

    except Exception as e:
        print("BACKEND ERROR:", e)
        return {
            "error": str(e)
        }

@app.get("/quiz")
def get_quiz():
    """Get career assessment quiz questions"""
    quiz_questions = [
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
    return {"questions": quiz_questions}

@app.post("/quiz/submit")
async def submit_quiz(responses: dict):
    """Process quiz responses and return personalized recommendations"""
    try:
        learning_hours = responses.get("1")
        learning_style = responses.get("2")
        experience_level = responses.get("3")
        career_goals = responses.get("4", [])

        recommendations = {
            "learning_pace": "Moderate",
            "suggested_roles": ["data scientist", "machine learning engineer", "frontend developer"],
            "roadmap_duration": "8-12 weeks" if learning_hours == "low" else "4-8 weeks",
            "study_schedule": {
                "low": "2 sessions per week, 2.5-5 hours each",
                "medium": "3-4 sessions per week, 2.5-5 hours each",
                "high": "5 sessions per week, 3-4 hours each",
                "very_high": "Daily learning with 2-3 hour blocks"
            }.get(learning_hours, "Flexible schedule"),
            "next_steps": [
                "Complete the career assessment",
                "Upload your resume",
                "Review your personalized roadmap",
                "Join the learning community"
            ]
        }

        return {
            "success": True,
            "recommendations": recommendations
        }

    except Exception as e:
        print("QUIZ ERROR:", e)
        return {
            "error": str(e)
        }
