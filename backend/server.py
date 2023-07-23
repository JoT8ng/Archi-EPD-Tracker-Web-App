from flask import Flask, render_template, request, session
from app import app, db, TrackerData


@app.route("/")
def home():
    return render_template("index.html")

@app.route("/tracker", methods=["GET", "POST"])
def tracker():
    """Handler for the /racker route"""
    # Access the data sent from the frontend
    if request.method == "POST":
        material_category = request.form.get("material_category")
        product_name = request.form.get("product_name")

        tracker_data = TrackerData(session['sid'], material_category=material_category, product_name=product_name)
        db.session.add(tracker_data)
        db.session.commit()

    # Query the database to get the session data
    session_data = TrackerData.query.filter_by(session_id=session['sid']).all()

    return render_template("tracker.html", session_data=session_data)

@app.route("/clearsession", methods=["POST"])
def clear_session():
    session_id = session.get("sid")
    if session_id:
        TrackerData.query.filter_by(session_id=session_id).delete()
        db.session.commit()
        return {"message": "Session data deleted successfully"}, 200
    else:
        return {"message": "Session data not found and deleted"}, 404

# Test API route
@app.route("/testdata")
def testdata():
    """Handler for the /testdata route"""
    test_data = {
        "data1": "Hi my name is Jo",
        "data2": "blah blah blah"
    }
    return test_data


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(host="localhost", port=5000, debug=True)