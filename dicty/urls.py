from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns(
    '',
    url(r'^$', 'dicty.views.index'),
    url(r'^api/(.*)$', 'dicty.views.api'),
    url(r'^(.*)$', 'dicty.views.others'),
)
