# Scalable Multiplayer RPG Backend Engine

## Current State: Authentication Milestone Completed

We have successfully implemented the foundational backend infrastructure and the **Authentication Module**.

### Features Implemented:
- Hexagonal architecture and Package-by-Feature structure.
- Dockerized PostgreSQL setup with Flyway migrations.
- Global exception handling using RFC 7807 problem details.
- User Entity, Registration, and Login use cases.
- Stateless authentication using JWT and BCrypt password hashing.
- Unit and Integration tests for backend logic.
- Next.js 14 frontend skeleton with basic retro RPG theme.
- Interactive Login and Registration UI consuming the backend API.
- Fully documented via OpenAPI (Swagger).

## Architecture

This project is structured as a monorepo containing both the backend service and the frontend management UI.

- **Backend**: Java 21, Spring Boot 3, Clean Architecture (Package-by-Feature)
- **Frontend**: Next.js, React, Tailwind CSS, TypeScript
- **Database**: PostgreSQL (managed via Flyway migrations)

Please refer to `docs/Architecture.md` for a complete architecture overview and module dependency diagrams.

## Quick Start (Docker)

To spin up the entire stack locally for development:

```bash
docker-compose up --build
```
This will start:
- PostgreSQL Database on port `5433`
- PgAdmin on port `5050`
- Spring Boot Backend on port `8080`
- Next.js Frontend on port `3001`

## Documentation

Full documentation is available in the `docs/` folder:
- [Architecture](docs/Architecture.md)
- [API](docs/API.md)
- [Database](docs/Database.md)
- [Deployment](docs/Deployment.md)
- [UML Diagrams](docs/uml/)
