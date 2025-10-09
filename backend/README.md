# Django Backend: Инструкция по запуску

Этот документ предназначен для быстрого запуска и работы с бэкендом на Django (Python) для проекта "Праздники без опасности".

**Особенности:**
*   Предоставляет API для контента и статистики.
*   Управление через Admin-панель.

---

### 1. Установка Python (если не установлен)

*   **Скачайте Python 3** с [https://www.python.org/downloads/windows/](https://www.python.org/downloads/windows/)
*   При установке **ОБЯЗАТЕЛЬНО выберите "Add Python to PATH"**.
*   Проверьте установку: `python --version` (или `python3 --version`).

### 2. Настройка виртуального окружения

Перейдите в директорию `backend` вашего проекта:

```bash
cd C:\path\to\your\project\newYearAnimals-main\backend
```
*(Замените `C:\path\to\your\project` на ваш реальный путь)*

Создайте и активируйте `venv`:

```bash
python -m venv venv
.venv\Scripts\activate
```
*(В терминале появится `(venv)`)*

### 3. Установка зависимостей

Убедившись, что `(venv)` активен, установите пакеты:

```bash
pip install -r requirements.txt
```

### 4. Инициализация базы данных

Примените миграции для создания таблиц `SQLite`:

```bash
python manage.py migrate
```

### 5. Создание суперпользователя (для Admin-панели)

Создайте пользователя для доступа в админку. Следуйте инструкциям в консоли:

```bash
python manage.py createsuperuser
```
*(Или используйте `echo "..." | python manage.py shell` для предопределенного пароля, как в полной инструкции.)*

### 6. Запуск Backend-сервера

Запустите Django-сервер:

```bash
python manage.py runserver
```
Сервер будет доступен по адресу `http://127.0.0.1:8000/`.

### 7. Админ-панель и API

*   **Admin-панель:** `http://127.0.0.1:8000/admin/` (логин с созданным суперпользователем).
    *   Здесь можно управлять контентом (вопросы, результаты, тексты UI) и просматривать статистику теста.

*   **API Эндпоинты:**
    *   `GET /api/questions/` – Все вопросы
    *   `GET /api/results/` – Все результаты
    *   `GET /api/site-content/` – Тексты UI (шапка, подвал)
    *   `POST /api/submit-quiz/` – Отправка результатов теста

### Важно для Frontend-разработки

*   **CORS:** Backend настроен для `http://localhost:5173` и `http://localhost:5174`. Если ваш Frontend запустится на другом порту, добавьте его в `CORS_ALLOWED_ORIGINS` в `backend/newYearAnimals_backend/settings.py`.
*   **Локальный IP:** В режиме разработки IP-адрес в админке будет `127.0.0.1`. На продакшене будет отображаться реальный IP пользователя.

---

Если возникнут вопросы, обращайся!
