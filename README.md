# DonorLink API Documentation

## Endpoints :

List of available endpoint:

- `POST /register`-
- `POST /login`-
- `POST /donors/:RecipientId`-
- `GET /donors`-
- `POST /donorconfirmation/:DonorId` -
- `GET /profile`-
- `POST /profile`-
- `POST /recipients`-
- `GET /recipients` -
- `GET /recipients/:id` -

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

## 6. GET /profile

Request:

- headers:

```json
{
  "access_token": "integer"
}
```

_Response (200 - ok)_

```json
{
  "id": "integer",
  "UserId": "integer",
  "identityNumber": "string",
  "gender": "string",
  "address": "string",
  "job": "string",
  "dateOfBirth": "date",
  "phoneNumber": "string",
  "imageUrl": "string",
  "bloodType": "string",
  "createdAt": "date",
  "updatedAt": "date",
  "User": {
    "id": "integer",
    "name": "string",
    "email": "string",
    "username": "string",
    "password": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

## 7. POST /profile

Request:

- body:

```json
{
  "identityNumber": "string",
  "gender": "string",
  "address": "string",
  "job": "string",
  "dateOfBirth": "date",
  "phoneNumber": "string",
  "imageUrl": "string",
  "bloodType": "string"
}
```

- headers:

```json
{
  "access_token": "integer"
}
```

_Response (201 - ok)_

```json
{
  "id": "integer",
  "UserId": "integer",
  "identityNumber": "string",
  "gender": "string",
  "address": "string",
  "job": "string",
  "dateOfBirth": "date",
  "phoneNumber": "string",
  "imageUrl": "string",
  "bloodType": "string",
  "updatedAt": "date",
  "createdAt": "date"
}
```

## 8. POST /recipients

Request:

-body:

````json
{
  "stock": "integer",
  "location": "string",
  "image": "string",
  "bloodType": "string",
  "description": "string"
}

-access_token:
{
  "id":"integer"
}

_Response (201)_

```json
{
  "stock": "integer",
  "location": "string",
  "image": "string",
  "bloodType": "string",
  "description": "string",
  "UserId": "integer"
}

````

_Response (400 - BadRequest)_

```json
{
  "message": "Stock is required",
  "or"
  "message": "Location is required",
  "or"
  "message": "Image is required",
  "or"
  "message": "Blood type is required",
  "or"
  "message": "Description is required"
}
```

## 9. GET /recipients

_Response (200 - oke)_

```json
{
  "UserId": "integer",
  "stock": "integer",
  "location": "string",
  "image": "string",
  "bloodType": "integer",
  "User": [
    {
      "name": "string",
      "email": "string",
      "userName": "string"
    }
  ]
}
```

## 10. /recipients/:id

Request:

-params:

```json
{
  "id": "integer"
}
```

_Response (200 - ok)_

```json
{
  "UserId": "integer",
  "stock": "integer",
  "location": "integer",
  "image": "string",
  "bloodType": "string",
  "Users": [
    {
      "name": "string",
      "email": "string",
      "userName": "string"
    }
  ],
  "Donors": [
    {
      "UserId": "integer",
      "stock": "integer",
      "RecipientId": "integer",
      "bloodType": "string",
      "DonorConfimation": [
        {
          "DonorId": "integer",
          "location": "string",
          "image": "string"
        }
      ]
    }
  ]
}
```
