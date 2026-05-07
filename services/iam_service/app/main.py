from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.exc import OperationalError
from app.core.database import engine, Base
from app.api import auth

import time
import os

# models must be imported so SQLAlchemy registers them
from app.models.user import User
from app.models.role import Role
from app.models.permission import Permission
from app.models.role_permissions import role_permissions


app = FastAPI(title="PoliX IAM Service")


# ================= CORS =================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ================= STARTUP =================
@app.on_event("startup")
def startup():
    retries = 10

    while retries > 0:
        try:
            Base.metadata.create_all(bind=engine)
            print("✅ Database ready")

            # OPTIONAL SEED (SAFE CONTROL)
            if os.getenv("RUN_SEED", "false").lower() == "true":
                from app.core.seed import seed_data
                seed_data()
                print("🌱 Seed executed")
            else:
                print("⏭️ Seed skipped")

            print("🚀 IAM Service started")
            break

        except OperationalError as e:
            print("⏳ DB not ready, retrying...", e)
            time.sleep(3)
            retries -= 1


# ================= ROUTES =================
app.include_router(auth.router, prefix="/auth", tags=["Auth"])


# ================= HEALTH =================
@app.get("/health")
def health():
    return {"status": "ok"}