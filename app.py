import json

from flask import Flask, render_template, request, jsonify
from finder import get_post, get_post_2

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/find_post', methods=['POST'])
def find_post_by_link():
    if request.method != 'POST':
        return 'error'
    link = request.data.decode("utf-8")

    info = get_post_2(link)
    print(json.dumps(info))
    return json.dumps(info)


@app.route('/find_profile', methods=['POST'])
def find_profile_by_link():
    if request.method != 'POST':
        return 'error'
    link = request.form['profile_link']
    print(link)
    #TODO: search alg
    return 'profile ok'

if __name__ == '__main__':
    app.run(debug=True)