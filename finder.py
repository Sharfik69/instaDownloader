import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
import instaloader

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
    instaloader.instaloader()

# get_post('https://www.instagram.com/p/CCOHPEcHplS/')

# get_post('https://www.instagram.com/p/CJbPG_iHXjJ/')