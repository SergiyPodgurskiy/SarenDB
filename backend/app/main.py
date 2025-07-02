from fastapi import FastAPI
from app.core.config import settings

app = FastAPI(title="SarenDB Backend")

@app.get("/")
async def health_check():
    return {"status": "ok", "db": str(settings.database_url)}
