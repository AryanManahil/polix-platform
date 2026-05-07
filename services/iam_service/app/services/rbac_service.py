from sqlalchemy.orm import Session

from app.models.user import User
from app.models.role import Role
from app.models.permission import Permission


# ================= GET USER PERMISSIONS =================
def get_user_permissions(db: Session, user: User):

    role = db.query(Role).filter(Role.id == user.role_id).first()

    if not role:
        return set()

    return {perm.name for perm in role.permissions}


# ================= CHECK PERMISSION =================
def has_permission(db: Session, user: User, permission_name: str) -> bool:
    permissions = get_user_permissions(db, user)
    return permission_name in permissions


# ================= ASSIGN ROLE =================
def assign_role_to_user(db: Session, user: User, role_name: str):

    role = db.query(Role).filter(Role.name == role_name).first()

    if not role:
        raise ValueError("Role not found")

    user.role_id = role.id
    db.commit()
    db.refresh(user)

    return user


# ================= ASSIGN PERMISSION =================
def assign_permission_to_role(db: Session, role_name: str, permission_name: str):

    role = db.query(Role).filter(Role.name == role_name).first()
    permission = db.query(Permission).filter(Permission.name == permission_name).first()

    if not role:
        raise ValueError("Role not found")

    if not permission:
        raise ValueError("Permission not found")

    if permission not in role.permissions:
        role.permissions.append(permission)

    db.commit()
    db.refresh(role)

    return role


# ================= GET ROLE PERMISSIONS =================
def get_role_permissions(db: Session, role_name: str):

    role = db.query(Role).filter(Role.name == role_name).first()

    if not role:
        return set()

    return {perm.name for perm in role.permissions}