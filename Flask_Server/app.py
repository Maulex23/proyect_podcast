import base64
from flask import Flask, request
from google.oauth2 import service_account
from googleapiclient.discovery import build
from cryptography.fernet import Fernet
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

app = Flask(__name__)

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
    range_name = "Database!A2:D"

    # get the data from the request body as a JSON object
    data = request.get_json()

    # Generate a random 32-byte key using Fernet
    key = Fernet.generate_key()

    # Encode the key using base64
    key_b64 = base64.urlsafe_b64encode(key)

    # Create a Fernet instance with the encoded key
    fernet = Fernet(key)

    # create a set of unique email addresses from the incoming request
    new_emails = set()
    rows = []
    for item in data:
        email = item["email"]
        if email not in new_emails:
            new_emails.add(email)
            password_bytes = item["password"].encode('utf-8')
            encrypted_password = fernet.encrypt(password_bytes)
            rows.append([email, encrypted_password.decode('utf-8'),
                        item["created_at"], key_b64.decode('utf-8')])

    sent_data = rows.copy()

    # call the Google Sheets API to get the existing data in the sheet
    result = service.spreadsheets().values().get(
        spreadsheetId=sheet_id,
        range=range_name,
    ).execute()

    # check for duplicate email addresses in the existing data and append new rows for unique email addresses
    existing_data = result.get("values", [])
    for row in existing_data:
        email = row[0]
        if email == sent_data[0][0]:
            return "No new data to store in Google Sheet"

    # find the last row in the sheet and append the new data to it
    write_result = service.spreadsheets().values().append(
        spreadsheetId=sheet_id,
        range=range_name,
        valueInputOption="USER_ENTERED",
        insertDataOption="INSERT_ROWS",
        body={"values": sent_data},
    ).execute()

    print(write_result)

    # return a response indicating success or failure
    if len(write_result["updates"]) > 0:
        return "Data stored in Google Sheet successfully"
    else:
        return "Failed to store data in Google Sheet"

# define a handler to restart the Flask application when changes are detected in the Python file


class RestartHandler(FileSystemEventHandler):
    def on_any_event(self, event):
        if event.src_path.endswith(".py"):
            print("Restarting Flask application...")
            observer.stop()
            app.run()


if __name__ == "__main__":
    # start the watchdog observer to monitor the Python file for changes
    observer = Observer()
    observer.schedule(RestartHandler(), ".", recursive=True)
    observer.start()

    # start the Flask application
    app.run()
