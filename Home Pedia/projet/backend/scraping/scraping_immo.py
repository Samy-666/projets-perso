import requests
import time
from bs4 import BeautifulSoup
from requests.exceptions import RequestException
import re
import json
import sqlite3

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
}

def parse_ville_nom_code(nom_ville):
    match = re.match(r'(.+?)\s*\((\w+)\)', nom_ville)
    if match:
        return match.group(1).strip(), match.group(2).strip()
    else:
        return nom_ville.strip(), None

def transform_ville_names(name):
    name = name.lower()
    name = name.replace("'", "")
    name = name.replace("î", "i")
    name = name.replace("ô", "o")
    name = name.replace("ê", "e").replace("é", "e").replace("è", "e")
    name = name.replace(" ", "-")
    return name

def getRegions(regionContainer):
    regions = []
    optgroup = regionContainer.find('optgroup', {'label': 'Régions'})
    if optgroup:
        for option in optgroup.find_all('option'):
            regions.append(transform_ville_names(option.text))
    else:
        print("L'élément 'optgroup' avec le label 'Régions' n'a pas été trouvé à l'intérieur de la 'div' avec la classe 'select'.")
    return regions

def getDepartements(deparementsContainer):
    departements = []
    optgroup = deparementsContainer.find('optgroup', {'label': 'Départements'})
    if optgroup:
        for option in optgroup.find_all('option'):
            departements.append(transform_ville_names(option.text))
    else:
        print("L'élément 'optgroup' avec le label 'Départements' n'a pas été trouvé à l'intérieur de la 'div' avec la classe 'select'.")
    return departements

def getVilleList(maxPage):
    data = []
    for pageNumber in range(1, maxPage + 1):
        retry_count = 0
        max_retries = 5
        success = False
        while retry_count < max_retries and not success:
            try:
                dataUrl = f"https://www.bien-dans-ma-ville.fr/classement-ville/?page={pageNumber}"
                response = requests.get(dataUrl, headers=headers)
                if response.status_code == 200:
                    soup = BeautifulSoup(response.content, 'html.parser')
                    table = soup.find('table', class_='ville')
                    if table:
                        rows = table.find_all('tr')
                        for row in rows:
                            cells = row.find_all('td')
                            if len(cells) == 3:
                                nom_ville, code_ville = parse_ville_nom_code(cells[1].text.strip())
                                row_data = {
                                    'id': cells[0].text.strip(),
                                    'nom_ville': transform_ville_names(nom_ville),
                                    'code_ville': code_ville,
                                }
                                data.append(row_data)
                    else:
                        print(f'Erreur: La table n\'a pas été trouvée sur la page {pageNumber}')
                    success = True
                    time.sleep(0.5)
                else:
                    print(f'Erreur: Échec de la requête pour la page {pageNumber}')
                    retry_count += 1 
                    time.sleep(2 ** retry_count)  # Exponential backoff
            except RequestException as e:
                print(f'Erreur: {e}')
                retry_count += 1
                time.sleep(2 ** retry_count)  # Exponential backoff
    return data

def getDataPerDepartementOrRegion(field, whichOne):
    data = []
    retry_count = 0
    max_retries = 5
    success = False
    while retry_count < max_retries and not success:
        try:
            dataUrl = f"https://www.bien-dans-ma-ville.fr/classement-{whichOne}/{field}.html"
            response = requests.get(dataUrl, headers=headers)
            if response.status_code == 200:
                soup = BeautifulSoup(response.content, 'html.parser')
                table = soup.find('table')
                if table:
                    rows = table.find_all('tr')
                    for row in rows:
                        cells = row.find_all('td')
                        if len(cells) == 3:
                            nom_ville, code_ville = parse_ville_nom_code(cells[1].text.strip())
                            row_data = {
                                'id': cells[0].text.strip(),
                                whichOne: transform_ville_names(nom_ville),
                                'code': code_ville,
                                field: cells[2].text.strip()
                            }
                            data.append(row_data)
                else:
                    print(f'Erreur: La table n\'a pas été trouvée sur la page {dataUrl}')
                success = True
                time.sleep(0.5)
            else:
                print(f'Erreur: Échec de la requête pour la page {dataUrl}')
                retry_count += 1
                time.sleep(2 ** retry_count)  # Exponential backoff
        except RequestException as e:
            print(f'Erreur: {e}')
            retry_count += 1
            time.sleep(2 ** retry_count)  # Exponential backoff
    return data

def getDataPerVille(field, maxPage):
    results = []
    for pageNumber in range(1, maxPage + 1):
        retry_count = 0
        max_retries = 5
        success = False
        while retry_count < max_retries and not success:
            try:
                dataUrl = f"https://www.bien-dans-ma-ville.fr/classement-ville-{field}/?page={pageNumber}"
                response = requests.get(dataUrl, headers=headers)
                if response.status_code == 200:
                    soup = BeautifulSoup(response.content, 'html.parser')
                    
                    # Pour déboguer, imprimez le contenu de la page
                    print(f'Page {pageNumber} pour le champ {field}:')
                    table = soup.find('table')
                    if table:
                        rows = table.find_all('tr')
                        for row in rows:
                            cells = row.find_all('td')
                            if len(cells) == 3:
                                nom_ville, code_ville = parse_ville_nom_code(cells[1].text.strip())
                                row_data = {
                                    'id': cells[0].text.strip(),
                                    'ville': transform_ville_names(nom_ville),
                                    'code': code_ville,
                                    field: cells[2].text
                                }
                                results.append(row_data)
                    else:
                        print(f'Erreur: La table n\'a pas été trouvée sur la page {pageNumber}')
                    success = True
                    time.sleep(0.5)
                else:
                    print(f'Erreur: Échec de la requête pour la page {pageNumber}')
                    retry_count += 1
                    time.sleep(2 ** retry_count)  # Exponential backoff
            except RequestException as e:
                print(f'Erreur: {e}')
                retry_count += 1
                time.sleep(2 ** retry_count)  # Exponential backoff
    if results:
        return results  # Retourne les données si des résultats sont disponibles
    else:
        print(f'Avertissement: Aucune donnée trouvée pour le champ {field} dans getDataPerVille.')
        return []  # Retourne une liste vide si aucune donnée n'a été trouvée

def main():
    ratingFields = ['securite', 'culture', 'animation', 'environnement', 'vie-pratique']
    statFields = ['nb-habitant', 'superficie', 'densite', 'population-active', 'taux-chomage', 'revenu-moyen', 'prix-m2', 'age-population']
    pageMax = 20
    all_data = {
        'villes': [],
        'departements': [],
        'regions': [],
        'data': {
            'parville': [],
            'pardepartement': [],
            'parregion': []
        }
    }

    try:
        websiteLink = "https://www.bien-dans-ma-ville.fr/classement-ville/"
        response = requests.get(websiteLink, headers=headers)
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')
            selectDiv = soup.find('div', class_='select')
            if selectDiv:
                regions = getRegions(selectDiv)
                departements = getDepartements(selectDiv)
                villes = getVilleList(pageMax)
                
                all_data['villes'] = villes
                all_data['departements'] = departements
                all_data['regions'] = regions

                # Initialisation du dictionnaire pour stocker les données par ville
                ville_data_dict = {}

                # Collecter les données pour chaque champ pour chaque ville
                for field in ratingFields + statFields:
                    villes_data = getDataPerVille(field, pageMax)
                    for ville in villes_data:
                        ville_nom = ville['ville']
                        if ville_nom not in ville_data_dict:
                            ville_data_dict[ville_nom] = {'ville': ville_nom}
                        ville_data_dict[ville_nom][field] = ville.get(field)

                # Ajouter les données collectées dans all_data['data']['parville']
                for ville_nom, data in ville_data_dict.items():
                    all_data['data']['parville'].append(data)

                for field in ratingFields + statFields:
                    departements_data = getDataPerDepartementOrRegion(field, "departement")
                    for departement in departements_data:
                        existing_departement = next((item for item in all_data['data']['pardepartement'] if item['departement'] == departement['departement']), None)
                        if existing_departement:
                            existing_departement[field] = departement[field]
                        else:
                            all_data['data']['pardepartement'].append({
                                'departement': departement['departement'],
                                'securite': departement.get('securite', None),
                                'culture': departement.get('culture', None),
                                'animation': departement.get('animation', None),
                                'environnement': departement.get('environnement', None),
                                'vie-pratique': departement.get('vie-pratique', None),
                                'nb-habitant': departement.get('nb-habitant', None),
                                'superficie': departement.get('superficie', None),
                                'densite': departement.get('densite', None),
                                'population-active': departement.get('population-active', None),
                                'taux-chomage': departement.get('taux-chomage', None),
                                'revenu-moyen': departement.get('revenu-moyen', None),
                                'prix-m2': departement.get('prix-m2', None),
                                'age-population': departement.get('age-population', None)
                            })

                    regions_data = getDataPerDepartementOrRegion(field, "region")
                    for region in regions_data:
                        existing_region = next((item for item in all_data['data']['parregion'] if item['region'] == region['region']), None)
                        if existing_region:
                            existing_region[field] = region[field]
                        else:
                            all_data['data']['parregion'].append({
                                'region': region['region'],
                                'securite': region.get('securite', None),
                                'culture': region.get('culture', None),
                                'animation': region.get('animation', None),
                                'environnement': region.get('environnement', None),
                                'vie-pratique': region.get('vie-pratique', None),
                                'nb-habitant': region.get('nb-habitant', None),
                                'superficie': region.get('superficie', None),
                                'densite': region.get('densite', None),
                                'population-active': region.get('population-active', None),
                                'taux-chomage': region.get('taux-chomage', None),
                                'revenu-moyen': region.get('revenu-moyen', None),
                                'prix-m2': region.get('prix-m2', None),
                                'age-population': region.get('age-population', None)
                            })

                with open('all_data.json', 'w', encoding='utf-8') as json_file:
                    json.dump(all_data, json_file, ensure_ascii=False, indent=4)

                all_data = json.load(open('all_data.json', 'r', encoding='utf-8'))
                conn = sqlite3.connect('data_epiville.db')
                # create_tables(conn)

                try:
                    # insert_data(conn, all_data)
                    conn.close()
                except Exception as e:
                    print(f'Erreur: {e}')
            else:
                print("Avertissement: La div avec la classe 'select' n'a pas été trouvée sur la page web.")
        else:
            print(f"Erreur: Échec de la requête vers {websiteLink}. Statut de la réponse: {response.status_code}")
    except RequestException as e:
        print(f'Erreur de requête: {e}')

if __name__ == "__main__":
    main()