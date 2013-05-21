from django.conf.urls import patterns, include, url
from django.conf.urls.defaults import *

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns(
    'dicty.views',
    url(r'^$', 'index'),
    url(r'^api/?(.*)$', 'api'),
    url(r'^(.*)$', 'others'),
)
