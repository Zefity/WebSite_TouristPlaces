FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm run build

COPY . .

EXPOSE 1337

CMD ["npm", "run", "start"]
