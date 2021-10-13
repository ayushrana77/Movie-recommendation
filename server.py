from flask import Flask,jsonify,render_template,request
import json
from query import qu


q1 = qu()

app = Flask(__name__)


@app.route("/front",methods=["GET","POST"])
def home():
    return (jsonify(q1.front()))


@app.route("/page",methods=["GET","POST"])
def page():
    id = int(request.args.get('id'))
    return (jsonify(q1.get_id(id)))



if __name__ == "__main__":
    app.run(debug=True)