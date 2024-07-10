"""
EPData backend Flask application routes.
"""

import uuid
from flask import render_template, request, session, jsonify
from sqlalchemy.exc import SQLAlchemyError
from app import app, db, TrackerData
from helpers import extract_form_data, to_dict, query_row_to_delete


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    return response

def get_create_session_id():
    session.permanent = True

    # Generate a session id
    if "sid" not in session:
        # Generate a unique session id
        session["sid"] = str(uuid.uuid4())
        session_id = session["sid"]
        print(session_id)
        return session_id

    print(session_id)
    return session_id

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/sessionid", methods=["GET"])
def sessionid():
    get_create_session_id()
    session_id = session.get("sid")
    print(session_id)
    return jsonify({"session_id": session_id})

@app.route("/tracker", methods=["GET", "POST"])
def tracker():
    """Handler for the /racker route"""
    session_id = request.args.get('session_id')

    # Access the data sent from the frontend
    if request.method == "POST":
        tracker_data = extract_form_data()

        try:
            db.session.add(tracker_data)
            db.session.commit()
        except ValueError:
            error_message = "Failed to commit data to the database."
            return {"error": error_message}, 400

    # Query the database to get the session data
    session_data = TrackerData.query.filter_by(session_id=session_id).all()

    # Convert session_data to a list of dictionaries to be sent to frontend
    result = [to_dict(data) for data in session_data]

    for data_dict in result:
        # Print individual values for each key in data_dict
        for key, value in data_dict.items():
            print(f"{key}: {value}")

    response = jsonify(result)
    return response

@app.route("/clearsession", methods=["POST"])
def clear_session():
    session_id = request.args.get('session_id')
    if session_id:
        TrackerData.query.filter_by(session_id=session_id).delete()
        db.session.commit()
        return {"message": "Session data deleted successfully"}, 200
    return {"message": "Session data not found and deleted"}, 404

@app.route("/delete", methods=["DELETE"])
def delete():
    # Delete row data route
    if request.method == "DELETE":
        try:
            # Get JSON data from the frontend
            data = request.get_json()

            # Query the database for the row with matching data
            row_to_delete = query_row_to_delete(data)

            if row_to_delete:
                db.session.delete(row_to_delete)
                db.session.commit()
                return jsonify({"message": "Row deleted successfully"})
            return jsonify({"message": "Row not found in the database"})

        except SQLAlchemyError as e:
            return jsonify({"error": str(e)})


if __name__ == "__main__":
    with app.app_context():
        db.create_all() # pylint: disable=undefined-variable

    if app.config["FLASK_ENV"] == "dev":
        app.run(host=dev_server_host, port=dev_server_port, debug=True) # pylint: disable=undefined-variable
    elif app.config["FLASK_ENV"] == "prod":
        app.run(host=prod_server_host, port=prod_server_port) # pylint: disable=undefined-variable
    elif app.config["FLASK_ENV"] == "staging":
        app.run(host=staging_server_host, port=staging_server_port) # pylint: disable=undefined-variable
    elif app.config["FLASK_ENV"] == "testing":
        app.run(host=test_server_host, port=test_server_port) # pylint: disable=undefined-variable
