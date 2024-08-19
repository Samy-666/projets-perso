from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.sqlite_db import get_db
from crud import get_data_by_ville, get_data_by_departement, get_data_by_region

router = APIRouter()

@router.get("/parville/{ville}")
def read_data_by_ville(ville: str, db: Session = Depends(get_db)):
    data = get_data_by_ville(db, ville)
    if data is None:
        raise HTTPException(status_code=404, detail="Ville not found")
    return {
        "ville": data.ville,
        "securite": data.securite,
        "culture": data.culture,
        "animation": data.animation,
        "environnement": data.environnement,
        "vie_pratique": data.vie_pratique,
        "nb_habitant": data.nb_habitant,
        "superficie": data.superficie,
        "densite": data.densite,
        "population_active": data.population_active,
        "taux_chomage": data.taux_chomage,
        "revenu_moyen": data.revenu_moyen,
        "prix_m2": data.prix_m2,
        "age_population": data.age_population
    }

@router.get("/pardepartement/{departement}")
def read_data_by_departement(departement: str, db: Session = Depends(get_db)):
    data = get_data_by_departement(db, departement)
    if data is None:
        raise HTTPException(status_code=404, detail="Departement not found")
    return {
        "departement": data.departement,
        "securite": data.securite,
        "culture": data.culture,
        "animation": data.animation,
        "environnement": data.environnement,
        "vie_pratique": data.vie_pratique,
        "nb_habitant": data.nb_habitant,
        "superficie": data.superficie,
        "densite": data.densite,
        "population_active": data.population_active,
        "taux_chomage": data.taux_chomage,
        "revenu_moyen": data.revenu_moyen,
        "prix_m2": data.prix_m2,
        "age_population": data.age_population
    }

@router.get("/parregion/{region}")
def read_data_by_region(region: str, db: Session = Depends(get_db)):
    data = get_data_by_region(db, region)
    if data is None:
        raise HTTPException(status_code=404, detail="Region not found")
    return {
        "region": data.region,
        "securite": data.securite,
        "culture": data.culture,
        "animation": data.animation,
        "environnement": data.environnement,
        "vie_pratique": data.vie_pratique,
        "nb_habitant": data.nb_habitant,
        "superficie": data.superficie,
        "densite": data.densite,
        "population_active": data.population_active,
        "taux_chomage": data.taux_chomage,
        "revenu_moyen": data.revenu_moyen,
        "prix_m2": data.prix_m2,
        "age_population": data.age_population
    }