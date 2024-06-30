## Installation

```bash
$ npm install
```

## database connection

```bash
# I am using MySql Databse
$ DATABASE_URL=mysql://root:somepassword@localhost:3306/scan-to-pay
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## integeration test

```bash
# Integeration Test for complete flow from User Registration to Reviews with local server
$ npm run create
```

## delete integertion

```bash
# Delete all data created byIntegeration Test with local server
$ npm run delete
```

## Email Verification

```bash
# I am using mailtrap service for email verification you just need to add the host, port username, password to the env after regitering in mailtrap

$ EMAIL_HOST=sandbox.smtp.mailtrap.io
$ EMAIL_PORT=some-pory
$ EMAIL_USERNAME=some-username
$ EMAIL_PASSWORD=some-password


```

## API'S Section

```bash
# I have also added swagger for the endpoint testing which you can find on the given url

$ http://localhost:3000/swagger#/

# Base Url

$ http://localhost:3000

```
