from django.urls import path

from .views import paper_details_view, paper_search_view

urlpatterns = [
    path("search/", paper_search_view, name="paper_search"),
    path("get/<str:paper_id>/", paper_details_view, name="paper_details"),
]