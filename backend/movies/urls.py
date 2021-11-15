from django.urls import path

from .views import MovieDetail, MoviesList, MovieGetImage, MovieGetRating

urlpatterns = [
    path('search', MoviesList.as_view()),
    path('movie/<int:pk>', MovieDetail.as_view()),
    path('image/get', MovieGetImage.as_view()),
    path('ratings/load', MovieGetRating.as_view()),
]
