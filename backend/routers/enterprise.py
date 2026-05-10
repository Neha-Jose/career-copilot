"""
routers/enterprise.py
Enterprise-side endpoints:
  GET  /api/enterprise/workforce
  POST /api/enterprise/upskill
  GET  /api/enterprise/insights
  POST /api/enterprise/demo
"""

from fastapi import APIRouter
from pydantic import BaseModel, EmailStr
from typing import List, Optional

from roadmap import generate_roadmap, generate_weekly_roadmap
from utils import ROLE_SKILLS

router = APIRouter(prefix="/api/enterprise", tags=["enterprise"])

# ── Pydantic models ───────────────────────────────────────────────────────────

class UpskillRequest(BaseModel):
    employee_id:   Optional[str] = ""
    employee_name: Optional[str] = ""
    department:    str
    current_skills: List[str]
    target_role:   str

class DemoRequest(BaseModel):
    company:        str
    contact_name:   Optional[str] = ""
    email:          str
    employee_count: Optional[str] = ""
    message:        Optional[str] = ""

# ── Mock data ─────────────────────────────────────────────────────────────────

WORKFORCE_DATA = {
    "summary": {
        "total_employees":    420,
        "workforce_readiness": 74,
        "skill_distribution":  81,
        "attrition_risk_pct":  12,
        "high_risk_employees": 48,
        "department_health":   8.4,
        "active_learning_paths": 4,
        "certifications_this_quarter": 23,
    },
    "departments": [
        {"name": "Engineering",  "employees": 140, "readiness": 82, "gap": 18, "attrition_risk": "Low",    "health": 9.1},
        {"name": "Product",      "employees":  60, "readiness": 71, "gap": 29, "attrition_risk": "Medium", "health": 8.0},
        {"name": "Sales",        "employees":  95, "readiness": 65, "gap": 35, "attrition_risk": "High",   "health": 7.2},
        {"name": "Operations",   "employees":  80, "readiness": 78, "gap": 22, "attrition_risk": "Low",    "health": 8.5},
        {"name": "Data & AI",    "employees":  45, "readiness": 88, "gap": 12, "attrition_risk": "Low",    "health": 9.4},
    ],
    "skill_coverage": [
        {"skill": "Python",           "coverage": 68},
        {"skill": "Cloud (AWS/GCP)",  "coverage": 52},
        {"skill": "Data Analysis",    "coverage": 61},
        {"skill": "React / Frontend", "coverage": 75},
        {"skill": "AI / ML",          "coverage": 39},
        {"skill": "Agile / Scrum",    "coverage": 84},
    ],
    "top_skill_gaps": [
        {"skill": "LLM / Generative AI", "gap_pct": 78, "impacted_employees": 62},
        {"skill": "Kubernetes",           "gap_pct": 55, "impacted_employees": 38},
        {"skill": "Data Governance",      "gap_pct": 49, "impacted_employees": 44},
        {"skill": "Go / Rust",            "gap_pct": 42, "impacted_employees": 27},
        {"skill": "Product Analytics",    "gap_pct": 37, "impacted_employees": 31},
    ],
    "employees_sample": [
        {"id": "e01", "name": "Priya Nair",   "dept": "Data & AI",   "skills": ["Python","PyTorch","ML"],         "completion": 92},
        {"id": "e02", "name": "James Cole",   "dept": "Product",     "skills": ["Figma","Roadmapping","SQL"],      "completion": 78},
        {"id": "e03", "name": "Dana West",    "dept": "Sales",       "skills": ["CRM","Negotiation"],              "completion": 61},
        {"id": "e04", "name": "Marcus Held",  "dept": "Data & AI",   "skills": ["PyTorch","Spark","dbt"],          "completion": 95},
        {"id": "e05", "name": "Sofia Reyes",  "dept": "Operations",  "skills": ["Lean","Excel","JIRA"],            "completion": 74},
        {"id": "e06", "name": "Tom Bradley",  "dept": "Engineering", "skills": ["React","TypeScript","Node.js"],   "completion": 88},
    ],
}

INSIGHTS_DATA = {
    "hiring_forecasts": [
        {"role": "Senior ML Engineer",    "dept": "Data & AI",   "priority": "Critical", "timeline": "Q3 2025", "headcount": 4},
        {"role": "Frontend Developer",    "dept": "Engineering", "priority": "High",     "timeline": "Q3 2025", "headcount": 6},
        {"role": "Product Manager",       "dept": "Product",     "priority": "Medium",   "timeline": "Q4 2025", "headcount": 2},
        {"role": "Revenue Operations",    "dept": "Sales",       "priority": "High",     "timeline": "Q3 2025", "headcount": 3},
        {"role": "Data Engineer",         "dept": "Data & AI",   "priority": "High",     "timeline": "Q3 2025", "headcount": 2},
    ],
    "performance_distribution": {
        "high_performers":  {"pct": 22, "label": "Exceeding all OKRs"},
        "on_track":         {"pct": 61, "label": "Meeting targets"},
        "needs_support":    {"pct": 17, "label": "Flagged for coaching"},
    },
    "internal_mobility": {
        "promotions_ytd":       12,
        "lateral_moves_ytd":     8,
        "internal_fill_rate":   34,
    },
    "learning_roi": {
        "avg_productivity_gain_pct": 18,
        "retention_improvement_pct": 31,
        "cost_per_skill_acquisition": "$420",
        "certifications_completed_ytd": 23,
    },
    "attrition_signals": [
        {"department": "Sales",    "risk": "High",   "top_reason": "Below-market compensation", "employees_at_risk": 14},
        {"department": "Product",  "risk": "Medium", "top_reason": "Limited growth path",       "employees_at_risk":  9},
        {"department": "Ops",      "risk": "Low",    "top_reason": "Manager satisfaction",      "employees_at_risk":  4},
    ],
}

LEARNING_PATHS = [
    {"id": "lp01", "title": "AI & Machine Learning Fundamentals", "enrolled": 38, "cert": "Google Cloud ML",       "progress_avg": 64, "weeks": 8 },
    {"id": "lp02", "title": "Cloud Architecture (AWS)",           "enrolled": 52, "cert": "AWS Solutions Arch",    "progress_avg": 41, "weeks": 12},
    {"id": "lp03", "title": "Product-Led Growth",                 "enrolled": 24, "cert": "AIPMM CPM",             "progress_avg": 78, "weeks": 6 },
    {"id": "lp04", "title": "Advanced Data Engineering",          "enrolled": 19, "cert": "Databricks Associate",  "progress_avg": 55, "weeks": 10},
]

# ── Endpoints ─────────────────────────────────────────────────────────────────

@router.get("/workforce")
def get_workforce():
    """Full workforce analytics snapshot including department breakdown and skill coverage."""
    return {
        **WORKFORCE_DATA,
        "learning_paths": LEARNING_PATHS,
    }


@router.post("/upskill")
def create_upskill_plan(body: UpskillRequest):
    """Generate a personalised learning roadmap for an employee using roadmap.py."""
    role      = body.target_role.lower().strip()
    role_data = ROLE_SKILLS.get(role, ROLE_SKILLS.get("frontend developer"))

    # Resolve loosely matched role
    for canonical in ROLE_SKILLS:
        if canonical in role or role in canonical:
            role_data = ROLE_SKILLS[canonical]
            role = canonical
            break

    current = [s.lower().strip() for s in body.current_skills]
    gaps = {
        "critical": list(set(role_data["core"])    - set(current)),
        "tools":    list(set(role_data["tools"])   - set(current)),
        "support":  list(set(role_data["support"]) - set(current)),
    }

    all_required = role_data["core"] + role_data["tools"] + role_data["support"]
    matched      = [s for s in all_required if s in current]
    readiness    = int((len(matched) / max(len(all_required), 1)) * 100)

    roadmap      = generate_roadmap(gaps)
    weekly_plan  = generate_weekly_roadmap(gaps)

    return {
        "employee":        body.employee_name or body.employee_id or "Employee",
        "department":      body.department,
        "target_role":     role,
        "readiness_pct":   readiness,
        "matched_skills":  matched,
        "gaps":            gaps,
        "roadmap":         roadmap,
        "weekly_roadmap":  weekly_plan,
        "estimated_weeks": (
            len(gaps["critical"]) * 3 +
            len(gaps["tools"]) * 2 +
            len(gaps["support"]) * 1
        ) // max(len(all_required), 1) + 4,
        "recommended_paths": [
            lp for lp in LEARNING_PATHS
            if any(word in lp["title"].lower() for word in role.split())
        ] or LEARNING_PATHS[:2],
    }


@router.get("/insights")
def get_insights():
    """Talent intelligence: hiring forecasts, skill gaps, performance, attrition signals."""
    return INSIGHTS_DATA


@router.post("/demo")
def request_demo(body: DemoRequest):
    """Accept an enterprise demo request and return a confirmation."""
    if not body.company or not body.email:
        return {"error": "company and email are required"}

    return {
        "success": True,
        "confirmation_id": f"DEMO-{abs(hash(body.email)) % 100000:05d}",
        "message": (
            f"Thank you, {body.contact_name or 'there'}! "
            f"We've received your demo request for {body.company} "
            f"and will be in touch at {body.email} within one business day."
        ),
        "next_steps": [
            "Check your inbox for a calendar invite from our enterprise team",
            "We'll tailor the session to your team size and use case",
            "Feel free to reply to that email with any questions beforehand",
        ],
        "estimated_response": "Within 1 business day",
    }
