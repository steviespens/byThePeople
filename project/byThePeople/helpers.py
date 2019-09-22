import bs4 import BeautifulSoup
import urllib3


def get_html(url=None):
    url2 = "https://docs.house.gov/floor/"
    http = urllib3.PoolManager()
    response = http.request('GET', url)
    soup = BeautifulSoup(response.data)
    return soup.title

def convert_bill_id_with_congress_num(s):
    c = '-'
    return s.split(c)[0]