# app/models.py
from pydantic import BaseModel, Field, validator
from typing import Optional, Union
import math

class RealEstateData(BaseModel):
    Type_local: str
    Commune: str
    Prix_moyen_m2_commune: float
    Valeur_fonciere_moyenne: float
    Surface_reelle_bati_moyenne: float
    Surface_terrain_moyenne: Optional[float] = None
    Prix_median_m2: float
    Valeur_fonciere_25e_percentile: float
    Valeur_fonciere_75e_percentile: float
    Nombre_transactions: int
    Date_mutation: Optional[str] = None
    Nature_mutation: Optional[str] = None
    Code_postal: Optional[str] = None
    Surface_reelle_bati: Optional[float] = None
    Nombre_pieces_principales: Optional[int] = None
    Surface_terrain: Optional[float] = None
    Prix_m2: Optional[float] = None

    @validator('*', pre=True)
    def check_nan(cls, v):
        if isinstance(v, dict) and '$numberDouble' in v:
            if v['$numberDouble'] == 'NaN':
                return None
            return float(v['$numberDouble'])
        elif isinstance(v, float) and math.isnan(v):
            return None
        return v

    class Config:
        arbitrary_types_allowed = True