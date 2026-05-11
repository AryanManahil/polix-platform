from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db

from app.models.role import Role
from app.models.permission import Permission

router = APIRouter()


# ================= GET ROLE PERMISSIONS =================
@router.get("/role/{role_id}")
def get_role_permissions(
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

    return [
        {
            "id": p.id,
            "name": p.name
        }
        for p in role.permissions
    ]


# ================= TOGGLE PERMISSION =================
@router.post("/toggle")
def toggle_permission(
    payload: dict,
    db: Session = Depends(get_db)
):

    role_id = payload.get("role_id")
    permission_id = payload.get("permission_id")

    role = db.query(Role).filter(
        Role.id == role_id
    ).first()

    permission = db.query(Permission).filter(
        Permission.id == permission_id
    ).first()

    if not role or not permission:
        raise HTTPException(
            status_code=404,
            detail="Role or Permission not found"
        )

    if permission in role.permissions:
        role.permissions.remove(permission)
        action = "removed"
    else:
        role.permissions.append(permission)
        action = "assigned"

    db.commit()

    return {
        "message": f"Permission {action}"
    }