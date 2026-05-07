from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from app.models.user import User
from app.models.role import Role

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token
)


# ================= REGISTER =================

def register_user(
    db: Session,
    email: str,
    full_name: str,
    password: str
):

    email = email.lower().strip()

    existing = db.query(User).filter(
        User.email == email
    ).first()

    if existing:
        raise ValueError("Email already registered")

    role = db.query(Role).filter(
        Role.name == "user"
    ).first()

    if not role:
        raise ValueError("Default role not found")

    user = User(
        email=email,
        full_name=full_name.strip(),
        password=hash_password(password),
        role_id=role.id,
        is_active=True
    )

    try:
        db.add(user)
        db.commit()
        db.refresh(user)

        return {
            "id": user.id,
            "email": user.email,
            "full_name": user.full_name,
            "role": role.name
        }

    except IntegrityError:
        db.rollback()
        raise ValueError("Registration failed")


# ================= LOGIN =================

def login_user(
    db: Session,
    email: str,
    password: str
):

    email = email.lower().strip()

    user = db.query(User).filter(
        User.email == email
    ).first()

    if not user:
        return None

    if not verify_password(password, user.password):
        return None

    role_name = user.role.name if user.role else "user"

    token = create_access_token({
        "sub": user.email,
        "id": user.id,
        "role": role_name
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "full_name": user.full_name,
            "role": role_name
        }
    }