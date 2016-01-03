from django.conf.urls import patterns, include, url

from django.contrib import admin
import views, settings
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', views.home, name='home'),
    url(r'^sjt/about', views.sjtAbout, name='sjtAbout'),
    url(r'^sjt', views.sjt, name='sjt'),
    url(r'^sw', views.sw, name='sw'),
    # url(r'^$', 'website.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
)
