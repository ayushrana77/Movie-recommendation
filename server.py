from flask import Flask,jsonify,render_template,request
from query import qu
import threading



q1 = qu()

app = Flask(__name__)

@app.route("/front",methods=["GET","POST"])
def home():
    data = q1.front()
    return (jsonify(data))


@app.route("/page",methods=["GET","POST"])
def page():
    id = int(request.args.get('id'))
    return (jsonify(q1.get_Movie_id(id)))

@app.route("/category",methods=["GET","POST"])
def category():
    id = int(request.args.get('id'))
    data =  q1.get_genres_id(id)
    return (jsonify(data))

@app.route("/rem",methods=["GET","POST"])
def rem():
    id = request.args.getlist('id')
    ids = id[0].split(',')
    ids = map(int,ids)
    data =  q1.get_rem(ids)
    return (jsonify(data))


@app.route("/category_page",methods=["GET","POST"])
def category_page():
    id = int(request.args.get('id'))
    data =  q1.get_category_id(id)
    return (jsonify(data))

@app.route("/genre",methods=["GET","POST"])
def genre():
    data =  q1.genre()
    return (jsonify(data))

@app.route("/year",methods=["GET","POST"])
def get_by_year():
    year = int(request.args.get('year'))
    data =  q1.get_by_year(year)
    return (jsonify(data))


@app.route("/search",methods=["GET","POST"])
def get_by_search():
    search = request.args.get('search')
    data =  q1.get_by_search(search)
    return (jsonify(data))



if __name__ == "__main__":
    app.run(debug=True,threaded=False)
    