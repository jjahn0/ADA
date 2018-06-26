from flask import Flask, render_template, jsonify, redirect
from flask_pymongo import PyMongo
import scrape_glassdoor

app = Flask(__name__)
mongo = PyMongo(app)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/scrape")
def scraper():
    glass = mongo.db.glass
    glass_data = scrape_glassdoor.scrape()
    for job in glass_data:
        glass.insert(job)
    
    return redirect("http://localhost:5000/", code=302)

# @app.route("/api/bell/<selection>")
# def bells():
#     if selection != None:
#         sel = selection
#         return sel
#     else:
#         return False

# @app.route("/api/bubble/<item>")
# def bubbles():
#     if item != None:
#         it = item
#         return it
#     else:
#         return False
@app.route('/map')
def map():
    glass = mongo.db.glass.find()
    data = []
    entry = {}
    for job in glass:
        entry = {
            'title': job['title'],
            'company': job['company'],
            'city' : job['city'],
            'state': job['state'],
            'location': job['location'],
        }
        data.append(entry)
        entry={}

    return jsonify(data)

@app.route('/table')
def table():
    glass = mongo.db.glass.find()
    data = []
    entry = {}
    for job in glass:
        entry = {
            'title': job['title'],
            'company': job['company'],
            'city' : job['city'],
            'state': job['state'],
            'salary': job['salaryMED'],
            'stars': job['rating'],
            'time': job['duration']
        }
        data.append(entry)
        entry={}

    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)