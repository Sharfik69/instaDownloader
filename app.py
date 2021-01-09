from flask import Flask, render_template, request


app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/find_post', methods=['POST'])
def find_post_by_link():
    if request.method != 'POST':
        return 'error'
    link = request.form['post_link']
    print(link)
    #TODO: search alg
    return 'post ok'


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