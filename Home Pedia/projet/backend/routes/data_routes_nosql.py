# app/routes/data_routes.py
from fastapi import APIRouter, HTTPException
from typing import List
from crud import retrieve_all_data, retrieve_data_by_commune, create_data
from models.model_data_nosql import RealEstateData
from database.mongodb import test_db_connection  # Importer la fonction de test de connexion


router = APIRouter()

@router.get("/", response_description="Get all data", response_model=List[RealEstateData])
async def get_all_data():
    data = await retrieve_all_data()
    return data



@router.get("/{commune}", response_description="Get data by commune", response_model=List[RealEstateData])
async def get_data_by_commune(commune: str):
    data = await retrieve_data_by_commune(commune)
    if not data:
        raise HTTPException(status_code=404, detail="Data not found")
    return data

@router.post("/", response_description="Add new data", response_model=RealEstateData)
async def add_data(data: RealEstateData):
    new_data_id = await create_data(data)
    return {"id": new_data_id}

@router.get("/test-db-connection", response_description="Test DB Connection")
async def test_db():
    result = await test_db_connection()
    return result