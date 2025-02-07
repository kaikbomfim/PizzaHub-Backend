FROM node:18.19.1

WORKDIR /

COPY . .

RUN npm install --force

EXPOSE 3000