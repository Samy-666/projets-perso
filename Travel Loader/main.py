import spacy;
from google.cloud import speech
from google.api_core.exceptions import GoogleAPIError
import sounddevice as sd
from scipy.io.wavfile import write
from pathfinder import show_graph
from voice_to_text import get_ittinirary_from_voice

# Loading our trained_model

nlp = spacy.load("custom_trained_model")

doc = nlp(get_ittinirary_from_voice())

# Extract entities (locations) and their labels
trip_information = {"start": None, "end": None, "stops": []}

for ent in doc.ents:
    if ent.label_ == "LOC":
        if trip_information["start"] is None:
            trip_information["start"] = ent.text
        elif trip_information["end"] is None:
            trip_information["end"] = ent.text
        else:
            trip_information["stops"].append(ent.text)

# Print the extracted information
print("Start:", trip_information["start"])
print("End:", trip_information["end"])
print("Stops:", trip_information["stops"])

if trip_information["start"] is None:
    print("Désolé, nous n'avons pas compris votre ville de départ. Veuillez redire votre itinéraire en prenant soin de bien articuler les noms des villes.")
elif trip_information["end"] is None:
    print("Désolé, nous n'avons pas compris votre ville d'arrivée. Veuillez redire votre itinéraire en prenant soin de bien articuler les noms des villes.")
else:
    show_graph(trip_information["start"], trip_information["end"], trip_information["stops"])

