from flask import Flask

app = Flask(__name__)


# Test API route
@app.route("/testdata")
def testdata():
    """Handler for the /testdata route.

    Returns:
        A dictionary containing test data.
    """
    test_data = {
        "data 1": "data 1",
        "data 2": "data 2"
    }
    return test_data


if __name__ == "__main__":
    app.run(debug=True)