from app.core.database import SessionLocal
from app.models.user import User
from app.models.role import Role
from app.models.permission import Permission
from app.core.security import hash_password


def seed_data():
    db = SessionLocal()

    # ================= ROLES =================

    admin_role = db.query(Role).filter_by(name="admin").first()

    if not admin_role:
        admin_role = Role(name="admin")
        db.add(admin_role)

    user_role = db.query(Role).filter_by(name="user").first()

    if not user_role:
        user_role = Role(name="user")
        db.add(user_role)

    db.commit()

    # refresh IDs after commit
    db.refresh(admin_role)
    db.refresh(user_role)

    # ================= PERMISSIONS =================

    permission_names = [
        "user:read",
        "user:create",
        "user:update",
        "user:delete",
        "claim:process",
    ]

    for perm_name in permission_names:

        existing_permission = (
            db.query(Permission)
            .filter_by(name=perm_name)
            .first()
        )

        if not existing_permission:
            db.add(Permission(name=perm_name))

    db.commit()

    # ================= ADMIN USER =================

    existing_admin = (
        db.query(User)
        .filter_by(email="admin@example.com")
        .first()
    )

    if not existing_admin:

        admin_user = User(
            email="admin@example.com",
            full_name="Admin",
            password=hash_password("123456"),
            role_id=admin_role.id,
            is_active=True
        )

        db.add(admin_user)
        db.commit()

    db.close()

    print("✅ Seed completed")