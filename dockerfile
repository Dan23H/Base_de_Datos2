FROM node:alpine

WORKDIR /app

COPY package8.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "index.js"]