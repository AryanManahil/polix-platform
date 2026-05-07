from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from app.core.database import Base


class Permission(Base):
    __tablename__ = "permissions"

    id = Column(Integer, primary_key=True, index=True)

    # e.g. "user:delete", "claim:approve"
    name = Column(String(100), unique=True, index=True, nullable=False)

    # optional but VERY useful for IAM systems
    description = Column(String(255), nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)

    # many-to-many with roles
    roles = relationship(
        "Role",
        secondary="role_permissions",
        back_populates="permissions"
    )

    def __repr__(self):
        return f"<Permission(name={self.name})>"