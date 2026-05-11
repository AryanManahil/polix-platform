from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.exc import OperationalError
import time

from app.core.database import engine, Base

# ================= ROUTES =================
from app.api import auth, users, role, permission, rbac

# ================= MODELS (ENSURE TABLE REGISTRATION) =================
from app.models.user import User
from app.models.role import Role
from app.models.permission import Permission
from app.models.role_permissions import role_permissions


# ================= APP INIT =================
app = FastAPI(
    title="PoliX IAM Service",
    version="1.0.0"
)

# ================= CORS =================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================= DATABASE INIT =================
def init_database():
    retries = 10

    while retries > 0:
        try:
            Base.metadata.create_all(bind=engine)
            print("✅ Database connected & tables created")
            return
        except OperationalError as e:
            print(f"⏳ DB not ready, retrying... ({retries})", e)
            time.sleep(3)
            retries -= 1

    raise Exception("❌ Database connection failed after retries")


# ================= STARTUP EVENT =================
@app.on_event("startup")
def startup_event():
    init_database()
    print("🚀 IAM Service started successfully")


# ================= ROUTE REGISTRATION =================

# Auth Service
app.include_router(auth.router, prefix="/auth", tags=["Auth"])

# Users Service (CLEAN REST STANDARD)
app.include_router(users.router, prefix="/users", tags=["Users"])

# Role Service
app.include_router(role.router, prefix="/roles", tags=["Roles"])

# Permission Service
app.include_router(permission.router, prefix="/permissions", tags=["Permissions"])

# RBAC Service
app.include_router(rbac.router, prefix="/rbac", tags=["RBAC"])


# ================= HEALTH CHECK =================
@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "iam"
    }