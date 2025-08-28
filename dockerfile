FROM node:22.18.0-alpine as vite-app

WORKDIR /app/client
COPY . .

RUN ["npm", "i"]
RUN ["npm", "run", "build"]

FROM nginx:alpine

WORKDIR /usr/share/nginx/

RUN rm -rf html
RUN mkdir html

WORKDIR /

COPY ./nginx.conf /etc/nginx
COPY --from=vite-app ./app/client/dist /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]


# ----- Command to build:
# docker build -t second-brain-frontend .
# ----- Command to deploy:
# docker run -d --name second-brain-frontend -p 3014:80 second-brain-frontend

# ----- Commands to redeploy:
# docker container stop second-brain-frontend
# docker container rm second-brain-frontend
# docker image rm second-brain-frontend
# docker build -t second-brain-frontend .
# docker run -d --name second-brain-frontend -p 3014:80 second-brain-frontend