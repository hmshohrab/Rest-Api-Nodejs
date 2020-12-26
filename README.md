<h3 align="center">
  Nodejs REST API
</h3>


# NodeJs Rest API

# Features

(STILL IN DEVELOMENT)
The entity example in this repo is users, but it can be easily applied to articles, messages, ...

- [x] **Secure Authentification** with phone/password using **JWT**
- [x] Clean Structure
- [x] Get Entity
- [x] List Entity
- [x] Patch Entity
- [x] Delete Entity
- [x] Easy-to-use endpoints
- [x] Middlewares to ensure authentification.

# Getting Started

## Prerequisites

Please make sure that you have:

- node.js installed (https://nodejs.org/)

## Cloning the repo

The easiest way to get started is to clone the repository:

```
# Get the latest snapshot
git clone https://github.com/hmshohrab/Rest-Api-Nodejs.git myproject

# Change directory
cd myproject

# Install NPM dependencies
npm install

# Then simply start your app
npm start
```


# Structure

The structure of this code follows the guideines of the component oriented structure :
Each component corresponds to a folder, and follows an Model Controller Middlewares sub structure :

- **models** for the database entities ( like `users` ). It is where the schema, and the communication with the table are defined (like `UserModelfindById`).
- **controllers/** for the actions on the models, that call the models actions ( like the management of the list of the users).
- **middlewares/** intermediaries between the request and the response. Usually uses and modifies the request body parameters.
- **routes.js** for the definition of the endpoints for each actions of the controllers. Defines also what are the middleware used for the routes.

The global logic for an app calling this rest API :

1. The client will call an API route  
2. The router makes the request pass through middlewares  to validate the request
3. The router feeds the controller by calling one of its action  
4. The controller action access the model ( the database ) to modify/access a record in the table.
5. The controller ends up by returning a response

## Api Endpoints

#### Endpoints for the authentification

//Rest api client
<a href="https://raw.githubusercontent.com/hmshohrab/Rest-Api-Nodejs/master/ApiReq.http">Endpoints File</a>

# Understanding the login logic

## What is a JWT ?

Our authentifcation system relies on a JWT, _JSON Web Tokens_. The idea is to encode the user information, and to load all the communication between the server and the frontend with this token. This token has usually an expire date.

A simple overview would be :

```javascript
// ----------- SERVER SIDE -----------
const User = { name: "John", age: 21}
const jwt = encode(User, expireIn = 60 ); // will expire in 60 seconds
send_jwt_to_client();
// ----------- CLIENT SIDE -----------
const jwt = receive_jwt_from_server();
const User = decode(jwt);
>>> console.log(User)
{
  "name": "John",
  "age" : 21,
  "iat": 1516239022
}
```

## The authentication steps

#### Authenticate a user

Here is the different request between the server and the font end to handle the authentication.

1. The user enters its credentials on the client
2. The client sends the credentials to the server
3. The server compares the credentials with the database
4. The server sends back to the client a **jwt token** ( containing information about the user )   
5. The client extracts the token, sets the Authorization Headers of the next requests to `Bearer + token_value`
