import fitz
from docx import Document

ROLE_SKILLS = {

    "machine learning engineer": {

        "core": [
            "python",
            "machine learning",
            "deep learning"
        ],

        "tools": [
            "tensorflow",
            "pytorch",
            "docker"
        ],

        "support": [
            "sql",
            "statistics"
        ]
    },

    "data scientist": {

        "core": [
            "python",
            "machine learning",
            "statistics"
        ],

        "tools": [
            "pandas",
            "matplotlib",
            "scikit-learn"
        ],

        "support": [
            "sql",
            "data visualization"
        ]
    },

    "intern": {

        "core": [
            "python",
            "communication",
            "problem solving"
        ],

        "tools": [
            "git",
            "sql",
            "excel"
        ],

        "support": [
            "teamwork",
            "documentation"
        ]
    },

    "frontend developer": {

        "core": [
            "react",
            "javascript",
            "css"
        ],

        "tools": [
            "html",
            "typescript",
            "vue"
        ],

        "support": [
            "testing",
            "responsive design"
        ]
    },

    "full stack developer": {

        "core": [
            "javascript",
            "react",
            "node.js"
        ],

        "tools": [
            "postgresql",
            "docker",
            "mongodb"
        ],

        "support": [
            "git",
            "testing"
        ]
    },

    "devops engineer": {

        "core": [
            "docker",
            "kubernetes",
            "aws"
        ],

        "tools": [
            "ci/cd",
            "terraform",
            "jenkins"
        ],

        "support": [
            "linux",
            "monitoring"
        ]
    }

}

def extract_text(file):

    if file.filename.endswith(".pdf"):

        contents = file.file.read()

        doc = fitz.open(
            stream=contents,
            filetype="pdf"
        )

        text = ""

        for page in doc:

            text += page.get_text()

        return text.lower()

    elif file.filename.endswith(".docx"):

        doc = Document(file.file)

        return " ".join(
            [p.text for p in doc.paragraphs]
        ).lower()

    return ""


def extract_skills(text, role):

    role_data = ROLE_SKILLS[role]

    all_skills = (
        role_data["core"] +
        role_data["tools"] +
        role_data["support"]
    )

    detected = []

    for skill in all_skills:

        if skill.lower() in text:
            detected.append(skill)

    return detected


def ats_score(resume_skills, role_data):

    score = 0

    score += (
        len(set(resume_skills) & set(role_data["core"]))
        / len(role_data["core"])
    ) * 50

    score += (
        len(set(resume_skills) & set(role_data["tools"]))
        / len(role_data["tools"])
    ) * 30

    score += (
        len(set(resume_skills) & set(role_data["support"]))
        / len(role_data["support"])
    ) * 20

    return int(score)


def skill_gap(resume_skills, role_data):

    return {

        "critical": list(
            set(role_data["core"]) -
            set(resume_skills)
        ),

        "tools": list(
            set(role_data["tools"]) -
            set(resume_skills)
        ),

        "support": list(
            set(role_data["support"]) -
            set(resume_skills)
        )
    }
