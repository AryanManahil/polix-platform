from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.permission import Permission

router = APIRouter()


# ================= CREATE PERMISSION =================
@router.post("/")
def create_permission(
    name: str,
    db: Session = Depends(get_db)
):

    existing = db.query(Permission).filter(
        Permission.name == name
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Permission already exists"
        )

    permission = Permission(name=name)

    db.add(permission)
    db.commit()
    db.refresh(permission)

    return permission


# ================= GET ALL PERMISSIONS =================
@router.get("/")
def get_permissions(
    db: Session = Depends(get_db)
):

    return db.query(Permission).all()


# ================= DELETE PERMISSION =================
@router.delete("/{permission_id}")
def delete_permission(
    permission_id: int,
    db: Session = Depends(get_db)
):

    permission = db.query(Permission).filter(
        Permission.id == permission_id
    ).first()

    if not permission:
        raise HTTPException(
            status_code=404,
            detail="Permission not found"
        )

    db.delete(permission)
    db.commit()

    return {
        "message": "Permission deleted"
    }