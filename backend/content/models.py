from django.db import models
from solo.models import SingletonModel
from django.core.validators import FileExtensionValidator

# Create your models here.

class SiteContent(SingletonModel):
    promo_title = models.CharField("Промо / Заголовок", max_length=255, default="Праздники без&nbsp;опасности: забота о питомцах")
    promo_description = models.TextField("Промо / Описание", default="Полезные советы о том, как уберечь животных от праздничных опасностей и сделать праздник комфортным для всех")
    footer_title = models.CharField("Подвал / Заголовок", max_length=255, default="Фонд защиты городских животных")
    footer_description = models.TextField("Подвал / Описание", default="Защищаем права и интересы городских животных. Тех москвичей, которые сами о себе позаботиться не могут — кошек, собак, птиц и других животных нашего города")

    class Meta:
        verbose_name = "Настройки контента сайта"

    def __str__(self):
        return "Настройки контента сайта"

class Question(models.Model):
    question_number = models.PositiveIntegerField("Номер вопроса", unique=True, help_text="Укажите номер вопроса (от 1 до 9), который соответствует его номеру на карте.")
    title = models.CharField("Заголовок", max_length=255)
    subtitle = models.CharField("Подзаголовок", max_length=255)
    image = models.FileField(
        "Изображение", 
        upload_to='questions/', 
        blank=True, 
        null=True, 
        help_text="Загрузите изображение для вопроса. Поддерживаются: svg, jpg, png.",
        validators=[FileExtensionValidator(allowed_extensions=['svg', 'jpg', 'jpeg', 'png'])]
    )
    
    class Meta:
        verbose_name = "Вопрос"
        verbose_name_plural = "Вопросы"
        
    def __str__(self):
        return self.title

class Choice(models.Model):
    question = models.ForeignKey(Question, related_name='choices', on_delete=models.CASCADE, verbose_name="Вопрос")
    text = models.CharField("Текст ответа", max_length=255)
    is_correct = models.BooleanField("Правильный ответ", default=False)
    explanation = models.TextField("Пояснение")
    
    class Meta:
        verbose_name = "Вариант ответа"
        verbose_name_plural = "Варианты ответа"
        
    def __str__(self):
        return self.text

class Result(models.Model):
    title = models.CharField("Заголовок", max_length=255)
    description = models.TextField("Описание")
    result_text = models.CharField("Текст результата (например, 2/9)", max_length=50, blank=True, null=True)
    min_score = models.PositiveIntegerField("Минимальный балл для этого результата", default=0)
    max_score = models.PositiveIntegerField("Максимальный балл для этого результата", default=0)
    
    # Список разрешенных расширений для всех картинок
    allowed_extensions = ['svg', 'jpg', 'jpeg', 'png']
    
    foreground_image = models.FileField(
        "Изображение переднего плана (для первого слайда)", 
        upload_to='results/foreground/', 
        blank=True, 
        null=True, 
        help_text="Иллюстрация для первого слайда. Поддерживаются: svg, jpg, png.",
        validators=[FileExtensionValidator(allowed_extensions=allowed_extensions)]
    )
    
    background_desktop_slide_1 = models.FileField(
        "Фон для 1-го слайда (ПК)", 
        upload_to='results/backgrounds/desktop/', 
        blank=True, 
        null=True, 
        help_text="Фон для первого слайда на десктопах. Поддерживаются: svg, jpg, png.",
        validators=[FileExtensionValidator(allowed_extensions=allowed_extensions)]
    )
    background_mobile_slide_1 = models.FileField(
        "Фон для 1-го слайда (моб.)", 
        upload_to='results/backgrounds/mobile/', 
        blank=True, 
        null=True, 
        help_text="Фон для первого слайда на мобильных. Поддерживаются: svg, jpg, png.",
        validators=[FileExtensionValidator(allowed_extensions=allowed_extensions)]
    )

    background_desktop_slide_2 = models.FileField(
        "Фон для 2-го слайда (ПК)", 
        upload_to='results/backgrounds/desktop/', 
        blank=True, 
        null=True, 
        help_text="Фон для второго слайда на десктопах. Поддерживаются: svg, jpg, png.",
        validators=[FileExtensionValidator(allowed_extensions=allowed_extensions)]
    )
    background_mobile_slide_2 = models.FileField(
        "Фон для 2-го слайда (моб.)", 
        upload_to='results/backgrounds/mobile/', 
        blank=True, 
        null=True, 
        help_text="Фон для второго слайда на мобильных. Поддерживаются: svg, jpg, png.",
        validators=[FileExtensionValidator(allowed_extensions=allowed_extensions)]
    )

    class Meta:
        verbose_name = "Результат"
        verbose_name_plural = "Результаты"
        
    def __str__(self):
        return self.title

class QuizAttempt(models.Model):
    ip_address = models.GenericIPAddressField("IP адрес")
    timestamp = models.DateTimeField("Дата и время", auto_now_add=True)
    score = models.PositiveIntegerField("Правильных ответов")
    total_questions = models.PositiveIntegerField("Всего вопросов")
    
    @property
    def percentage_score(self):
        if self.total_questions > 0:
            return round((self.score / self.total_questions) * 100)
        return 0
    
    class Meta:
        verbose_name = "Попытка прохождения теста"
        verbose_name_plural = "Попытки прохождения тестов"
        ordering = ['-timestamp']

    def __str__(self):
        return f"Попытка от {self.timestamp.strftime('%Y-%m-%d %H:%M')} ({self.ip_address})"

class UserAnswer(models.Model):
    attempt = models.ForeignKey(QuizAttempt, related_name='answers', on_delete=models.CASCADE, verbose_name="Попытка")
    question = models.ForeignKey(Question, on_delete=models.CASCADE, verbose_name="Вопрос")
    selected_choice = models.ForeignKey(Choice, on_delete=models.CASCADE, verbose_name="Выбранный ответ")
    is_correct = models.BooleanField("Ответ верный", default=False)

    class Meta:
        verbose_name = "Ответ пользователя"
        verbose_name_plural = "Ответы пользователей"

    def __str__(self):
        return f"Ответ на '{self.question.title}' в попытке {self.attempt.id}"
