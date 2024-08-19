import networkx as nx
import matplotlib.pyplot as plt
import math
from graph_using_sncf_data import create_graph

def show_graph(start, end, stops):
    csv_file = "meilleurs-temps-des-parcours-des-trains-sncf.csv"
    graph = create_graph(csv_file, start, end, stops)

    # Defining the heuristic function for A* algorithm
    def heuristic_function(u, v):
        u_coords = graph.nodes[u]['coords']
        v_coords = graph.nodes[v]['coords']
        return math.sqrt((u_coords[0] - v_coords[0])**2 + (u_coords[1] - v_coords[1])**2)

    # Finding shortest path from start to each stop using NetworkX's A* algorithm
    shortest_paths = {}
    for stop in stops:
        shortest_paths[stop] = nx.astar_path(graph, start, stop, heuristic=heuristic_function)

    # Visualization of the graph
    pos = {city: coords for city, coords in nx.get_node_attributes(graph, 'coords').items()}

    # Defining node colors
    node_colors = ['green' if node == start else 'lightblue' if node in stops else 'orange' for node in graph.nodes()]
    nx.draw(graph, pos, with_labels=False, node_size=3000, node_color=node_colors)

    # Drawing shortest paths
    for stop, shortest_path in shortest_paths.items():
        nx.draw_networkx_edges(graph, pos, edgelist=[(shortest_path[i], shortest_path[i+1]) for i in range(len(shortest_path)-1)], edge_color='red', width=2)

    # Adding labels for start, stops, and end of the journey
    labels = {start: f"{start}\n(Start)", end: f"{end}\n(End)"}
    for i, stop in enumerate(stops, start=1):
        labels[stop] = f"{stop}\n(Stop {i})"
    nx.draw_networkx_labels(graph, pos, labels=labels, font_size=8, font_weight='bold')

    # Adding edge labels for distances
    edge_labels = {(u, v): graph[u][v]['weight'] for u, v in graph.edges()}
    nx.draw_networkx_edge_labels(graph, pos, edge_labels=edge_labels, font_size=10)

    plt.title("Votre Route")
    plt.show()


