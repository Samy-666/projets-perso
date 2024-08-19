


import pytest
from fastapi.testclient import TestClient
from routes.data_routes_sql import router  # Importez le routeur défini dans data_routes_sql.py

client = TestClient(router)




def test_read_ville():
    ville_name = "gemenos"  # Exemple de nom de ville à tester
    response = client.get(f"/ville/{ville_name}")
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == ville_name  # Vérifiez que le nom de la ville retournée correspond

    # Vérifiez que tous les champs requis sont présents
    required_fields = [
        "name", "securite", "culture", "animation", "environnement", "vie_pratique",
        "nb_habitant", "superficie", "densite", "population_active", "taux_chomage",
        "revenu_moyen", "prix_m2", "age_population"
    ]
    for field in required_fields:
        assert field in data

def test_read_departement():
    departement_name = "ain"  # Exemple de nom de département à tester
    response = client.get(f"/departement/{departement_name}")
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == departement_name
    assert "securite" in data
    assert "culture" in data
    assert "animation" in data
    assert "environnement" in data
    assert "vie-pratique" in data

def test_read_region():
    region_name = "corse"  # Exemple de nom de région à tester
    response = client.get(f"/region/{region_name}")
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == region_name
    assert "securite" in data
    assert "culture" in data
    assert "animation" in data
    assert "environnement" in data
    assert "vie-pratique" in data


def test_ville_not_found():
    ville_name = "VilleInexistante"
    response = client.get(f"/ville/{ville_name}")
    assert response.status_code == 404

def test_departement_not_found():
    departement_name = "DepartementInexistant"
    response = client.get(f"/departement/{departement_name}")
    assert response.status_code == 404

def test_region_not_found():
    region_name = "RegionInexistante"
    response = client.get(f"/region/{region_name}")
    assert response.status_code == 404

if __name__ == "__main__":
    pytest.main(["-v"])