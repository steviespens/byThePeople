from django.shortcuts import render

def index(request):
    return render(request, 'frontend/index.html')

def docket(request):
    return render(request, 'frontend/docket.html')

def about(request):
    return render(request, 'frontend/about.html')

def polls(request):
    return render(request, 'frontend/polls.html')

def news(request):
    return render(request, 'frontend/news.html')

def user(request):
    return render(request, 'frontend/user.html')

