
import json
import pandas as pd

# Définir les schémas pour les différentes catégories de données
parville_schema = {
    "ville": str, "securite": float, "culture": float, "animation": float,
    "environnement": float, "vie-pratique": float, "nb-habitant": str,
    "superficie": str, "densite": str, "population-active": str,
    "taux-chomage": str, "revenu-moyen": str, "prix-m2": str, "age-population": str
}

pardepartement_schema = {
    "departement": str, "securite": float, "culture": float, "animation": float,
    "environnement": float, "vie-pratique": float, "nb-habitant": str,
    "superficie": str, "densite": str, "population-active": str,
    "taux-chomage": str, "revenu-moyen": str, "prix-m2": str, "age-population": str
}

parregion_schema = {
    "region": str, "securite": float, "culture": float, "animation": float,
    "environnement": float, "vie-pratique": float, "nb-habitant": str,
    "superficie": str, "densite": str, "population-active": str,
    "taux-chomage": str, "revenu-moyen": str, "prix-m2": str, "age-population": str
}

# Fonction pour convertir les champs nécessaires en float
# Fonction pour convertir les champs nécessaires en float
def convert_to_float(data, keys):
    for item in data:
        for key in keys:
            if key in item:  # Vérifier si la clé existe
                item[key] = float(item[key]) if item[key] != '' else None
    return data

# Lire le fichier JSON
file_path = "D:/school_prj_c/sem10/T-DAT-902-PAR_22/backend/data/all_data.json"

with open(file_path, "r", encoding="utf-8") as file:
    raw_data = json.load(file)

# Convertir les champs en float pour chaque catégorie de données
parville_data = convert_to_float(raw_data["data"]["parville"], ["securite", "culture", "animation", "environnement", "vie-pratique"])
pardepartement_data = convert_to_float(raw_data["data"]["pardepartement"], ["securite", "culture", "animation", "environnement", "vie-pratique"])
parregion_data = convert_to_float(raw_data["data"]["parregion"], ["securite", "culture", "animation", "environnement", "vie-pratique"])

# Créer des DataFrames Pandas pour chaque catégorie de données
parville_df = pd.DataFrame(parville_data)
pardepartement_df = pd.DataFrame(pardepartement_data)
parregion_df = pd.DataFrame(parregion_data)

# Écrire les DataFrames dans une base de données SQLite
import sqlite3

db_path = "D:/school_prj_c/sem10/T-DAT-902-PAR_22/backend/database/my_database.db"

with sqlite3.connect(db_path) as conn:
    parville_df.to_sql("parville", conn, if_exists="replace", index=False)
    pardepartement_df.to_sql("pardepartement", conn, if_exists="replace", index=False)
    parregion_df.to_sql("parregion", conn, if_exists="replace", index=False)

print("Les données ont été insérées avec succès dans la base de données SQLite.")


