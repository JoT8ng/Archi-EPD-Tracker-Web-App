from flask import Flask, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return render_template('index.html')

@app.route("/tracker")
def tracker():
    return render_template('tracker.html')

@app.route("/contact")
def contact():
    return render_template('contact.html')

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
    app.run(host='localhost', port=5000, debug=True)