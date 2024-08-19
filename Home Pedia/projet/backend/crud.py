# app/crud.py
from database.mongodb import collection
from models.model_data_nosql import RealEstateData
from sqlalchemy.orm import Session
from models.model_data_sql import Parville, Pardepartement, Parregion
from typing import List

async def retrieve_all_data():
    data = []
    cursor = collection.find({})
    async for document in cursor:
        try:
            data.append(RealEstateData(**document))
        except Exception as e:
            print(f"Erreur lors de la conversion du document : {e}")
            print(f"Document problématique : {document}")
    return data

from typing import List

async def retrieve_data_by_commune(commune: str) -> List[RealEstateData]:
    cursor = collection.find({"Commune": commune})
    documents = await cursor.to_list(length=None)
    result = []
    for document in documents:
        try:
            result.append(RealEstateData(**document))
        except Exception as e:
            print(f"Erreur lors de la conversion du document : {e}")
            print(f"Document problématique : {document}")
    return result

async def create_data(data: RealEstateData) -> str:
    document = data.dict()
    result = await collection.insert_one(document)
    return str(result.inserted_id)





#Fonctions CRUD des données de sqlite

def get_data_by_ville(db: Session, ville: str):
    return db.query(Parville).filter(Parville.ville == ville).first()

def get_data_by_departement(db: Session, departement: str):
    return db.query(Pardepartement).filter(Pardepartement.departement == departement).first()

def get_data_by_region(db: Session, region: str):
    return db.query(Parregion).filter(Parregion.region == region).first()