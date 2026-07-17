# Security Documentation

## Authentication System

Monster Maniac uses **JSON Web Tokens (JWT)** for stateless authentication.

### Token Characteristics
- **Algorithm**: HMAC SHA-256
- **Expiration**: 24 hours (default)
- **Claims**: Contains the subject (username). Roles are derived server-side via `UserDetailsService`.

### Endpoints
- `/api/v1/auth/register` and `/api/v1/auth/login` are public.
- All other `/api/v1/**` endpoints require a valid `Bearer` token in the `Authorization` header.

### Password Storage
Passwords are cryptographically hashed using **BCrypt** with a work factor of 10 (default in Spring Security). Raw passwords are never stored or logged.

### Exception Handling
Invalid tokens or missing headers return a `403 Forbidden` or `401 Unauthorized`.
Bad credentials during login return a structured RFC 7807 problem detail with `401 Unauthorized`.
