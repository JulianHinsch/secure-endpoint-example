# Consuming Secure Endpoints with React, Express, and Auth0

## Local Setup

1.  Clone the Repository 

```bash
$ git clone git@github.com:JulianHinsch/secure-endpoint-example.git
$ cd secure-endpoint-example
```

2.  Install Dependencies

```bash
$ npm install
$ cd client
$ npm install
```

3.  Configure Auth0

    - Add a .env file in the root directory, specify values for ```AUTH0_DOMAIN``` and ```AUTH0_AUDIENCE```
    - In ```client```, configure ```Auth/auth0-variables.js```

4.  Start the Server

```bash
$ npm run start
```
or
```bash
$npm run start:dev
```

5.  Serve or Build the Client

```bash
cd client
npm run start
```
or
```bash
cd client
npm run build
```

