import networkx as nx
import pandas as pd
import requests

def get_city_coordinates(city):
    base_url = "https://nominatim.openstreetmap.org/search"
    params = {
        "q": city,
        "format": "json",
    }
    response = requests.get(base_url, params=params)
    if response.status_code == 200:
        data = response.json()
        if data:
            # Assuming the first result is the desired location
            lat = float(data[0]["lat"])
            lon = float(data[0]["lon"])
            return lat, lon
    return None


def create_graph(csv_file, start, end, stops):
    df = pd.read_csv(csv_file, sep=";")
    df["Relations"] = df["Relations"].str.title()

    G = nx.Graph()

    times = {}
    for _, row in df.iterrows():
        city1, city2 = row["Relations"].split(" - ")
        year = row["Année"]
        if (city1, city2) not in times or int(times[(city1, city2)][0]) < int(year):
            times[(city1, city2)] = (year, row["Temps estimé en minutes"])
        if (city2, city1) not in times or int(times[(city2, city1)][0]) < int(year):
            times[(city2, city1)] = (year, row["Temps estimé en minutes"])

    for city in [start] + stops + [end]:
        G.add_node(city)

    edge_length = 1.0  # Specify the desired length for all edges

    if stops:
        for i in range(len(stops) + 1):
            if i == 0:
                start_city = start
                end_city = stops[0]
            elif i == len(stops):
                start_city = stops[-1]
                end_city = end
            else:
                start_city = stops[i-1]
                end_city = stops[i]
            
            if (start_city, end_city) in times:
                weight = times[(start_city, end_city)][1]
                # Check for NaN before converting to int
                weight = int(weight) if not pd.isna(weight) else 0
                G.add_edge(start_city, end_city, weight=weight, length=edge_length)
            else:
                G.add_edge(start_city, end_city, weight=0, length=edge_length)
    else:
        if (start, end) in times:
            weight = times[(start, end)][1]
            # Check for NaN before converting to int
            weight = int(weight) if not pd.isna(weight) else 0
            G.add_edge(start, end, weight=weight, length=edge_length)
        else:
            G.add_edge(start, end, weight=0, length=edge_length)

    # Add coordinates as node attributes
    city_coordinates = {city: get_city_coordinates(city) for city in G.nodes()}

    # Add coordinates to the graph nodes
    for city, coords in city_coordinates.items():
        G.nodes[city]['coords'] = coords

    return G
