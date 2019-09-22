from django.test import Client
c = Client()
from django.urls import reverse
q = [
    # '/api/polls/',
    # '/api/polls/get_recommended_polls/',
    # '/api/polluservotes/',
    # '/api/polls/Data%20Privacy/',
    # '/api/polls/5/',
    # '/api/polls/list',
    '/api/jsonfiles/get_bill_data/'
]


#exec(open('django_test.py').read())
with open('django_test_output.txt', 'w+') as f:
    for i in q:
        # r = c.post(i, {'title': 'Test Headline', 'url': 'https://google.com', 'description': 'Some description'})

        # r = c.get(reverse('info-getrecommendedpolls'))
        

        r = c.post(i, {'congress': 116})
        f.write(i + '\n')
        STATUS = r.status_code
        f.write(str(STATUS) + '\n')
        if True:
        # if STATUS == 200:
            f.write(str(r.content) + '\n\n')
        else:
            f.write('\n')
    
        

