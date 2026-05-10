"""
routers/career.py
New career-seeker endpoints:
  POST /api/resume/analyze
  POST /api/skills/gap-analysis
  POST /api/jobs/recommendations
  POST /api/interview/start
  POST /api/interview/evaluate
  POST /api/github/analyze
"""

from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional
import random

from roadmap import generate_roadmap, generate_weekly_roadmap, RESOURCE_DB
from utils import ROLE_SKILLS

router = APIRouter(prefix="/api", tags=["career"])

# ── Pydantic models ───────────────────────────────────────────────────────────

class ResumeAnalyzeRequest(BaseModel):
    role: str
    skills: List[str]          # client sends detected skills (mock flow)

class GapAnalysisRequest(BaseModel):
    target_role: str
    current_skills: List[str]

class JobRecommendationsRequest(BaseModel):
    role: str
    location: Optional[str] = "Remote"
    skills: Optional[List[str]] = []

class InterviewStartRequest(BaseModel):
    role: str
    mode: str   # "technical" | "hr"

class InterviewEvaluateRequest(BaseModel):
    role: str
    mode: str
    answers: List[str]

class GitHubAnalyzeRequest(BaseModel):
    username: str

# ── Mock data ─────────────────────────────────────────────────────────────────

MOCK_JOBS = [
    {"company": "Stripe",       "role": "Frontend Engineer",       "salary": "$140k–$170k", "location": "San Francisco, CA", "remote": True,  "match": 94},
    {"company": "Notion",       "role": "Full Stack Developer",    "salary": "$130k–$160k", "location": "New York, NY",      "remote": True,  "match": 88},
    {"company": "Vercel",       "role": "React Developer",         "salary": "$120k–$150k", "location": "Remote",            "remote": True,  "match": 91},
    {"company": "Linear",       "role": "TypeScript Engineer",     "salary": "$125k–$155k", "location": "Remote",            "remote": True,  "match": 86},
    {"company": "Figma",        "role": "Software Engineer",       "salary": "$145k–$180k", "location": "San Francisco, CA", "remote": False, "match": 82},
    {"company": "Datadog",      "role": "DevOps Engineer",         "salary": "$155k–$190k", "location": "New York, NY",      "remote": False, "match": 79},
    {"company": "Hugging Face", "role": "ML Engineer",             "salary": "$160k–$200k", "location": "Remote",            "remote": True,  "match": 97},
    {"company": "Anthropic",    "role": "Research Engineer",       "salary": "$180k–$220k", "location": "San Francisco, CA", "remote": False, "match": 83},
]

TECHNICAL_QUESTIONS = {
    "frontend developer": [
        "Explain the React reconciliation algorithm and how the virtual DOM works.",
        "How do you handle state management at scale — Redux vs. Zustand vs. Context API?",
        "Describe your approach to optimising Core Web Vitals in a production app.",
        "Walk me through how you would design a reusable component library.",
        "What is the difference between SSR, SSG, and CSR, and when would you choose each?"
    ],
    "full stack developer": [
        "How would you design a scalable REST API for a high-traffic e-commerce platform?",
        "Explain database indexing and when you would use a composite index.",
        "Walk me through handling authentication — JWT vs. sessions vs. OAuth2.",
        "How do you approach database migrations with zero downtime?",
        "Describe a caching strategy for a Node.js service with PostgreSQL."
    ],
    "machine learning engineer": [
        "Explain the bias-variance tradeoff and how you diagnose each in practice.",
        "How would you handle severe class imbalance in a binary classification problem?",
        "Describe your approach to feature engineering for a tabular dataset.",
        "Walk me through deploying a ML model to production — from training to inference.",
        "What is gradient descent and how does the Adam optimiser improve on vanilla SGD?"
    ],
    "devops engineer": [
        "Describe a Kubernetes deployment strategy that achieves zero-downtime rollouts.",
        "How would you design a CI/CD pipeline for a microservices architecture?",
        "Explain how Prometheus and Grafana work together for observability.",
        "Walk me through securing secrets in a containerised environment.",
        "How do you approach infrastructure-as-code with Terraform at scale?"
    ],
    "data scientist": [
        "What is the difference between Pearson and Spearman correlation, and when to use each?",
        "How would you evaluate a classification model beyond accuracy?",
        "Explain cross-validation strategies and the risk of data leakage.",
        "Describe your approach to exploratory data analysis on a new dataset.",
        "How do you communicate uncertainty in a model's predictions to non-technical stakeholders?"
    ]
}

HR_QUESTIONS = [
    "Tell me about a time you had a disagreement with a team member and how you resolved it.",
    "Describe a project you're most proud of. What was your specific contribution?",
    "Where do you see yourself professionally in the next three years?",
    "How do you prioritise competing deadlines when everything feels urgent?",
    "What does an ideal engineering culture look like to you?",
    "Tell me about a time you failed. What did you learn from it?",
    "How do you keep your technical skills up to date?",
    "Describe your communication style when working with non-technical stakeholders."
]

GITHUB_MOCK = {
    "octocat":       {"stack": ["JavaScript","Python","Shell"],  "quality": 82, "repos": 8,  "stars": 1840},
    "torvalds":      {"stack": ["C","Shell","Python"],           "quality": 99, "repos": 6,  "stars": 22000},
    "gaearon":       {"stack": ["JavaScript","TypeScript"],      "quality": 97, "repos": 62, "stars": 58000},
    "__default__":   {"stack": ["Python","JavaScript"],          "quality": 71, "repos": 12, "stars": 240},
}

# ── Helpers ───────────────────────────────────────────────────────────────────

def _resolve_role(role: str) -> str:
    r = role.lower().strip()
    for canonical in ROLE_SKILLS:
        if canonical in r or r in canonical:
            return canonical
    return "frontend developer"

def _ats_detail(skills: List[str], role: str) -> dict:
    role_data = ROLE_SKILLS.get(role, ROLE_SKILLS["frontend developer"])
    core_hit   = set(skills) & set(role_data["core"])
    tools_hit  = set(skills) & set(role_data["tools"])
    support_hit = set(skills) & set(role_data["support"])

    ats = int(
        (len(core_hit) / len(role_data["core"])) * 50 +
        (len(tools_hit) / max(len(role_data["tools"]), 1)) * 30 +
        (len(support_hit) / max(len(role_data["support"]), 1)) * 20
    )
    missing_keywords = (
        list(set(role_data["core"])    - set(skills)) +
        list(set(role_data["tools"])   - set(skills)) +
        list(set(role_data["support"]) - set(skills))
    )
    return {
        "ats_score": ats,
        "recruiter_compatibility": min(100, ats + random.randint(3, 12)),
        "missing_keywords": missing_keywords[:8],
        "formatting_issues": [
            "Missing quantified achievements in experience section",
            "Summary section is too brief — recommend 3–4 sentences",
            "Skills section not ATS-optimised — use a flat list format"
        ] if ats < 70 else [
            "Summary section could be slightly more targeted to the role"
        ],
        "suggestions": [
            f"Add these missing keywords to your resume: {', '.join(missing_keywords[:3])}",
            "Quantify at least 3 impact statements (e.g. 'reduced latency by 40%')",
            "Tailor your summary to explicitly mention the target role title",
            "Move skills section above experience for ATS parsers"
        ]
    }

# ── Endpoints ─────────────────────────────────────────────────────────────────

@router.post("/resume/analyze")
def analyze_resume_api(body: ResumeAnalyzeRequest):
    """ATS analysis with detailed breakdown — mock-backed for frontend demo."""
    role = _resolve_role(body.role)
    detail = _ats_detail(body.skills, role)

    gaps = {
        "critical": list(set(ROLE_SKILLS[role]["core"])    - set(body.skills)),
        "tools":    list(set(ROLE_SKILLS[role]["tools"])   - set(body.skills)),
        "support":  list(set(ROLE_SKILLS[role]["support"]) - set(body.skills)),
    }
    roadmap      = generate_roadmap(gaps)
    weekly_plan  = generate_weekly_roadmap(gaps)

    return {
        "role": role,
        "detected_skills": body.skills,
        **detail,
        "gaps": gaps,
        "roadmap": roadmap,
        "weekly_roadmap": weekly_plan,
    }


@router.post("/skills/gap-analysis")
def gap_analysis(body: GapAnalysisRequest):
    """Compute skill gaps and readiness for a given target role."""
    role      = _resolve_role(body.target_role)
    role_data = ROLE_SKILLS.get(role, ROLE_SKILLS["frontend developer"])
    current   = [s.lower().strip() for s in body.current_skills]

    all_required = role_data["core"] + role_data["tools"] + role_data["support"]
    matched      = [s for s in all_required if s in current]
    missing      = [s for s in all_required if s not in current]
    readiness    = int((len(matched) / max(len(all_required), 1)) * 100)

    gaps = {
        "critical": list(set(role_data["core"])    - set(current)),
        "tools":    list(set(role_data["tools"])   - set(current)),
        "support":  list(set(role_data["support"]) - set(current)),
    }
    roadmap     = generate_roadmap(gaps)
    weekly_plan = generate_weekly_roadmap(gaps)

    recommendations = []
    for skill in missing[:5]:
        data = RESOURCE_DB.get(skill)
        if data:
            recommendations.append({
                "skill":      skill,
                "resource":   data["resources"][0][0],
                "url":        data["resources"][0][1],
                "time":       data["time"],
                "difficulty": data["difficulty"],
            })

    return {
        "target_role":        role,
        "readiness_pct":      readiness,
        "matched_skills":     matched,
        "missing_skills":     missing,
        "gaps":               gaps,
        "roadmap":            roadmap,
        "weekly_roadmap":     weekly_plan,
        "recommendations":    recommendations,
    }


@router.post("/jobs/recommendations")
def job_recommendations(body: JobRecommendationsRequest):
    """Return personalised job listings sorted by match score."""
    role = _resolve_role(body.role)

    # Adjust mock scores slightly based on skills overlap
    skill_set = set(s.lower() for s in body.skills)
    jobs = []
    for j in MOCK_JOBS:
        score = j["match"]
        if any(s in j["role"].lower() for s in skill_set):
            score = min(100, score + 5)
        jobs.append({**j, "match": score})

    jobs.sort(key=lambda x: x["match"], reverse=True)

    return {
        "role":   role,
        "count":  len(jobs),
        "jobs":   jobs,
    }


@router.post("/interview/start")
def interview_start(body: InterviewStartRequest):
    """Return a set of interview questions for the given role and mode."""
    role = _resolve_role(body.role)
    mode = body.mode.lower()

    if mode == "hr":
        questions = random.sample(HR_QUESTIONS, min(5, len(HR_QUESTIONS)))
    else:
        pool = TECHNICAL_QUESTIONS.get(role, TECHNICAL_QUESTIONS["frontend developer"])
        questions = pool[:5]

    return {
        "role":      role,
        "mode":      mode,
        "questions": questions,
        "time_limit_minutes": 30,
        "tips": [
            "Use the STAR method for behavioural questions.",
            "Think out loud — interviewers value your reasoning process.",
            "Ask a clarifying question before diving into complex answers.",
        ],
    }


@router.post("/interview/evaluate")
def interview_evaluate(body: InterviewEvaluateRequest):
    """Score and provide feedback on a completed mock interview."""
    role = _resolve_role(body.role)
    mode = body.mode.lower()

    # Deterministic mock score based on answer length heuristic
    avg_len = sum(len(a) for a in body.answers) / max(len(body.answers), 1)
    raw     = min(100, int(50 + avg_len / 6))
    score   = max(40, min(98, raw + random.randint(-5, 8)))

    strengths = [
        "Clear and structured responses",
        "Good use of concrete examples",
        "Demonstrated depth of technical knowledge",
    ]
    improvements = [
        "Some answers could be more concise — aim for 90–120 seconds per answer",
        "Add more quantifiable outcomes to your examples",
        "Strengthen answers around system design trade-offs",
    ]

    if score >= 85:
        verdict = "Strong Pass"
        colour  = "green"
    elif score >= 70:
        verdict = "Pass"
        colour  = "blue"
    elif score >= 55:
        verdict = "Borderline"
        colour  = "amber"
    else:
        verdict = "Needs Work"
        colour  = "red"

    return {
        "role":         role,
        "mode":         mode,
        "overall_score": score,
        "verdict":      verdict,
        "verdict_color": colour,
        "strengths":    strengths,
        "improvements": improvements,
        "per_question": [
            {
                "question_index": i + 1,
                "score":          max(40, min(100, score + random.randint(-15, 15))),
                "feedback":       "Good depth, could add a concrete metric.",
            }
            for i in range(len(body.answers))
        ],
    }


@router.post("/github/analyze")
def github_analyze(body: GitHubAnalyzeRequest):
    """Analyse a GitHub profile and return stack + quality signals (mock)."""
    username = body.username.lower().strip()
    profile  = GITHUB_MOCK.get(username, GITHUB_MOCK["__default__"])

    repo_summaries = [
        {
            "name":        f"{username}/awesome-project-{i+1}",
            "description": f"A {'production-grade' if i == 0 else 'personal'} project using {profile['stack'][i % len(profile['stack'])]}",
            "stars":       profile["stars"] // (i + 1),
            "language":    profile["stack"][i % len(profile["stack"])],
            "quality":     max(50, profile["quality"] - i * 7),
        }
        for i in range(min(4, profile["repos"]))
    ]

    return {
        "username":       body.username,
        "detected_stack": profile["stack"],
        "public_repos":   profile["repos"],
        "total_stars":    profile["stars"],
        "project_quality_score": profile["quality"],
        "quality_label":  "Excellent" if profile["quality"] >= 90 else "Good" if profile["quality"] >= 70 else "Developing",
        "top_repos":      repo_summaries,
        "insights": [
            f"Strong {profile['stack'][0]} presence across repositories",
            f"{profile['repos']} public repos demonstrate consistent activity",
            "README quality indicates good documentation habits" if profile["quality"] >= 75 else "Improving README documentation would increase profile credibility",
        ],
    }
