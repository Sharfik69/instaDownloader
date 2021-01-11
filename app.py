import json

from flask import Flask, render_template, request

from instaloader import Instaloader, Post, Profile
import re
import shutil
import glob
import json


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


@app.route('/get_all_posts', methods=['POST'])
def get_all_photos():
    if request.method != 'POST':
        return 'error'
    code = request.data.decode("utf-8")
    response = get_img_by_code(code)
    return json.dumps(response)


def load_photo_from_post(short_code):
    L = Instaloader(download_pictures=False, download_comments=False, compress_json=False, download_videos=True)
    try:
        post = Post.from_shortcode(L.context, short_code)
    except Exception:
        return {'status': 'bad'}
    L.download_post(post, target=short_code)

    super_json = glob.glob(short_code + '/*.json')[0]

    response = {}
    super_dict = json.loads(open(super_json).read())

    if 'edge_sidecar_to_children' in super_dict['node']:
        response['img'] = []
        for i in super_dict['node']['edge_sidecar_to_children']['edges']:
            response['img'].append(i['node']['display_resources'])
    else:
        response['img'] = [super_dict['node']['display_resources']]

    response['owner'] = super_dict['node']['owner']
    response['status'] = 'ok'
    shutil.rmtree(short_code)
    return response


def get_post_2(link):
    m = re.search(r"instagram.com/p/[a-zA-Z0-9_-]{5,}", link)
    if m:
        short_code = m.group().split('/')[-1]
    else:
        return {'error': True}

    return load_photo_from_post(short_code)


def get_posts_by_username(username, size = (0, 50)):
    L = Instaloader(download_pictures=False, download_comments=False,
                    compress_json=False, download_videos=False,
                    download_geotags=False)
    try:
        profile = Profile.from_username(L.context, username)
    except Exception:
        return {'status': 'bad'}

    response_ans = []
    posts_list = list(profile.get_posts())
    owner = None
    for post in posts_list[size[0] : size[1]]:
        L.download_post(post, target=profile.username)
        with open(glob.glob(profile.username + "/*.json")[0]) as json_file:
            super_dict = json.load(json_file)
            post_info = {}
            post_info['code'] = super_dict['node']['shortcode']
            post_info['img'] = super_dict['node']['display_url']
            owner = super_dict['node']['owner']
            response_ans.append(post_info)
        shutil.rmtree(profile.username)

    return {'list': response_ans, 'status': 'ok', 'owner': owner}

def get_img_by_code(code):
    return load_photo_from_post(code)




if __name__ == '__main__':
    app.run(debug=False)