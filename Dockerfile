# build environment
FROM node:15.6.0 as build
# default env_file
ARG ENV_FILE=".env.local"
WORKDIR /app
COPY package.json /app
COPY yarn.lock /app
RUN yarn install
COPY . .
COPY ${ENV_FILE} /app/.env.local
RUN yarn build
# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 3000 80
CMD ["nginx", "-g", "daemon off;"]
