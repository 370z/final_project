from fastapi import FastAPI
from typing import Optional
from pydantic import BaseModel
from datetime import date

app = FastAPI()


@app.get("/", tags=["Root"], description="API is alive")
async def root():
    return {"message": "Hello World"}


@app.get("/{id}", tags=["Root"], description="API is alive")
async def list_id(id: int):
    return {"message": id}


@app.post("/")
async def post():
    return {"message": "Hello from post"}


@app.put("/")
async def put():
    return {"message": "Hello from put"}

fake_items_db = [{"seiyuu_name": "ishigami shizuka"}, {
    "seiyuu_name": "fujita akane"}, {"seiyuu_name": "itou shizuka"}]


@app.get("/seiyuu/")
async def list_items(skip: int = 0, limit: int = 10):
    return fake_items_db[skip: skip + limit]

@app.get("/seiyuu/{seiyuu_id}")
async def get_seiyuu(seiyuu_id: str,q:Optional[str] = None,short:bool = False):
    seiyuu = {"seiyuu_id": seiyuu_id}
    if q:
        seiyuu.update({"q": q})
    if not short:
        seiyuu.update({"description": "This is an amazing seiyuu"})
    return seiyuu

@app.get("/seiyuu/{seiyuu_id}/anime/{anime_id}")
async def get_seiyuu_anime(seiyuu_id: str,anime_id: str,q:Optional[str] = None,short:bool = False):
    seiyuu = {"seiyuu_id": seiyuu_id,"anime_id": anime_id}
    if q:
        seiyuu.update({"q": q})
    if not short:
        seiyuu.update({"description": "This is an amazing seiyuu"})
    return seiyuu

class Seiyuu(BaseModel):
    name: str
    description: Optional[str] = None
    year: Optional[int] = None

@app.post("/seiyuus")
async def create_seiyuu(seiyuu:Seiyuu)->Seiyuu:
    seiyuu_dict=seiyuu.dict()
    if seiyuu.year:
        age = date.today().year - seiyuu.year
        seiyuu_dict.update({"age":age})
        
    return seiyuu_dict

@app.put("/seiyuus/{seiyuu_id}")
async def create_seiyuu_with_put(seiyuu_id,seiyuu:Seiyuu):
    return {"seiyuu_id":seiyuu_id,**seiyuu.dict()}