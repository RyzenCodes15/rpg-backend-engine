# API Documentation

This backend exposes a REST API compliant with OpenAPI 3 standards.

## Swagger UI

When the backend application is running locally, you can access the interactive API documentation and Swagger UI at:

`http://localhost:8080/swagger-ui.html`

The raw OpenAPI JSON/YAML definition can be accessed at:

`http://localhost:8080/v3/api-docs`

## Standard Responses

This API follows RFC 7807 for error reporting.

```json
{
  "type": "https://example.com/probs/out-of-credit",
  "title": "You do not have enough credit.",
  "status": 400,
  "detail": "Your current balance is 30, but that costs 50."
}
```
