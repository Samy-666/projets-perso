import csv
import spacy
from spacy.training.example import Example
import matplotlib.pyplot as plt

# Load the pre-trained spaCy model for French
nlp = spacy.load("fr_core_news_sm")

# Function to read the CSV file and extract the training data
def read_csv(file_path):
    training_data = []
    with open(file_path, "r", newline="", encoding="utf-8") as file:
        reader = csv.DictReader(file)
        for row in reader:
            text = row['sentence']
            start_index = eval(row['start_index'])  # Convert string representation of tuple to tuple
            stop_index = eval(row['stop_index'])  # Convert string representation of tuple to tuple
            annotations = {"entities": [(start_index[0], start_index[1], "START"), 
                                        (stop_index[0], stop_index[1], "STOP")]}
            training_data.append((text, annotations))
    return training_data

# Path to your CSV file
# csv_file_path = "training_data.csv"

training_data_files = ["training_data_1.csv", "training_data_2.csv", "training_data_3.csv"]

# Lists to store accuracy and loss values
accuracy_values = []
loss_values = []

for csv_file_path in training_data_files:
    # Read the CSV file and extract the training data
    additional_train_data = read_csv(csv_file_path)

    # Convert the additional training data to spaCy Example objects
    additional_examples = [Example.from_dict(nlp.make_doc(text), annotations) for text, annotations in additional_train_data]

    # Train the model with the additional training data
    losses = {}
    nlp.update(additional_examples, losses=losses)

    # Calculate accuracy and loss
    accuracy = 1.0 - losses.get('ents_f', 0.0)
    loss = losses.get('ents_loss', 0.0)

    # Append accuracy and loss values to the lists
    accuracy_values.append(accuracy)
    loss_values.append(loss)

# Plotting the graph
epochs = range(1, len(training_data_files) + 1)
plt.plot(epochs, accuracy_values, label='Accuracy')
plt.plot(epochs, loss_values, label='Loss')
plt.xlabel('Epochs')
plt.ylabel('Value')
plt.title('Model Training Metrics')
plt.legend()
plt.show()

# Save the updated model
nlp.to_disk("custom_trained_model")

print('Model successfully trained!')

