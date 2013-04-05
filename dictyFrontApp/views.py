from django.http import HttpResponse
from django.shortcuts import render

def index(request):
    return render(request, 'dictyFrontApp/index.html', {})
	
def others(request, sub):
    return render(request, 'dictyFrontApp/'+sub, {})
