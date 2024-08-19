# app/database.py
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import ConnectionFailure

MONGO_DETAILS = "mongodb://localhost:27017"

# Créer la connexion à la db
client = AsyncIOMotorClient(MONGO_DETAILS)

try:
    # Vérifier la connexion
    client.admin.command('ping')
    print("Connexion réussie à MongoDB")
except ConnectionFailure:
    print("Connexion échouée à MongoDB")

# Récupérer les données
database = client.immobilier
collection = database.transformed_data

async def test_db_connection():
    try:
        document = await collection.find_one()
        if document:
            return {"status": "success", "document": document}
        else:
            return {"status": "success", "document": "No documents found"}
    except Exception as e:
        return {"status": "failure", "error": str(e)}
