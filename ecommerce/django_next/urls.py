from django.urls import path, re_path, include
from . import views
# from django.conf import settings
# from django.conf.urls.static import static
# from django.views.generic import TemplateView

urlpatterns = [
    path("login/", views.login, name="login"),
    path("logout/", views.logout, name="logout"),
    path("callback/", views.callback, name="callback"),
    path("", views.index, name="index"),
    path("", include("django_nextjs.urls")),
    path("cart/", views.index, name="cart"),
    path("product/", views.index, name="product"),
]
