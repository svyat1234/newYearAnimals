from django.contrib import admin
from solo.admin import SingletonModelAdmin
from .models import (
    Question, Choice, Result, SiteContent, QuizAttempt, UserAnswer
)

admin.site.register(SiteContent, SingletonModelAdmin)

class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 3

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('title', 'subtitle', 'question_number')
    inlines = [ChoiceInline]
    ordering = ('question_number',)

@admin.register(Result)
class ResultAdmin(admin.ModelAdmin):
    list_display = ('title', 'result_text', 'min_score', 'max_score')
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

class UserAnswerInline(admin.TabularInline):
    model = UserAnswer
    extra = 0
    readonly_fields = ('question', 'selected_choice', 'is_correct')
    can_delete = False

    def has_add_permission(self, request, obj=None):
        return False

@admin.register(QuizAttempt)
class QuizAttemptAdmin(admin.ModelAdmin):
    list_display = ('timestamp', 'ip_address', 'score', 'total_questions', 'percentage_score')
    list_filter = ('timestamp',)
    inlines = [UserAnswerInline]
    readonly_fields = ('timestamp', 'ip_address', 'score', 'total_questions', 'percentage_score')

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return True # Or based on permissions
