FROM node:14 as  build

# build environment
COPY . /src
WORKDIR /src


RUN npm install
RUN npm install react-scripts
RUN npm run build


# production environment
FROM node:14 as  prod
COPY --from=build /src/build /app
RUN npm install -g serve
WORKDIR /app
ENV PORT 8002
EXPOSE 8002
CMD [ "serve", "-s" ,"build" ]