from sqlalchemy import Column, String, Float
from database.sqlite_db import Base

class Parville(Base):
    __tablename__ = "parville"
    
    ville = Column(String, primary_key=True, index=True)
    securite = Column(Float)
    culture = Column(Float)
    animation = Column(Float)
    environnement = Column(Float)
    vie_pratique = Column(Float, name="vie-pratique")
    nb_habitant = Column(String, name="nb-habitant")
    superficie = Column(String)
    densite = Column(String)
    population_active = Column(String, name="population-active")
    taux_chomage = Column(String, name="taux-chomage")
    revenu_moyen = Column(String, name="revenu-moyen")
    prix_m2 = Column(String, name="prix-m2")
    age_population = Column(String, name="age-population")

class Pardepartement(Base):
    __tablename__ = "pardepartement"
    
    departement = Column(String, primary_key=True, index=True)
    securite = Column(Float)
    culture = Column(Float)
    animation = Column(Float)
    environnement = Column(Float)
    vie_pratique = Column(Float, name="vie-pratique")
    nb_habitant = Column(String, name="nb-habitant")
    superficie = Column(String)
    densite = Column(String)
    population_active = Column(String, name="population-active")
    taux_chomage = Column(String, name="taux-chomage")
    revenu_moyen = Column(String, name="revenu-moyen")
    prix_m2 = Column(String, name="prix-m2")
    age_population = Column(String, name="age-population")

class Parregion(Base):
    __tablename__ = "parregion"
    
    region = Column(String, primary_key=True, index=True)
    securite = Column(Float)
    culture = Column(Float)
    animation = Column(Float)
    environnement = Column(Float)
    vie_pratique = Column(Float, name="vie-pratique")
    nb_habitant = Column(String, name="nb-habitant")
    superficie = Column(String)
    densite = Column(String)
    population_active = Column(String, name="population-active")
    taux_chomage = Column(String, name="taux-chomage")
    revenu_moyen = Column(String, name="revenu-moyen")
    prix_m2 = Column(String, name="prix-m2")
    age_population = Column(String, name="age-population")