FROM node:15.4.0-alpine as build

WORKDIR /app

COPY ["package.json", "./"]

RUN npm install

COPY . .

RUN npm run build



FROM node:15.4.0-alpine 

WORKDIR /app

COPY ["package.json", "./"]

RUN npm install --production

COPY --from=build ["/app/build", "build/"]

CMD ["npm", "start"]
