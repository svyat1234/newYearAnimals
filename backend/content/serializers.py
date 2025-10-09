from rest_framework import serializers
from .models import Question, Choice, Result, SiteContent

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ('id', 'text', 'is_correct', 'explanation')

class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = ('id', 'question_number', 'title', 'subtitle', 'image', 'choices')
    
    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            return request.build_absolute_uri(obj.image.url)
        return None

class ResultSerializer(serializers.ModelSerializer):
    foreground_image = serializers.SerializerMethodField()
    background_desktop_slide_1 = serializers.SerializerMethodField()
    background_mobile_slide_1 = serializers.SerializerMethodField()
    background_desktop_slide_2 = serializers.SerializerMethodField()
    background_mobile_slide_2 = serializers.SerializerMethodField()

    class Meta:
        model = Result
        fields = (
            'title', 
            'description', 
            'result_text', 
            'min_score', 
            'max_score', 
            'foreground_image',
            'background_desktop_slide_1',
            'background_mobile_slide_1',
            'background_desktop_slide_2',
            'background_mobile_slide_2'
        )

    def get_foreground_image(self, obj):
        request = self.context.get('request')
        if obj.foreground_image and hasattr(obj.foreground_image, 'url'):
            return request.build_absolute_uri(obj.foreground_image.url)
        return None

    def get_background_desktop_slide_1(self, obj):
        request = self.context.get('request')
        if obj.background_desktop_slide_1 and hasattr(obj.background_desktop_slide_1, 'url'):
            return request.build_absolute_uri(obj.background_desktop_slide_1.url)
        return None

    def get_background_mobile_slide_1(self, obj):
        request = self.context.get('request')
        if obj.background_mobile_slide_1 and hasattr(obj.background_mobile_slide_1, 'url'):
            return request.build_absolute_uri(obj.background_mobile_slide_1.url)
        return None

    def get_background_desktop_slide_2(self, obj):
        request = self.context.get('request')
        if obj.background_desktop_slide_2 and hasattr(obj.background_desktop_slide_2, 'url'):
            return request.build_absolute_uri(obj.background_desktop_slide_2.url)
        return None

    def get_background_mobile_slide_2(self, obj):
        request = self.context.get('request')
        if obj.background_mobile_slide_2 and hasattr(obj.background_mobile_slide_2, 'url'):
            return request.build_absolute_uri(obj.background_mobile_slide_2.url)
        return None

class SiteContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteContent
        fields = ('promo_title', 'promo_description', 'footer_title', 'footer_description')

class UserAnswerSerializer(serializers.Serializer):
    question_id = serializers.IntegerField()
    choice_id = serializers.IntegerField()

class QuizAttemptSubmitSerializer(serializers.Serializer):
    answers = UserAnswerSerializer(many=True)
