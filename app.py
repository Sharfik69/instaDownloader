import json

from flask import Flask, render_template, request, jsonify
from finder import get_post_2, get_posts_by_username

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
    user_name = request.data.decode("utf-8")
    response = get_posts_by_username(user_name)
    return json.dumps(response)

if __name__ == '__main__':
    app.run(debug=True)