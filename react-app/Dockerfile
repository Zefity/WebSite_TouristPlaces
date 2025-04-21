# Dockerfile
FROM node:20-alpine

# Установим рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы
COPY . .

# Указываем порт
EXPOSE 3000

# Команда для запуска приложения
CMD ["npx", "vite", "--host"]