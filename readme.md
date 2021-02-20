
Authentication system 

The main goal of this app is to serve as a middlware service of you microservice architecuture.

| API end points: Read the wiki section  |
| - |

# Build
You can run this app in two diferent ways, the container version and the local version. Both require some env variables for configuring database and MQ connection.

:heavy_exclamation_mark: Make shure of setting up all the variables on the `.env` file, following `.env.example`.

## Docker
build your container using:
``` ssh
$ docker build . --tag auth-service
```
for the development version use the `.dev` file.

The run the container using the .env file.
``` ssh
$ docker run --rm -d -p 3000:<PORT> --env-file .env auth-service
```



## Local
- Install dependencies.
- Build
- run
```
$ npm install
$ npm run build
$ npm start
```
