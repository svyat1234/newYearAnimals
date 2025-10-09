from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import QuestionViewSet, ResultViewSet, SiteContentView, SubmitQuizView, UserResultView

router = DefaultRouter()
router.register(r'questions', QuestionViewSet)
router.register(r'results', ResultViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('site-content/', SiteContentView.as_view(), name='site-content'),
    path('submit-quiz/', SubmitQuizView.as_view(), name='submit-quiz'),
    path('user-result/', UserResultView.as_view(), name='user-result'),
]
