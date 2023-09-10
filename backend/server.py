from flask import Flask, render_template, request, session, jsonify
from app import app, db, TrackerData
import uuid


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
        session_id = request.form.get("session_id")
        material_category = request.form.get("material_category", default="None")
        product_name = request.form.get("product_name", default="None")
        material_name = request.form.get("material_name", default="None")
        manufacturer = request.form.get("manufacturer", default="None")
        declared_unit = request.form.get("declared_unit", default="None")
        value1 = request.form.get("value1", default=0.0)
        unit1 = request.form.get("unit1", default="None")
        value2 = request.form.get("value2", default=0.0)
        unit2 = request.form.get("unit2", default="None")
        mat_volume = request.form.get("mat_volume", default=0.0)
        a1to3 = request.form.get("a1to3", default=0.0)
        a4 = request.form.get("a4", default=0.0)
        a5 = request.form.get("a5", default=0.0)
        b1 = request.form.get("b1", default=0.0)
        b2 = request.form.get("b2", default=0.0)
        b3 = request.form.get("b3", default=0.0)
        b4 = request.form.get("b4", default=0.0)
        b5 = request.form.get("b5", default=0.0)
        b6 = request.form.get("b6", default=0.0)
        print(request.form)

        tracker_data = TrackerData(
            session_id=session_id, 
            material_category=material_category, 
            product_name=product_name, 
            material_name=material_name, 
            manufacturer=manufacturer, 
            declared_unit=declared_unit,
            value1=value1, 
            unit1=unit1, 
            value2=value2, 
            unit2=unit2, 
            mat_volume=mat_volume, 
            a1to3=a1to3, 
            a4=a4, 
            a5=a5, 
            b1=b1, 
            b2=b2, 
            b3=b3, 
            b4=b4, 
            b5=b5, 
            b6=b6
            )
        
        try:
            db.session.add(tracker_data)
            db.session.commit()
        except ValueError:
            error_message = "Failed to commit data to the database."
            return {"error": error_message}, 400

    # Query the database to get the session data
    session_data = TrackerData.query.filter_by(session_id=session_id).all()

    # Convert session_data to a list of dictionaries to be sent to frontend
    result = []
    for data in session_data:
        data_dict = ({
            "id": data.id,
            "material_category": data.material_category,
            "product_name": data.product_name,
            "material_name": data.material_name,
            "manufacturer": data.manufacturer,
            "declared_unit": data.declared_unit,
            "value1": data.value1,
            "unit1": data.unit1,
            "value2": data.value2,
            "unit2": data.unit2,
            "mat_volume": data.mat_volume,
            "a1to3": data.a1to3,
            "a4": data.a4,
            "a5": data.a5,
            "b1": data.b1,
            "b2": data.b2,
            "b3": data.b3,
            "b4": data.b4,
            "b5": data.b5,
            "b6": data.b6
        })
        result.append(data_dict)

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
    else:
        return {"message": "Session data not found and deleted"}, 404

@app.route("/delete", methods=["POST"])
def delete():
    # Delete row data route
    if request.method == "POST":
        try:
            # Get JSON data from the frontend
            data = request.get_json()

            # Query the database for the row with matching data
            row_to_delete = TrackerData.query.filter_by(
                material_category=data["material_category"],
                product_name=data["product_name"],
                material_name=data["material_name"],
                manufacturer=data["manufacturer"], 
                declared_unit=data["declared_unit"],
                value1=data["value1"], 
                unit1=data["unit1"], 
                value2=data["value2"], 
                unit2=data["unit2"], 
                mat_volume=data["mat_volume"], 
                a1to3=data["a1to3"], 
                a4=data["a4"], 
                a5=data["a5"], 
                b1=data["b1"], 
                b2=data["b2"], 
                b3=data["b3"], 
                b4=data["b4"], 
                b5=data["b5"], 
                b6=data["b6"]
            ).first()

            if row_to_delete:
                db.session.delete(row_to_delete)
                db.session.commit()
                return jsonify({"message": "Row deleted successfully"})
            else:
                return jsonify({"message": "Row not found in the database"})
            
        except Exception as e:
            return jsonify({"error": str(e)})


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    if app.config["FLASK_ENV"] == "dev":
        app.run(host=dev_server_host, port=dev_server_port, debug=True)
    elif app.config["FLASK_ENV"] == "prod":
        app.run(host=prod_server_host, port=prod_server_port)
    elif app.config["FLASK_ENV"] == "staging":
        app.run(host=staging_server_host, port=staging_server_port)