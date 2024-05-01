FROM node:16.20.0 as build-stage
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
RUN chmod a+x ~/.npm
RUN npm run build

FROM nginx as production-stage
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf
RUN chmod -R o+r /usr/share/nginx/html
