import json
import requests
import smtplib
import secrets
from email.message import EmailMessage
from flask_cors import CORS
from flask import Flask, request, redirect, jsonify, make_response, session
from google.oauth2 import service_account
from googleapiclient.discovery import build

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://127.0.0.1:5173"]}})

# Load the JSON file containing the API key
with open('credentials.json') as f:
    credentials_json = json.load(f)

# Extract the API key from the JSON dataenv\Scripts\activate.bat 
api_key = credentials_json['private_key']

# create a Spotify API client
app.secret_key = secrets.token_hex(16)
spotify_client_id = '603239cd09774551bf57056a8130a1dd'
spotify_client_secret = 'f57e597161b9439c8903d050998997f2'
spotify_redirect_uri = 'http://127.0.0.1:5000/callback'
playlist_id = '1qrNNhke5i6Gyed93DwLzv'


# load the Service Account credentials from a JSON file
credentials = service_account.Credentials.from_service_account_file(
    "credentials.json",
    scopes=["https://www.googleapis.com/auth/spreadsheets"],
)

# create a Google Sheets API client
service = build("sheets", "v4", credentials=credentials)

# define a Flask route that stores data in a Google Sheet


@app.route("/store_data", methods=["POST"])
def store_data():
    # specify the Google Sheet ID and range to write to
    sheet_id = "1_liLZifZfL7_mOkWW1dVGdQ-PmrEk4VuGiNYdW_xAEM"
    range_name = "Database!A2:C"

    # get the data from the request body as a JSON object
    data = request.get_json()

    # call the Google Sheets API to get the existing data in the sheet
    result = service.spreadsheets().values().get(
        spreadsheetId=sheet_id,
        range=range_name,
    ).execute()

    # check for duplicate email addresses in the existing data and append new rows for unique email addresses
    existing_data = result.get("values", [])
    for row in existing_data:
        email = row[0]
        if email == data["email"]:
            return jsonify({"status": False})

    # create a list of rows to append to the sheet
    new_row = [data["email"], data["name"], data["created_at"]]
    rows = [new_row]

    # find the last row in the sheet and append the new data to it
    write_result = service.spreadsheets().values().append(
        spreadsheetId=sheet_id,
        range=range_name,
        valueInputOption="USER_ENTERED",
        insertDataOption="INSERT_ROWS",
        body={"values": rows},
    ).execute()

    # return a response indicating success or failure
    if len(write_result["updates"]) > 0:
        return jsonify({"status": True})
    else:
        return jsonify({"status": False}), 404


@app.route('/check_user', methods=['POST'])
def check_user():
    # Get the JSON data from the request body
    data = request.get_json()

    # Extract the email and password from the JSON data
    sent_email = data["email"]

    # Call the Google Sheets API to get the data for the specified email
    sheet_id = '1_liLZifZfL7_mOkWW1dVGdQ-PmrEk4VuGiNYdW_xAEM'
    range_name = 'Database!A2:C'
    result = service.spreadsheets().values().get(
        spreadsheetId=sheet_id,
        range=range_name,
        valueRenderOption='FORMATTED_VALUE',
        dateTimeRenderOption='FORMATTED_STRING',
        majorDimension='ROWS',
    ).execute()

    # Check if the email exists in the sheet
    existing_data = result.get('values', [])
    if len(existing_data) == 0:
        return jsonify({"status": False}), 404

    # Check if the email is correct
    is_found = False
    for item in existing_data:
        email = item[0]
        if email == sent_email:
            is_found = True
    if is_found is True:
        return jsonify({"status": True})
    else:
        return jsonify({"status": False}), 404

# Path to authenticate with Spotify API
@app.route('/spotify_login')
def login():
    # Redirect the user to the Spotify login page
    auth_url = 'https://accounts.spotify.com/authorize'
    params = {
        'client_id': spotify_client_id,
        'response_type': 'code',
        'redirect_uri': spotify_redirect_uri,
        'scope': 'user-read-email playlist-read-private'
    }
    auth_request = requests.Request('GET', auth_url, params=params).prepare()
    return redirect(auth_request.url)

@app.route('/callback')
def callback():
    # Exchange the authorization code for an access token
    code = request.args.get('code')
    token_url = 'https://accounts.spotify.com/api/token'
    data = {
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': spotify_redirect_uri,
        'client_id': spotify_client_id,
        'client_secret': spotify_client_secret
    }
    token_response = requests.post(token_url, data=data)
    token_data = token_response.json()

    # Store the access token in a cookie
    access_token = token_data['access_token']
    cookie_expiration = 60 * 60 * 24  # 1 day
    response = make_response(redirect('/playlist'))
    response.set_cookie('access_token', access_token, max_age=cookie_expiration)

    return response

@app.route('/playlist')
def playlist():
    # Check if the playlist data is already stored in a cookie
    playlist_cookie = request.cookies.get('playlist')
    if playlist_cookie:
        # Delete the playlist cookie
        response = make_response('Redirecting...')
        response.delete_cookie('playlist')
        # Redirect the user to the page with the playlist data in the cookie
        redirect_script = '<script>setTimeout(function() { window.location.href = "http://127.0.0.1:5173"; }, 3000);</script>'
        response.data += redirect_script.encode('utf-8')
        response.headers['Access-Control-Allow-Origin'] = 'http://127.0.0.1:5173'
        return response

    # Retrieve information about the specific playlist using the playlist ID
    playlist_url = f'https://api.spotify.com/v1/playlists/{playlist_id}'
    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {request.cookies["access_token"]}'
    }
    playlist_response = requests.get(playlist_url, headers=headers)
    playlist_data = playlist_response.json()

    # Extract the relevant information from the playlist data
    playlist = {
        'name': playlist_data['name'],
        'description': playlist_data['description'],
        'image_url': playlist_data['images'][0]['url']
    }

    # Retrieve the tracks in the playlist
    tracks_url = f'https://api.spotify.com/v1/playlists/{playlist_id}/tracks'
    tracks_response = requests.get(tracks_url, headers={'Authorization': f'Bearer {request.cookies["access_token"]}'})
    tracks_data = tracks_response.json()

    # Extract the first 4 tracks from the tracks data
    tracks = []
    for track in tracks_data['items'][:4]:
        track_info = {
            'name': track['track']['name'],
            'artist': track['track']['artists'][0]['name'],
            'album': track['track']['album']['name'],
            'preview_url': track['track']['preview_url']
        }
        tracks.append(track_info)

    # Add the tracks to the playlist dictionary
    playlist['tracks'] = tracks

    # Store the playlist dictionary in a cookie
    playlist_json = json.dumps(playlist)
    print(playlist_json)
    cookie_expiration = 60 * 60 * 24  # 1 day
    response = make_response('Redirecting...')
    response.set_cookie('playlist', playlist_json, max_age=cookie_expiration)

    # Redirect the user to the page with the playlist data in the cookie
    redirect_script = '<script>setTimeout(function() { window.location.href = "http://127.0.0.1:5173"; }, 3000);</script>'
    # response.data += redirect_script.encode('utf-8')
    response.headers['Access-Control-Allow-Origin'] = 'http://127.0.0.1:5173'
    return response

@app.route('/make_appointment', methods=['POST'])
def make_appointment():
    try:
        appointment = request.get_json()
        email = appointment['email']
        name = appointment['name']
        date = appointment['date']
    except KeyError as e:
        return jsonify({'error': f"El objeto de cita no es válido: {e}"}), 400

    # Create the email message
    msg = EmailMessage()
    msg.set_content(f"Querido {name},\n\nNos gustaría programar una cita contigo para el día {date}. Por favor, háznos saber si te funciona.\n\nAtentamente,\nTu Equipo de Programación de Citas")

    # Set the sender and recipient email addresses
    msg['From'] = 'proyect.podcast1@gmail.com'
    msg['To'] = email

    # Send the email using SMTP
    try:
        with smtplib.SMTP('smtp.gmail.com', 587) as smtp:
            smtp.starttls()
            smtp.login('proyect.podcast1@gmail.com', 'gjwmbyuipbfikzqs')
            if not smtp.verify(email):
                return jsonify({'error': f"La dirección de correo electrónico {email} no es válida."}), 400
            smtp.send_message(msg)
    except smtplib.SMTPAuthenticationError:
        return jsonify({'error': "Error de autenticación SMTP: verifica que tu correo electrónico y contraseña son correctos."}), 500
    except smtplib.SMTPServerDisconnected:
        return jsonify({'error': "Error de conexión SMTP: verifica que tu conexión a Internet es estable y que el servidor SMTP está disponible."}), 500
    except smtplib.SMTPException as e:
        return jsonify({'error': f"No se pudo enviar el correo electrónico: {e}"}), 500

    # Return a response indicating that the email was sent
    return jsonify({'message': f"Se envió un correo electrónico a {email} para programar una cita."}), 200

if __name__ == "__main__":
    # start the Flask application
    app.run(debug=True)
