from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.company import Company

router = APIRouter()


# ================= GET COMPANY =================
@router.get("/")
def get_company(db: Session = Depends(get_db)):
    company = db.query(Company).first()
    return company


# ================= UPDATE COMPANY =================
@router.put("/")
def update_company(data: dict, db: Session = Depends(get_db)):
    company = db.query(Company).first()

    if not company:
        company = Company(**data)
        db.add(company)
    else:
        for key, value in data.items():
            setattr(company, key, value)

    db.commit()
    db.refresh(company)

    return company