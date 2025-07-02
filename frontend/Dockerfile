# ---- Stage 1: Build ----
FROM node:18-alpine AS builder
WORKDIR /app

# Копіюємо package-файли та встановлюємо
COPY package.json package-lock.json ./
RUN npm ci

# Копіюємо весь фронтенд
COPY . .

# Збираємо статичні файли
RUN npm run build

# ---- Stage 2: Serve ----
FROM nginx:stable-alpine
# Видаляємо дефолтні сторінки, копіюємо збірку
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
