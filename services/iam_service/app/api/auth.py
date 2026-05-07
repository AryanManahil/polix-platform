from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

from app.core.database import get_db
from app.core.deps import get_current_user
from app.core.rbac import require_permission

from app.services.auth_service import (
    login_user,
    register_user
)

from app.schemas.user import (
    UserCreate,
    UserResponse
)

from app.models.user import User

router = APIRouter(tags=["Auth"])


# ================= REGISTER =================

@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED
)
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    try:
        return register_user(
            db=db,
            email=user.email,
            full_name=user.full_name,
            password=user.password
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


# ================= LOGIN =================

@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    token = login_user(
        db=db,
        email=form_data.username,
        password=form_data.password
    )

    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    return token


# ================= CURRENT USER =================

@router.get("/me")
def me(
    current_user: dict = Depends(get_current_user)
):

    return current_user


# ================= HOME =================

@router.get("/home")
def home(
    current_user: dict = Depends(get_current_user)
):

    return {
        "message": f"Welcome {current_user['email']}",
        "user": current_user
    }


# ================= DELETE USER =================

@router.delete("/users/{user_id}")
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(
        require_permission("user:delete")
    )
):

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if user.email == current_user["email"]:
        raise HTTPException(
            status_code=400,
            detail="You cannot delete your own account"
        )

    db.delete(user)
    db.commit()

    return {
        "message": "User deleted successfully"
    }