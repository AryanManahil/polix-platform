from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.role import Role

router = APIRouter()


# ================= CREATE ROLE =================
@router.post("/")
def create_role(name: str, db: Session = Depends(get_db)):

    existing = db.query(Role).filter(
        Role.name == name
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Role already exists"
        )

    role = Role(name=name)

    db.add(role)
    db.commit()
    db.refresh(role)

    return role


# ================= GET ALL ROLES =================
@router.get("/")
def get_roles(db: Session = Depends(get_db)):

    return db.query(Role).all()


# ================= DELETE ROLE =================
@router.delete("/{role_id}")
def delete_role(
    role_id: int,
    db: Session = Depends(get_db)
):

    role = db.query(Role).filter(
        Role.id == role_id
    ).first()

    if not role:
        raise HTTPException(
            status_code=404,
            detail="Role not found"
        )

    db.delete(role)
    db.commit()

    return {
        "message": "Role deleted"
    }