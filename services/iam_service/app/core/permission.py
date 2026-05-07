from fastapi import Depends, HTTPException
from app.core.deps import get_current_user

# TEMP ROLE MAP (we will upgrade later to DB-based permissions)
ROLE_PERMISSIONS = {
    "admin": [
        "user:read",
        "user:create",
        "user:update",
        "user:delete",
        "claim:process",
    ],
    "user": [
        "user:read"
    ]
}


def require_permission(permission: str):

    def checker(current_user=Depends(get_current_user)):

        role = current_user.get("role")

        if not role:
            raise HTTPException(status_code=403, detail="Role missing")

        allowed = ROLE_PERMISSIONS.get(role, [])

        if permission not in allowed:
            raise HTTPException(status_code=403, detail="Permission denied")

        return current_user

    return checker