import json
import requests
import smtplib
from email.message import EmailMessage
from flask_cors import CORS
from flask import Flask, request, redirect, jsonify, make_response
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
client_id = "adc21c51f9d843588ef2704daa1c67a4"
client_secret = "a47d6c8b19cb4cea968cef42f7f282a5"
redirect_uri = "http://127.0.0.1:5000/callback"


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
@app.route("/loginspotify")
def loginspotify():
    scope = "user-library-read"
    auth_url = f"https://accounts.spotify.com/authorize?response_type=code&client_id={client_id}&scope={scope}&redirect_uri={redirect_uri}"
    return redirect(auth_url)


# Path to handle authentication callback
@app.route("/callback")
def callback():
    # Spotify api token validation
    code = request.args.get("code")
    auth_token_url = "https://accounts.spotify.com/api/token"
    data = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": redirect_uri,
        "client_id": client_id,
        "client_secret": client_secret
    }
    response = requests.post(auth_token_url, data=data)
    response_data = response.json()
    
    # Request to spotify api
    access_token = response_data["access_token"]
    podcast_id = "1qrNNhke5i6Gyed93DwLzv"
    url = f"https://api.spotify.com/v1/playlists/{podcast_id}"
    headers = {
        "Authorization": f"Bearer {access_token}"
    }


    response = requests.get(url, headers=headers)
    podcast_data = response.json()
    return podcast_data

    # Check if an access_token could be obtained
    #if "access_token" in response_data:
        #access_token = response_data["access_token"]

        # Create a response and save the access_token in a cookie
        #resp = make_response(redirect("/podcast"))
        #resp.set_cookie("access_token", access_token)

        #return resp
    #else:
    #    return "Error al obtener el token de acceso"


# Path to get information about a specific podcast
#app.route("/podcast")
#def podcast():
#    access_token = request.cookies.get("access_token")
#    podcast_id = "1qrNNhke5i6Gyed93DwLzv"
#    url = f"https://api.spotify.com/v1/playlists/{podcast_id}"
#    headers = {
#        "Authorization": f"Bearer {access_token}"
#    }
#    response = requests.get(url, headers=headers)
#    podcast_data = response.json()
#    return podcast_data


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
