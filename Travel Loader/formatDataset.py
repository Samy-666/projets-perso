import csv

def parseTimeTable():
    with open('timetables.csv', 'r') as infile, open('timetables.formatted.csv', 'w', newline='') as outfile:
        csvreader = csv.reader(infile, delimiter='\t')
        csvwriter = csv.writer(outfile, delimiter=',')

        headers = next(csvreader)
        csvwriter.writerow([headers[0], "departure", "destination", headers[2]])

        for row in csvreader:
            trajet = row[1].split(" - ")

            if not trajet[0].startswith("Gare de"):
                trajet[0] = "Gare de " + trajet[0]
            if not trajet[1].startswith("Gare de"):
                trajet[1] = "Gare de " + trajet[1]

            departure = trajet[0].split("Gare de ")[1]
            destination = trajet[1].split("Gare de ")[1]

            formatted_row = [row[0], departure, destination, row[2]]
            csvwriter.writerow(formatted_row)

parseTimeTable()
