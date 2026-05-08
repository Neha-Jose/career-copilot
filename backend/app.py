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

        role = role.lower()

        if role not in ROLE_SKILLS:

            return {
                "error": "Role not supported"
            }

        # Extract text

        text = extract_text(resume)

        # Debug

        print("TEXT EXTRACTED")

        role_data = ROLE_SKILLS[role]

        # Extract skills

        skills = extract_skills(text, role)

        print("SKILLS:", skills)

        # ATS score

        score = ats_score(
            skills,
            role_data
        )

        # Gap analysis

        gaps = skill_gap(
            skills,
            role_data
        )

        # Roadmap

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
