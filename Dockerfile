FROM node:18-alpine

# Set working directory
WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]