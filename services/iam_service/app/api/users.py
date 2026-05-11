from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, joinedload

from app.core.database import get_db
from app.models.user import User

router = APIRouter()

# ================= USERS =================
@router.get("/")
def get_users(db: Session = Depends(get_db)):

    users = (
        db.query(User)
        .options(joinedload(User.role))
        .all()
    )

    return [
        {
            "id": user.id,
            "name": user.full_name,
            "email": user.email,
            "role": user.role.name if user.role else None,
            "is_active": user.is_active
        }
        for user in users
    ]