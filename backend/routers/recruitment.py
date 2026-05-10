"""
routers/recruitment.py
Recruiter-side endpoints:
  POST /api/recruitment/search
  POST /api/recruitment/screen
  POST /api/recruitment/match
  POST /api/recruitment/schedule
  GET  /api/recruitment/analytics
"""

from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional
import random

router = APIRouter(prefix="/api/recruitment", tags=["recruitment"])

# ── Pydantic models ───────────────────────────────────────────────────────────

class CandidateSearchRequest(BaseModel):
    query:      Optional[str]  = ""
    skills:     Optional[List[str]] = []
    location:   Optional[str]  = ""
    experience: Optional[str]  = ""   # e.g. "3+"
    salary_min: Optional[int]  = 0

class ScreenRequest(BaseModel):
    job_id:     Optional[str]  = "job_001"
    candidates: Optional[List[str]] = []   # candidate IDs or names

class MatchRequest(BaseModel):
    job_description: str
    top_n: Optional[int] = 5

class ScheduleRequest(BaseModel):
    candidate_name: str
    role:           str
    interviewer:    str
    datetime_str:   str   # e.g. "2025-05-14T15:00"
    mode:           Optional[str] = "video"  # "video"|"onsite"

# ── Mock candidate pool ───────────────────────────────────────────────────────

CANDIDATE_POOL = [
    {"id": "c01", "name": "Sarah Chen",        "role": "Frontend Developer",   "exp_yrs": 5, "location": "San Francisco, CA", "salary": 130000, "remote": True,  "skills": ["React","TypeScript","CSS"],          "match": 94, "status": "shortlisted"},
    {"id": "c02", "name": "Michael Rodriguez", "role": "Full Stack Developer", "exp_yrs": 7, "location": "New York, NY",      "salary": 155000, "remote": False, "skills": ["Node.js","PostgreSQL","React"],      "match": 88, "status": "screening"},
    {"id": "c03", "name": "Emily Watson",      "role": "Frontend Developer",   "exp_yrs": 3, "location": "Austin, TX",        "salary": 105000, "remote": True,  "skills": ["Vue","JavaScript","Figma"],          "match": 85, "status": "interview"},
    {"id": "c04", "name": "David Park",        "role": "DevOps Engineer",      "exp_yrs": 8, "location": "Seattle, WA",       "salary": 165000, "remote": True,  "skills": ["Kubernetes","Docker","AWS"],         "match": 97, "status": "offer"},
    {"id": "c05", "name": "Jessica Liu",       "role": "Full Stack Developer", "exp_yrs": 4, "location": "Chicago, IL",       "salary": 120000, "remote": False, "skills": ["React","MongoDB","Express"],         "match": 82, "status": "screening"},
    {"id": "c06", "name": "Alex Thompson",     "role": "DevOps Engineer",      "exp_yrs": 6, "location": "Remote",            "salary": 145000, "remote": True,  "skills": ["Terraform","CI/CD","GCP"],           "match": 90, "status": "shortlisted"},
    {"id": "c07", "name": "Priya Nair",        "role": "ML Engineer",          "exp_yrs": 5, "location": "Remote",            "salary": 160000, "remote": True,  "skills": ["PyTorch","Python","MLflow"],         "match": 93, "status": "shortlisted"},
    {"id": "c08", "name": "Marcus Held",       "role": "Data Engineer",        "exp_yrs": 6, "location": "Boston, MA",        "salary": 140000, "remote": False, "skills": ["Spark","dbt","Airflow"],             "match": 87, "status": "screening"},
]

PIPELINE_STAGES = [
    {"stage": "Applied",     "count": 54},
    {"stage": "Screened",    "count": 32},
    {"stage": "Shortlisted", "count": 18},
    {"stage": "Interviewed", "count": 12},
    {"stage": "Offer Sent",  "count":  4},
    {"stage": "Hired",       "count":  2},
]

ANALYTICS_DATA = {
    "summary": {
        "total_applications":     54,
        "active_jobs":             3,
        "avg_time_to_hire_days":  18,
        "offers_extended":         4,
        "offer_acceptance_rate":  75,
        "shortlisted":            18,
    },
    "funnel_conversion": [
        {"stage": "Applied → Screened",   "rate": 59},
        {"stage": "Screened → Interview", "rate": 37},
        {"stage": "Interview → Offer",    "rate": 33},
        {"stage": "Offer → Accepted",     "rate": 75},
    ],
    "top_sources": [
        {"source": "LinkedIn",       "pct": 42, "hired": 1},
        {"source": "Direct Apply",   "pct": 28, "hired": 1},
        {"source": "Referral",       "pct": 18, "hired": 0},
        {"source": "Job Boards",     "pct": 12, "hired": 0},
    ],
    "applications_by_month": [
        {"month": "March", "count": 12},
        {"month": "April", "count": 18},
        {"month": "May",   "count": 24},
    ],
    "pipeline": PIPELINE_STAGES,
}

INTERVIEW_SCHEDULE = [
    {"candidate": "Emily Watson",      "role": "Frontend Developer",   "time": "Mon 12 May · 2:00 PM",  "interviewer": "Dana West",   "status": "confirmed", "mode": "video"},
    {"candidate": "Sarah Chen",        "role": "Frontend Developer",   "time": "Tue 13 May · 10:30 AM", "interviewer": "James Kim",   "status": "confirmed", "mode": "video"},
    {"candidate": "Michael Rodriguez", "role": "Full Stack Developer", "time": "Wed 14 May · 3:00 PM",  "interviewer": "Priya Nair",  "status": "pending",   "mode": "onsite"},
    {"candidate": "Alex Thompson",     "role": "DevOps Engineer",      "time": "Thu 15 May · 11:00 AM", "interviewer": "Marcus Held", "status": "confirmed", "mode": "video"},
]

# ── Endpoints ─────────────────────────────────────────────────────────────────

@router.post("/search")
def search_candidates(body: CandidateSearchRequest):
    """Filter candidate pool by skills, location, experience, and salary."""
    results = list(CANDIDATE_POOL)

    if body.query:
        q = body.query.lower()
        results = [
            c for c in results
            if q in c["name"].lower()
            or q in c["role"].lower()
            or any(q in s.lower() for s in c["skills"])
        ]

    if body.skills:
        wanted = set(s.lower() for s in body.skills)
        results = [c for c in results if wanted & {s.lower() for s in c["skills"]}]

    if body.location:
        loc = body.location.lower()
        results = [c for c in results if loc in c["location"].lower() or (loc == "remote" and c["remote"])]

    if body.experience:
        try:
            min_exp = int(body.experience.replace("+", ""))
            results = [c for c in results if c["exp_yrs"] >= min_exp]
        except ValueError:
            pass

    if body.salary_min:
        results = [c for c in results if c["salary"] >= body.salary_min]

    results.sort(key=lambda x: x["match"], reverse=True)
    return {"count": len(results), "candidates": results}


@router.post("/screen")
def screen_resumes(body: ScreenRequest):
    """ATS-rank all candidates in the pool for a job opening."""
    ranked = sorted(CANDIDATE_POOL, key=lambda x: x["match"], reverse=True)

    screened = []
    for i, c in enumerate(ranked):
        shortlist = c["match"] >= 88
        screened.append({
            "rank":          i + 1,
            "id":            c["id"],
            "name":          c["name"],
            "role":          c["role"],
            "match_score":   c["match"],
            "status":        "shortlisted" if shortlist else "screening",
            "ats_flags":     [] if shortlist else ["Missing 1–2 core keywords"],
            "recommendation": "Advance to interview" if shortlist else "Secondary review",
        })

    return {
        "job_id":         body.job_id,
        "total_screened": len(screened),
        "shortlisted":    sum(1 for s in screened if s["status"] == "shortlisted"),
        "results":        screened,
    }


@router.post("/match")
def match_candidates(body: MatchRequest):
    """Score all candidates against a raw job description (keyword heuristic)."""
    jd_lower = body.job_description.lower()

    scored = []
    for c in CANDIDATE_POOL:
        keyword_hits = sum(1 for s in c["skills"] if s.lower() in jd_lower)
        role_hit     = 2 if any(word in jd_lower for word in c["role"].lower().split()) else 0
        raw_score    = min(100, c["match"] + keyword_hits * 3 + role_hit * 2)
        scored.append({**c, "jd_match": raw_score, "keyword_hits": keyword_hits})

    scored.sort(key=lambda x: x["jd_match"], reverse=True)
    top = scored[: body.top_n]

    for i, c in enumerate(top):
        c["rank"]   = i + 1
        c["reason"] = (
            f"{c['keyword_hits']} skill overlap(s) with JD; "
            f"strong {c['skills'][0]} background."
        )

    return {
        "total_evaluated": len(scored),
        "top_matches":     top,
        "jd_word_count":   len(body.job_description.split()),
    }


@router.post("/schedule")
def schedule_interview(body: ScheduleRequest):
    """Book an interview slot and return a confirmation."""
    confirm_id = f"INT-{random.randint(10000, 99999)}"
    return {
        "confirmation_id": confirm_id,
        "candidate":       body.candidate_name,
        "role":            body.role,
        "interviewer":     body.interviewer,
        "scheduled_at":    body.datetime_str,
        "mode":            body.mode,
        "status":          "confirmed",
        "calendar_link":   f"https://calendar.acip.ai/event/{confirm_id}",
        "message":         f"Interview confirmed for {body.candidate_name} on {body.datetime_str}.",
    }


@router.get("/analytics")
def recruitment_analytics():
    """Return full recruitment analytics dashboard data."""
    return ANALYTICS_DATA
