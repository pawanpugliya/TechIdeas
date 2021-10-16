FROM nginx:alpine
COPY /dist/TechIdeas /usr/share/nginx/html
EXPOSE 80