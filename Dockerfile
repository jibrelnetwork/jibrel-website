FROM node:8-onbuild AS build

RUN npm run build:prod

FROM nginx:alpine

COPY --from=build /usr/src/app/public/. /app/
COPY version.txt /app/
COPY nginx.conf /etc/nginx/
COPY run.sh /bin/run.sh

RUN ["run.sh", "check"]
CMD ["run.sh", "start"]
