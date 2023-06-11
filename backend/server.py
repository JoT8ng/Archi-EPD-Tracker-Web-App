from flask import Flask

app = Flask(__name__)


@app.route("/")
def index():
    return "Hello, World"

# Test API route
@app.route("/testdata")
def testdata():
    """Handler for the /testdata route.

    Returns:
        A dictionary containing test data.
    """
    test_data = {
        "data1": "Hi my name is Jo",
        "data2": "blah blah blah"
    }
    return test_data


if __name__ == "__main__":
    app.run(host='localhost', port=5000, debug=True)