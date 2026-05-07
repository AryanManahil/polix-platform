from fastapi import FastAPI

app = FastAPI(title="PoliX Customer Service")

@app.get("/health")
def health():
    return {"status": "Customer service running"}