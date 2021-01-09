from instaloader import Instaloader, Post
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


    L = Instaloader(download_pictures=False, download_comments=False, compress_json=False)
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
    shutil.rmtree(short_code)
    return response

# get_post('https://www.instagram.com/p/CCOHPEcHplS/')

# get_post('https://www.instagram.com/p/CJbPG_iHXjJ/')

# a = get_post_2('https://www.instagram.com/p/CJbPG_iHXjJ/')
# print(a)