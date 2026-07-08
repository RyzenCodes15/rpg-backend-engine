# API Documentation

The RPG Backend Engine API is documented using OpenAPI 3.

## Base URL
`/api/v1`

## Swagger UI
When running locally, Swagger UI is available at:
`http://localhost:8080/swagger-ui.html`

## Endpoints (Authentication Module)

### `POST /auth/register`
Creates a new player account and returns a JWT token.

**Request Body:**
```json
{
  "username": "player1",
  "email": "player1@example.com",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUz...",
  "userId": "123e4567-e89b-12d3-a456-426614174000",
  "username": "player1",
  "role": "PLAYER"
}
```

### `POST /auth/login`
Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "username": "player1",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUz...",
  "userId": "123e4567-e89b-12d3-a456-426614174000",
  "username": "player1",
  "role": "PLAYER"
}
```

## Error Handling
The API follows RFC 7807 Problem Details.

Example Validation Error:
```json
{
  "type": "https://api.rpgengine.com/errors/validation-failed",
  "title": "Bad Request",
  "status": 400,
  "detail": "Validation failed",
  "errors": {
    "email": "Email must be valid"
  }
}
```
