from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
   path("", views.index, name="index"),
    path("home/", views.index, name="home"),
    path("login/", views.login, name="login"),
    path("logout/", views.logout, name="logout"),
    path("callback/", views.callback, name="callback"),
]
