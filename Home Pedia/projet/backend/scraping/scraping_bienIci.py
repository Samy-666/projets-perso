from bs4 import BeautifulSoup as bs
from selenium import webdriver
import re

scrapped_pages = 1000

# Instancier le pilote WebDriver
driver = webdriver.Chrome()

for i in range(1, scrapped_pages+1):
    try:
        # Utiliser la variable 'i' pour parcourir les pages
        driver.get("https://www.bienici.com/recherche/achat/france/maisonvilla,appartement,loft,batiment,chateau?page="+str(i)+"&camera=8_-1.6237161_47.7767131_0.9_0")
        
        # Obtenir le contenu HTML de la page
        html = driver.page_source
        
        # Analyser le contenu HTML avec BeautifulSoup
        soup = bs(html, "html.parser")
        
        # Trouver le conteneur des résultats
        resultContainer = soup.find("div", class_="resultsListContainer")
        
        # Récupérer tous les articles
        articles = resultContainer.find_all("article")
        
        for article in articles:
            # Récupérer les informations de chaque article
            article_info = article.find("div", class_="ad-overview-details ad-overview-details--small")
            price = article_info.find("span", class_="ad-price__the-price").text.replace(" ", "").replace("€", "").replace(",", ".")
            carctere_k = price.find("k")
            if carctere_k != -1:
                price = price.replace("k", "")
                price = float(price)
                price = price * 1000
                if (price.is_integer()):
                    price = int(price)
                price = str(price)
            price = re.sub(r'\s+', '', price)
            price_m2 = article_info.find("span", class_="ad-price__price-per-square-meter").text.replace(" ", "").replace("€/m²", "")
            carctere_k = price_m2.find("k")
            if carctere_k != -1:
                price_m2 = price_m2.replace("k", "")
                price_m2 = float(price_m2)
                price_m2 = price_m2 * 1000
                if (price_m2.is_integer()):
                    price_m2 = int(price_m2)
                price_m2 = str(price_m2)
            price_m2 = re.sub(r'\s+', '', price_m2)
            details = article_info.find("span", class_="ad-overview-details__ad-title ad-overview-details__ad-title--small").text
            type_bien = details.split()[0]
            type_bien = re.sub(r'\s+', '', type_bien)
            adress = article_info.find("span", class_="ad-overview-details__address-title ad-overview-details__address-title--small").text
            code_postal = adress.split()[0]
            code_postal = re.sub(r'\s+', '', code_postal)
            ville = adress.split()[1]
            nb_pieces = details.split()[1] + " " + details.split()[2].replace(" ", "").replace("pièces", "").replace("pièce", "").replace("s", "")
            nb_pieces = re.sub(r'\s+', '', nb_pieces)
            surface = details.split()[-2] + " " + details.split()[-1].replace("m²", "").replace(" ", "")
            surface = re.sub(r'\s+', '', surface)
            
            # Enregistrement dans un fichier CSV
            with open("bienici.csv", "a", encoding="utf-8") as f:
                f.write(f"{price};{price_m2};{type_bien};{nb_pieces};{surface};{code_postal};{ville}\n")
            # Ajouter une entete au fichier CSV
            with open("bienici.csv", "r", encoding="utf-8") as f:
                lines = f.readlines()
                lines[0] = "prix;prix_m2;type_bien;nb_pieces;surface;code_postal;ville\n"
            with open("bienici.csv", "w", encoding="utf-8") as f:
                f.writelines(lines)


            
    except Exception as e:
        print(e)

# Fermer le pilote WebDriver
driver.quit()
