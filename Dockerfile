FROM node:24-alpine3.21

COPY package.json /app/package.json

RUN cd /app && npm i

COPY . /app/

WORKDIR /app

RUN npm run build

RUN cp .env.production.local /app/build/.env

EXPOSE 3000

WORKDIR /app

ENTRYPOINT ["npm", "start"]