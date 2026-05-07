from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    full_name = Column(String)
    password = Column(String)

    role_id = Column(Integer, ForeignKey("roles.id"))
    role = relationship("Role")   # ✅ IMPORTANT

    is_active = Column(Boolean, default=True)