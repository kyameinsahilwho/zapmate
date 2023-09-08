@echo off

rem Start the frontend application
start cmd /k "cd frontend\zapfront && npm start"

rem Start the backend application
start cmd /k "call .venv\Scripts\activate.bat && cd zapmate && python manage.py runserver"