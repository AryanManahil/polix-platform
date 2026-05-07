from pydantic import BaseModel, EmailStr, Field
from typing import Optional


# ================= REGISTER =================

class UserCreate(BaseModel):
    email: EmailStr
    full_name: str = Field(min_length=3, max_length=100)
    password: str = Field(min_length=6, max_length=100)


# ================= RESPONSE =================

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    full_name: str
    role: Optional[str]

    class Config:
        from_attributes = True