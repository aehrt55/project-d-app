### Docker Image for Production Run
FROM nginx:1.15.7-alpine

WORKDIR /usr/share/nginx/html

COPY ./build ./
COPY ./conf.d/default.conf /etc/nginx/conf.d/default.conf
