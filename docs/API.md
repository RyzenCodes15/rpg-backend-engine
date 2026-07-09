# API Documentation

The RPG Backend Engine API is documented using OpenAPI 3.

## Base URL
`/api/v1` (Note: combat/monsters currently mapped without v1 prefix in controllers, ensure context path handles it)

## Swagger UI
When running locally, Swagger UI is available at:
`http://localhost:8080/swagger-ui.html`

## Endpoints (Authentication Module)

### `POST /auth/register`
Creates a new player account and returns a JWT token.

## Endpoints (Monster Module)

### `GET /api/monsters`
Retrieves a list of all available monsters in the game.

### `GET /api/monsters/{id}`
Retrieves a single monster's details by its ID.

## Endpoints (Combat Module)

### `POST /api/combat/{characterId}/fight/{monsterId}`
Executes deterministic combat between a character and a monster and returns the full combat log, XP, Gold, and Loot.

### `GET /api/combat/{characterId}/history`
Retrieves the combat history for a specific character.

## Error Handling
The API follows RFC 7807 Problem Details.
