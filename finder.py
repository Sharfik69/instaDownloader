import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from instaloader import Instaloader, Post
import re
import shutil
import glob
import json
import os

def get_post(link):

    browser = webdriver.Chrome(ChromeDriverManager().install())
    browser.get(link)
    try:
        for _ in range(5):
            browser.find_element_by_css_selector('div.coreSpriteRightChevron').click()
    except Exception:
        pass
    source = browser.page_source

    bs = BeautifulSoup(source, 'html.parser')
    browser.close()

    user = bs.findAll('img', {'data-testid' : 'user-avatar'})[0]
    user_pic = user['src']
    user_name = user['alt'][:user['alt'].find("'")]
    img_src_list = [i['src'] for i in bs.findAll('img', {'srcset' : True}) if 'static' not in i['src']]
    return ({'user_name': user_name, 'user_pic': user_pic, 'img_list': img_src_list})


def get_post_2(link):
    if link.endswith('/'): link = link[:-1]
    if re.search(r"instagram.com/p/[a-zA-Z0-9_]{1,}", link):
        short_code = link.split('/')[-1]
    else:
        return {'error': True}


    L = Instaloader()
    post = Post.from_shortcode(L.context, short_code)

    L.download_post(post, target=short_code)

    super_json = glob.glob(short_code + '/*.json.xz')[0]
    try:
        import lzma
    except ImportError:
        from backports import lzma

    response = {}
    super_dict = json.loads(lzma.open(super_json).read())

    if 'edge_sidecar_to_children' in super_dict['node']:
        response['img'] = []
        for i in super_dict['node']['edge_sidecar_to_children']['edges']:
            response['img'].append(i['node']['display_resources'])
    else:
        response['img'] = super_dict['node']['display_resources']

    response['owner'] = super_dict['node']['owner']
    shutil.rmtree(short_code)
    return response

# get_post('https://www.instagram.com/p/CCOHPEcHplS/')

# get_post('https://www.instagram.com/p/CJbPG_iHXjJ/')

# a = get_post_2('https://www.instagram.com/p/CJbPG_iHXjJ/')
# print(a)