# Local postgres docker containers

#### Run postgres development and test dbs

```
./db_setup.sh
```

#### Start stopped container

```
docker container start some-postgres-db
```

# Local environment setup

#### run database migrations

```
npm run db-dev:setup
```

#### install packages

```
npm install
```

#### install nodemon

```
npm install nodemon -g
```

#### run test server

```
npm start
```

#### run tests

```
npm test
```

# Run and build local node container

#### Docker Build local

```
docker-compose build
```

#### Docker Run local

```
docker-compose up
```

# Environment setup

#### Create and .env file from .env.example

#### Create a serviceAccountKey.json

{
"type": <>,
"project_id": <>,
"private_key_id": <>,
"private_key": <>,
"client_email":<>,
"client_id": <>,
"auth_uri": <>,
"token_uri": <>,
"auth_provider_x509_cert_url":<>,
"client_x509_cert_url": <>
}
