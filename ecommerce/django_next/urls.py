from django.urls import path, re_path
from . import views
# from django.conf import settings
# from django.conf.urls.static import static
# from django.views.generic import TemplateView

urlpatterns = [
   path("", views.index, name="index"),
    path("home/", views.index, name="home"),
    path("login/", views.login, name="login"),
    path("logout/", views.logout, name="logout"),
    path("callback/", views.callback, name="callback"),
    re_path(r"^product/", views.index, name="index"),
]
