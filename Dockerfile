FROM node:14


COPY . /src
WORKDIR /src


RUN npm install
RUN npm install react-scripts
RUN npm run build
RUN npm install -g serve

COPY build /app
WORKDIR /app

ENV PORT 8080
EXPOSE 8080

CMD [ "serve", "-s build" ]
