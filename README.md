# Scalable Multiplayer RPG Backend Engine

This repository contains a production-quality, scalable backend engine and management interface designed for an online RPG.

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
- PostgreSQL Database on port `5432`
- PgAdmin on port `5050`
- Spring Boot Backend on port `8080`
- Next.js Frontend on port `3000`

## Documentation

Full documentation is available in the `docs/` folder:
- [Architecture](docs/Architecture.md)
- [API](docs/API.md)
- [Database](docs/Database.md)
- [Deployment](docs/Deployment.md)
- [UML Diagrams](docs/uml/)
