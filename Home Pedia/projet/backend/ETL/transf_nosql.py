import pandas as pd
from pymongo import MongoClient
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, round, avg, first, to_date, year, month, percentile_approx, count, regexp_replace, when, isnan, isnull
import os

# Initialiser une session Spark
spark = SparkSession.builder \
    .appName("ProjetImmobilierLocal") \
    .getOrCreate()

<<<<<<< HEAD:backend/ETL/transf_nosql.py
# Spécifier le chemin du dossier contenant les fichiers CSV
folder_path = "D:/school_prj_c/sem10/data/data_gouv"

# Obtenir la liste de tous les fichiers CSV dans le dossier
csv_files = [f for f in os.listdir(folder_path) if f.endswith('.csv')]

# Initialiser le DataFrame combiné
combined_df = None

# Lire chaque fichier CSV et l'ajouter au DataFrame combiné
for file in csv_files:
    file_path = os.path.join(folder_path, file)
    df = spark.read.option("header", "true").option("delimiter", "|").csv(file_path)
    
    if combined_df is None:
        combined_df = df
    else:
        combined_df = combined_df.union(df)
    
    print(f"Après l'ajout de {file}: {combined_df.count()} lignes")

# Afficher le nombre total de lignes dans le DataFrame combiné
if combined_df:
    print(f"Nombre total final de lignes : {combined_df.count()}")
else:
    print("Aucun fichier CSV trouvé dans le dossier spécifié.")

# Vérification après chargement des données
print(f"Total de lignes après chargement initial : {combined_df.count()}")
=======
# Lire les fichiers CSV dans un DataFrame
file_path = "E:/Epitech/MSC Pro 2/Projet Data 2/T-DAT-902-PAR_22/backend/data/data_gouv/valeursfoncieres-2023.csv"
df = spark.read.option("header", "true").option("delimiter", "|").csv(file_path)
>>>>>>> 907cc03c2882f5115fb22535b4d5d151ad3aeb52:backend/ETL/spark_transf.py

# Renommer les colonnes pour enlever les espaces
for column in combined_df.columns:
    combined_df = combined_df.withColumnRenamed(column, column.replace(' ', '_'))

# Vérification après renommage des colonnes
print(f"Total de lignes après renommage des colonnes : {combined_df.count()}")

# Assurer que la colonne 'Date_mutation' est au format date
df_final = combined_df.withColumn("Date_mutation", to_date(col("Date_mutation"), 'dd/MM/yyyy'))

# Vérification après conversion des dates
print(f"Total de lignes après conversion des dates : {df_final.count()}")

# Supprimer les lignes où des informations essentielles sont manquantes
df_final = df_final.dropna(subset=['Date_mutation', 'Commune', 'Type_local'])

# Vérification après suppression des lignes avec informations essentielles manquantes
print(f"Total de lignes après suppression des lignes manquantes essentielles : {df_final.count()}")

# Assurer que les colonnes ont les bons types de données et gérer les valeurs problématiques
columns_to_convert = ["Valeur_fonciere", "Surface_reelle_bati", "Surface_terrain"]
for column in columns_to_convert:
    df_final = df_final.withColumn(column, 
                       when((col(column).isNull()) | (col(column) == "") | (col(column) == "None"), None)
                       .otherwise(regexp_replace(col(column), ",", ".").cast("double")))
    # Remplacer les valeurs infinies ou NaN par None
    df_final = df_final.withColumn(column, 
                       when(isnan(col(column)) | isnull(col(column)), None)
                       .otherwise(col(column)))

df_final = df_final.withColumn("Nombre_pieces_principales", 
                   when((col("Nombre_pieces_principales").isNull()) | (col("Nombre_pieces_principales") == "") | (col("Nombre_pieces_principales") == "None"), None)
                   .otherwise(col("Nombre_pieces_principales").cast("int")))

# Vérification après conversion des types de données
print(f"Total de lignes après conversion des types de données : {df_final.count()}")

# Filtrer les lignes où la Surface reelle bati est non nulle et supérieure à 0
df_final = df_final.filter(col("Surface_reelle_bati").isNotNull() & (col("Surface_reelle_bati") > 0))

# Vérification après filtrage des surfaces
print(f"Total de lignes après filtrage des surfaces réelles bâties : {df_final.count()}")

# Calculer le prix au mètre carré, en gérant les divisions par zéro
df_final = df_final.withColumn("Prix_m2", 
                   when(col("Surface_reelle_bati") > 0, round(col("Valeur_fonciere") / col("Surface_reelle_bati"), 2))
                   .otherwise(None))

# Ajouter les colonnes mois et année
df_final = df_final.withColumn("Annee", year(col("Date_mutation")))
df_final = df_final.withColumn("Mois", month(col("Date_mutation")))

# Vérification après ajout des colonnes mois et année
print(f"Total de lignes après ajout des colonnes mois et année : {df_final.count()}")

# Agrégation principale
df_with_avg = df_final.groupBy("Type_local", "Commune").agg(
    round(avg("Prix_m2"), 2).alias("Prix_moyen_m2_commune"),
    round(avg("Valeur_fonciere"), 2).alias("Valeur_fonciere_moyenne"),
    round(avg("Surface_reelle_bati"), 2).alias("Surface_reelle_bati_moyenne"),
    round(avg("Surface_terrain"), 2).alias("Surface_terrain_moyenne"),
    percentile_approx("Prix_m2", 0.5).alias("Prix_median_m2"),
    percentile_approx("Valeur_fonciere", 0.25).alias("Valeur_fonciere_25e_percentile"),
    percentile_approx("Valeur_fonciere", 0.75).alias("Valeur_fonciere_75e_percentile"),
    count("Valeur_fonciere").alias("Nombre_transactions"),
    first("Valeur_fonciere").alias("Valeur_fanciere"),
    first("Date_mutation").alias("Date_mutation"),
    first("Nature_mutation").alias("Nature_mutation"),
    first("Code_postal").alias("Code_postal"),
    first("Surface_reelle_bati").alias("Surface_reelle_bati"),
    first("Nombre_pieces_principales").alias("Nombre_pieces_principales"),
    first("Surface_terrain").alias("Surface_terrain"),
    first("Prix_m2").alias("Prix_m2")
)

# Vérification après agrégation
print(f"Total de lignes après agrégation : {df_with_avg.count()}")

# Sélectionner et réorganiser les colonnes finales
df_f = df_with_avg.select(
    "Type_local", "Commune", "Prix_moyen_m2_commune", "Valeur_fonciere_moyenne",
    "Surface_reelle_bati_moyenne", "Surface_terrain_moyenne", "Prix_median_m2",
    "Valeur_fonciere_25e_percentile", "Valeur_fonciere_75e_percentile",
    "Nombre_transactions", "Date_mutation", "Nature_mutation", "Code_postal",
    "Surface_reelle_bati", "Nombre_pieces_principales", "Surface_terrain", "Prix_m2"
)

# Vérification après sélection et réorganisation des colonnes
print(f"Total de lignes après sélection et réorganisation des colonnes : {df_f.count()}")

# Convertir le DataFrame Spark en DataFrame Pandas
pandas_df = df_f.toPandas()

# Vérification après conversion en DataFrame Pandas
print(f"Total de lignes après conversion en DataFrame Pandas : {len(pandas_df)}")

# Convertir les dates en format string pour éviter les problèmes de sérialisation
pandas_df['Date_mutation'] = pandas_df['Date_mutation'].astype(str)

# Convertir les valeurs NaN en None pour MongoDB
pandas_df = pandas_df.where(pd.notnull(pandas_df), None)

# Convertir le DataFrame Pandas en liste de dictionnaires
data_to_insert = pandas_df.to_dict('records')

# Vérification après conversion en liste de dictionnaires
print(f"Total de lignes après conversion en liste de dictionnaires : {len(data_to_insert)}")

"""
# Connexion à MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['immobilier']
collection = db['transformed_data']

# Insérer les données dans MongoDB
collection.insert_many(data_to_insert)

print("Données insérées avec succès dans MongoDB")
"""

# Arrêter la session Spark
spark.stop()
