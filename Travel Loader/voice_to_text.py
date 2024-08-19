import os
import spacy;
from google.cloud import speech
from google.api_core.exceptions import GoogleAPIError
import sounddevice as sd
from scipy.io.wavfile import write


# NER = spacy.load('fr_core_news_sm');

def get_unique_filename(base_filename):
    """Function to generate a unique filename"""
    count = 1
    while True:
        new_filename = f"{os.path.splitext(base_filename)[0]}_{count}.wav"
        if not os.path.exists(new_filename):
            return new_filename
        count += 1

def get_ittinirary_from_voice():
    try:
        # Create a Google Speech client
        client = speech.SpeechClient.from_service_account_file('application_default_credentials.json')

        print("Veuillez dire votre itinéraire ...")

        duration = 10;

        # Record audio
        audio_sound = sd.rec(int(duration * 44100), samplerate=44100, channels=1)
        sd.wait()

        audio_file_prompt = 'audio_prompt.mp3'

        if os.path.exists(audio_file_prompt):
        	new_audio_file_prompt = get_unique_filename(audio_file_prompt)
        	audio_file_prompt = new_audio_file_prompt

        # Save the recorded audio to a file using scipy
        write(audio_file_prompt, 44100, audio_sound.flatten())

        print('Audio saved. Processing input ...')

        # audio_path = 'audio.mp3'
        
        # Read the audio file as bytes
        with open(audio_file_prompt, 'rb') as audio_file:
        	audio_data = audio_file.read()

        # Configuration for the audio input
        audio = speech.RecognitionAudio(content=audio_data)
        config = speech.RecognitionConfig(
        	# encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,  # Replace with your audio encoding
        	encoding=speech.RecognitionConfig.AudioEncoding.MP3,
        	sample_rate_hertz=44100,  # Replace with your audio sample rate
        	language_code='fr-FR'  # Replace with the language code of the audio
        )

        # Perform the speech recognition
        response = client.recognize(config=config, audio=audio)

        # Process the transcription results
        for result in response.results:
            for alternative in result.alternatives:
            	itinerary_text = alternative.transcript

        return itinerary_text

    except GoogleAPIError as e:
        return e



    