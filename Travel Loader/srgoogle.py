import speech_recognition as sr

# Initialiser le recogniser
r = sr.Recognizer()

with sr.Microphone() as source:
    print("Parlez maintenant : ")
    audio = r.listen(source)

try:
    # Utiliser Google Speech Recognition
    text = r.recognize_google(audio, language="fr-FR")
    print("capted results  : " + text)
except sr.UnknownValueError:
    print("Google Speech Recognition n'a pas pu comprendre l'audio")
except sr.RequestError as e:
    print(f"Impossible d'obtenir les résultats depuis Google Speech Recognition; {e}")
