FROM node:14-alpine as build


# build environment
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build
CMD [ "npm", "run", "start" ]

# production environment

# production env
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
ENV NODE_ENV=production
ENV BACKEND_URL=https://zoom-contacts-backend-lhbnp4ymma-uc.a.run.app/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]