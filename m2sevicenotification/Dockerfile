FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV KAFKA_BROKER=kafka:9092
ENV KAFKA_TOPIC=payments
ENV CONSUMER_GROUP_ID=notification_group

EXPOSE 3000

CMD ["npm", "run", "start"]