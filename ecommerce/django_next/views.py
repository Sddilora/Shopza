# Create your views here.
from json import JSONEncoder
from django_nextjs.render import render_nextjs_page_sync
from authlib.integrations.django_client import OAuth
from django.conf import settings
from django.shortcuts import redirect, redirect
from django.urls import reverse
from urllib.parse import quote_plus, urlencode
from urllib.parse import urlencode
import json

oauth = OAuth()

oauth.register(
    "auth0",
    client_id=settings.AUTH0_CLIENT_ID,
    client_secret=settings.AUTH0_CLIENT_SECRET,
    client_kwargs={
        "scope": "openid profile email",
    },
    server_metadata_url=f"https://{settings.AUTH0_DOMAIN}/.well-known/openid-configuration",
)

def login(request):
    return oauth.auth0.authorize_redirect(
        request, request.build_absolute_uri(reverse("callback"))
    )

def callback(request):
    token = oauth.auth0.authorize_access_token(request)
    request.session["user"] = token
    return redirect(request.build_absolute_uri(reverse("index")))

def logout(request):
    request.session.clear()

    return redirect(
        f"https://{settings.AUTH0_DOMAIN}/v2/logout?"
        + urlencode(
            {
                "returnTo": request.build_absolute_uri(reverse("index")),
                "client_id": settings.AUTH0_CLIENT_ID,
            },
            quote_via=quote_plus,
        ),
    )

def index(request):
    response = render_nextjs_page_sync(request)
    response.set_cookie("session", json.dumps(request.session.get("user")))
    return response
