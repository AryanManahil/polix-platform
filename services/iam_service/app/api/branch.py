from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.branch import Branch

router = APIRouter()


# ================= GET ALL BRANCHES =================
@router.get("/")
def get_branches(db: Session = Depends(get_db)):
    return db.query(Branch).all()


# ================= CREATE BRANCH =================
@router.post("/")
def create_branch(data: dict, db: Session = Depends(get_db)):
    branch = Branch(**data)
    db.add(branch)
    db.commit()
    db.refresh(branch)
    return branch