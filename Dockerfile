FROM node:24.19.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

EXPOSE 9000
CMD ["node", "app.js"]
