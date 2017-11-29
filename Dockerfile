FROM nginx:alpine

ADD ./dist/ /usr/share/nginx/html/cyqweb/

EXPOSE 80