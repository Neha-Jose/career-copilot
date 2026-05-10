import os
import shutil
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from database import get_db
from models import Resume, User
from auth import get_current_user
import fitz
from docx import Document
import io

router = APIRouter(prefix="/api/resume", tags=["resume"])

UPLOAD_DIR = "uploads/resumes"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def extract_text_from_bytes(file_bytes: bytes, filename: str) -> str:
    if filename.endswith(".pdf"):
        doc = fitz.open(stream=file_bytes, filetype="pdf")
        text = ""
        for page in doc:
            text += page.get_text()
        return text.lower()
    elif filename.endswith(".docx"):
        doc = Document(io.BytesIO(file_bytes))
        return " ".join([p.text for p in doc.paragraphs]).lower()
    return ""

@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not file.filename.endswith((".pdf", ".docx")):
        raise HTTPException(status_code=400, detail="Only PDF and DOCX files are supported")
    
    try:
        # Read file contents into memory
        contents = await file.read()
        
        # Extract text
        extracted_text = extract_text_from_bytes(contents, file.filename)
        if not extracted_text:
            raise HTTPException(status_code=400, detail="Could not extract text from the file")

        # Generate unique filename to store locally
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        safe_filename = f"{current_user.id}_{timestamp}_{file.filename}"
        file_path = os.path.join(UPLOAD_DIR, safe_filename)
        
        # Save file to disk
        with open(file_path, "wb") as f:
            f.write(contents)
            
        # Save to database
        new_resume = Resume(
            user_id=current_user.id,
            file_path=file_path,
            parsed_data=extracted_text  # Saving the raw extracted text; you could also store structured JSON here
        )
        db.add(new_resume)
        db.commit()
        db.refresh(new_resume)
        
        return {
            "success": True,
            "message": "Resume uploaded successfully",
            "resume_id": new_resume.id,
            "file_path": file_path
        }
        
    except Exception as e:
        print("RESUME UPLOAD ERROR:", str(e))
        raise HTTPException(status_code=500, detail="An error occurred while uploading the resume")
