<h3 align="center">
  Nodejs REST API
</h3>


# NodeJs Rest API

# Features

(STILL IN DEVELOMENT)
The entity example in this repo is users, but it can be easily applied to articles, messages, ...

- [x] **Secure Authentification** with email/password using **JWT**
- [x] Clean Structure Component Oriented
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
git clone https://github.com/valentinchelle/rest-api-nodejs.git myproject

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

1. The client will call an API route ( like `url/api/users/modifyuser` )
2. The router makes the request pass through middlewares ( like `isConnected()`) to validate the request
3. The router feeds the controller by calling one of its action ( like `modifyUser()`).
4. The controller action access the model ( the database ) to modify/access a record in the table.
5. The controller ends up by returning a response

## Api Endpoints

#### Endpoints for the authentification

//Rest api client
//Get Single Contact
GET http://localhost:3000/api/contacts/5fe708473572682bbf74487e HTTP/1.1
 

################################
//Save Single Contact
POST http://localhost:3000/api/contacts HTTP/1.1
content-type: application/json

{
   "name":"Hm shohrab",
   "phone":"01878036425",
   "email":"hmshohrab20@gmail.com"
}

//Get all contacts
####
GET http://localhost:3000/api/contacts HTTP/1.1

//Update Single Contact
####
PUT http://localhost:3000/api/contacts/5fe45abf4b4d75330f783eae HTTP/1.1
content-type: application/json

{
   "name":"Hm shohrab",
   "phone":"01578036425",
   "email":"hmshohrab20@gmail.com"
}

//demo
#### 
GET http://localhost:3000/demo HTTP/1.1

//DELETE Single contact
####
DELETE  http://localhost:3000/api/contacts/5fe45a9c4b4d75330f783eac HTTP/1.1

//register
####
POST  http://localhost:3000/api/users/register HTTP/1.1
content-type: application/json

{
   "name":"Hm shohrab",
   "phone":"01478036425",
   "email":"hmshohrab20@gmail.com",
   "password": "123456a"
}

//login
####
POST  http://localhost:3000/api/users/login HTTP/1.1
content-type: application/json

{
    "phone":"01478036425",
    "password": "123456a"
}
 
 //Get All Users
###
GET http://localhost:3000/api/users HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSG0gc2hvaHJhYiIsImVtYWlsIjoiaG1zaG9ocmFiMjBAZ21haWwuY29tIiwicGhvbmUiOiIwMTQ3ODAzNjQyNSIsImlhdCI6MTYwODg3NzA5OCwiZXhwIjoxNjA5MDQ5ODk4fQ.ArhBFyhoQ_qheIwSyT2-9nydS2vbylJ5dJDlIx-6YU0


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
4. The server sends back to the client a **jwt token** ( containing information about the user ) and a **refresh token**
5. The client extracts the token, sets the Authorization Headers of the next requests to `Bearer + token_value`
