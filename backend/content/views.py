from django.shortcuts import render
from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Question, Result, SiteContent, Choice, QuizAttempt, UserAnswer
from .serializers import (
    QuestionSerializer, 
    ResultSerializer, 
    SiteContentSerializer,
    QuizAttemptSubmitSerializer
)

def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

class UserResultView(generics.RetrieveAPIView):
    serializer_class = ResultSerializer

    def get_object(self):
        score = self.request.query_params.get('score', None)
        if score is not None:
            score = int(score)
            # Find the first result where the score falls within the min_score and max_score range
            result = Result.objects.filter(min_score__lte=score, max_score__gte=score).first()
            if result:
                return result
            # Fallback if no specific range matches, perhaps return a default or error
            # For now, let's return the first result as a fallback if no match
            return Result.objects.first()
        # If no score is provided, this view should probably not be used, or return an error
        return super().get_object() # This line should ideally not be reached if score is expected

class SubmitQuizView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = QuizAttemptSubmitSerializer(data=request.data)
        if serializer.is_valid():
            answers_data = serializer.validated_data['answers']
            
            total_questions = len(answers_data)
            correct_answers = 0

            # First pass to validate and score
            for answer in answers_data:
                try:
                    choice = Choice.objects.get(id=answer['choice_id'], question_id=answer['question_id'])
                    if choice.is_correct:
                        correct_answers += 1
                except Choice.DoesNotExist:
                    return Response(
                        {"error": f"Invalid choice or question ID provided."},
                        status=status.HTTP_400_BAD_REQUEST
                    )

            # Create the attempt
            attempt = QuizAttempt.objects.create(
                ip_address=get_client_ip(request),
                score=correct_answers,
                total_questions=total_questions
            )

            # Second pass to save answers
            for answer in answers_data:
                choice = Choice.objects.get(id=answer['choice_id']) # We know it exists
                UserAnswer.objects.create(
                    attempt=attempt,
                    question_id=answer['question_id'],
                    selected_choice_id=answer['choice_id'],
                    is_correct=choice.is_correct
                )

            return Response({"success": True, "score": correct_answers, "total": total_questions}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SiteContentView(generics.RetrieveAPIView):
    serializer_class = SiteContentSerializer

    def get_object(self):
        return SiteContent.get_solo()

class QuestionViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows questions to be viewed.
    """
    queryset = Question.objects.all().order_by('question_number')
    serializer_class = QuestionSerializer

class ResultViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows results to be viewed.
    """
    queryset = Result.objects.all()
    serializer_class = ResultSerializer
