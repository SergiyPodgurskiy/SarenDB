# ---- Stage 1: Build ----
FROM python:3.13-slim AS builder
WORKDIR /app

# Системні залежності для збірки (наприклад, C-розширень)
RUN apt-get update \
 && apt-get install -y --no-install-recommends build-essential \
 && rm -rf /var/lib/apt/lists/*

# Копіюємо файли залежностей
COPY pyproject.toml poetry.lock ./

# Встановлюємо Poetry і залежності без встановлення самого проекту
RUN pip install --root-user-action=ignore poetry \
 && poetry config virtualenvs.create false \
 && poetry install --no-root --no-interaction --no-ansi

# Копіюємо весь код проєкту
COPY . .

# ---- Stage 2: Runtime ----
FROM python:3.13-slim
WORKDIR /app

# Додаємо Poetry-скрипти в PATH (uvicorn тощо)
ENV PATH="/usr/local/bin:${PATH}"

# Копіюємо встановлені пакети
COPY --from=builder /usr/local/lib/python3.13/site-packages /usr/local/lib/python3.13/site-packages

# Копіюємо CLI-скрипти
COPY --from=builder /usr/local/bin /usr/local/bin

# Копіюємо код програми
COPY --from=builder /app /app

# Порт FastAPI
EXPOSE 8000

# Точка входу
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
