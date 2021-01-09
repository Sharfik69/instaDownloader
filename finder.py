from instaloader import Instaloader, Post, Profile
import re
import shutil
import glob
import json


def get_post_2(link):
    m = re.search(r"instagram.com/p/[a-zA-Z0-9_-]{5,}", link)
    if m:
        short_code = m.group().split('/')[-1]
    else:
        return {'error': True}


    L = Instaloader(download_pictures=False, download_comments=False, compress_json=False, download_videos=True)
    post = Post.from_shortcode(L.context, short_code)

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

# a = get_posts_by_username('who.is.irina')
# print(a)

# get_post('https://www.instagram.com/p/CCOHPEcHplS/')

# get_post('https://www.instagram.com/p/CJbPG_iHXjJ/')

# a = get_post_2('https://www.instagram.com/p/CJbPG_iHXjJ/')
# print(a)