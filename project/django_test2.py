import requests
import json

# q = [
#     # '/api/polls/',
#     # '/api/polls/get_recommended_polls/',
#     # '/api/polluservotes/',
#     # '/api/polls/Data%20Privacy/',
#     # '/api/polls/5/',
#     # '/api/polls/list',
#     '/api/jsonfiles/hr/995/116/'
# ]

congress = '116'
bill = 'hr1065'
url = 'https://api.propublica.org/congress/v1/' + congress + \
    '/bills/' + bill + '/subjects.json'

headers = {'X-API-KEY': '6vuSMgGaUFGdMVpgYFfptgttAtlCeOwuYcRCU9h7'}


#exec(open('django_test2.py').read())
with open('django_test_output2.txt', 'w+') as f:
    r = requests.get(url = url, headers = headers)
    print(r.status_code)
    print(r.text)
    data = json.dumps(r.json())
    f.write(data)
    # STATUS = r.status_code
    # f.write(str(STATUS) + '\n')
    # if True:
    # # if STATUS == 200:
    #     f.write(str(r.content) + '\n\n')
    # else:
    #     f.write('\n')
    
        

