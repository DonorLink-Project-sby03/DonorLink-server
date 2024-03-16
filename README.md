# DonorLink API Documentation

## Endpoints :

List of available endpoint:

- `POST /register`-
- `POST /login`-

## address Aplication Server

```json

```

&nbsp;

## 1. POST /register

Request:

-body:

```json
{
  "name": "string",
  "email": "string",
  "username": "string",
  "password": "string"
}
```

_Response (201)_

````json
-newUser
{
    "name":"string",
    "email": "string",
    "username": "string",
    "password": "string"
}
```

_Response (400 - BadRequest)_

```json
{
    "message": "Name is required",
     "or"
    "message": "email is required",
    "or"
    "message": "email must be unique",
    "or"
    "message": "user Name is required",
    "or"
    "message": "password is required",
}
````

## 2. POST /login

Request:

-body:

```json
{
  "email": "string",
  "password": "strin"
}
```

_Response (200 - ok)_

```json
{
  "access_token": "string"
}
```

_Response (400 - BadRequest)_

````json
{
    "message": "Email and password is required"
}
_Response (401 - Unauthorized)_

```json
{
    "message": "Invalid email or password"
}

````

## 3. POST /donors/:RecipientId

Request:

- body:

```json
{
  "stock": "integer"
}
```

- headers:

```json
{
  "access_token": "integer"
}
```

- params:

```json
{
  "RecipientId": "integer"
}
```

_Response (201)_

```json
{
  "stock": "integer",
  "UserId": "integer",
  "RecipientId": "integer"
}
```

## 4. GET /donors

_Response (200 - ok)_

```json
{
  "UserId": "integer",
  "stock": "integer",
  "RecipientId": "integer",
  "bloodType": "integer"
}
```

## 5. POST /donorconfirmation/:DonorId

\_Request:

- body:

```json
{
  "DonorId": "integer",
  "location": "string",
  "image": "string"
}
```

- params:

```json
{
  "DonorId": "integer"
}
```

_Response (201)_

```json
{
  "DonorId": "integer",
  "location": "string",
  "image": "string"
}
```
