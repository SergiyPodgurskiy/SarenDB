# ---- Stage 1: Build ----
FROM python:3.13-slim AS builder
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
 && rm -rf /var/lib/apt/lists/*

COPY pyproject.toml poetry.lock ./

RUN pip install --root-user-action=ignore poetry \
 && poetry config virtualenvs.create false \
 && poetry install --no-root --no-interaction --no-ansi

COPY . .

# ---- Stage 2: Runtime ----
FROM python:3.13-slim
WORKDIR /app

# Копіюємо інстальовані пакети та код
COPY --from=builder /usr/local/lib/python3.13/site-packages /usr/local/lib/python3.13/site-packages
COPY --from=builder /app /app

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
