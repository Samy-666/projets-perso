import spacy

# Load the spaCy model for French
nlp = spacy.load("pretrained_model")

# Text describing the journey
text = "Je pars de Montpellier et je fais escale à Marseille avant d'arriver à Toulon."

# Process the text with spaCy
doc = nlp(text)

# Extract entities (locations) and their labels
trip_information = {"start": None, "end": None, "stops": []}

for ent in doc.ents:
    if ent.label_ == "LOC":
        # Assuming LOC (location) is the label for locations
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
