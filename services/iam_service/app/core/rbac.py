from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.role import Role


# ================= ROLE-PERMISSION FETCH =================
def get_role_permissions(db: Session, role_name: str):

    role = db.query(Role).filter(Role.name == role_name).first()

    if not role:
        return set()

    return {p.name for p in role.permissions}


# ================= MAIN DECORATOR =================
def require_permission(permission: str):

    def dependency(
        current_user=Depends(get_current_user),
        db: Session = Depends(get_db)
    ):

        role_name = current_user.get("role")

        if not role_name:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Role missing"
            )

        role = db.query(Role).filter(Role.name == role_name).first()

        if not role:
            raise HTTPException(
                status_code=403,
                detail="Role not found"
            )

        permissions = {p.name for p in role.permissions}

        if permission not in permissions:
            raise HTTPException(
                status_code=403,
                detail=f"Permission denied: {permission}"
            )

        return current_user

    return dependency