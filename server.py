from flask import Flask,jsonify,render_template

from query import qu

q1 = qu()

app = Flask(__name__)

@app.route("/",methods=["GET","POST"])
def home():
    return (jsonify(q1.front()))






if __name__ == "__main__":
    app.run(debug=True)