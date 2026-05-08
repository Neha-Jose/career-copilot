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