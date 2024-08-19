from bs4 import BeautifulSoup as bs
import requests

url="https://www.ville-ideale.fr/villespardepts.php"
HEADERS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"}
response = requests.get(url, headers=HEADERS)
if(response.status_code == 200):
    html = response.text
    soup = bs(html, "html5lib")
    

    #Nom des villes 
    div_villes = soup.find("div", id="colleft")
    e_ville = div_villes.find_all("a")
    numero_ville = []
    nom_ville = []
    for ville in e_ville:
        villeText = ville.text
else:
    print("Requête refusée", response.status_code)
