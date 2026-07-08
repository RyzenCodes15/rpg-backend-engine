# Scalable Multiplayer RPG Backend Engine

A production-quality full-stack software engineering project that powers the backend infrastructure and management interface of an online RPG.

## Screenshots

![Landing Page](docs/images/landing-page.png)
![Login](docs/images/login.png)
![Register](docs/images/register.png)
![Character Dashboard](docs/images/character-dashboard.png)
![Character Creation](docs/images/character-creation.png)
![Inventory](docs/images/inventory.png)
![Equipment](docs/images/equipment.png)
![Swagger UI](docs/images/swagger-ui.png)

## Features

**Implemented ✅**
- Stateless JWT Authentication (Register/Login)
- Character Management (Create, List, View, Delete)
- Inventory Management (Items, Quantity)
- Equipment System (Paper-doll style slots, Equip/Unequip)
- Base Stats & Progression (Leveling up, Stat Growth Strategies)
- Swagger API Documentation

**Planned 🚧**
- Combat System
- Skills & Abilities
- Crafting System
- Quests
- Guilds
- Trading
- Marketplace
- Leaderboards
- Admin Panel

## Tech Stack

- **Backend:** Java 21, Spring Boot 3, Spring Security, Spring Data JPA
- **Frontend:** Next.js 14 (App Router), React, Tailwind CSS, TypeScript
- **Database:** PostgreSQL 16, Flyway (Migrations)
- **Authentication:** JWT (JSON Web Tokens)
- **Testing:** JUnit 5, Mockito
- **Containerization:** Docker, Docker Compose
- **Documentation:** Swagger / OpenAPI 3, PlantUML

## Architecture

This project strictly adheres to production-grade architectural patterns:
- **Clean Architecture (Hexagonal):** Strict separation of concerns using Presentation, Application, Domain, and Infrastructure layers. The domain model remains completely isolated from external frameworks or database concerns.
- **Package-by-Feature:** Code is grouped by business capability (e.g., `auth`, `character`, `inventory`) to improve maintainability, cohesion, and allow for easier microservice extraction in the future.
- **SOLID Principles:** Applied throughout the codebase, utilizing Dependency Inversion via Interfaces and ensuring Single Responsibility in Services and Mappers.

## Project Structure

```text
rpg-backend-engine/
├── backend/            # Spring Boot backend
│   ├── src/main/java/com/rpgengine/
│   │   ├── auth/       # Authentication module
│   │   ├── character/  # Character module
│   │   ├── inventory/  # Inventory & Equipment module
│   │   └── common/     # Shared configuration & exceptions
│   └── src/main/resources/
│       ├── db/migration/  # Flyway SQL migrations
│       └── application.yml
├── frontend/           # Next.js frontend
│   └── src/
│       ├── app/        # App Router pages and layouts
│       ├── components/ # Reusable UI components
│       └── lib/        # API client and utilities
├── docs/               # UML and architecture documentation
└── docker-compose.yml  # Local development orchestration
```

## UML Documentation

UML diagrams detailing Entity-Relationship (ER) models and architecture are located in the `docs/uml/` directory. They are written using **PlantUML** (`.puml` format) and can be rendered using the PlantUML extension for VS Code or IntelliJ.

## API Documentation

The API is fully documented using Swagger UI.
When the backend is running, access Swagger at: `http://localhost:8080/swagger-ui.html`

## Local Development

The easiest way to run the project is using Docker Compose.

```bash
docker compose up --build
```

This will start:
- **PostgreSQL** on port 5433 (Internal port 5432)
- **Backend** on `http://localhost:8080`
- **Frontend** on `http://localhost:3001`
- **pgAdmin** on `http://localhost:5050`

## Running Without Docker

If you prefer to run the services directly on your host machine:

**Backend:**
Make sure PostgreSQL is running on port 5432 with the required credentials matching the database configuration.
```bash
cd backend
mvn spring-boot:run
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```
The frontend will start on `http://localhost:3000`.

## Environment Variables

### Backend Configuration
These variables are configured via `application.yml` or Docker Compose environment variables:
- `SPRING_DATASOURCE_URL`: `jdbc:postgresql://localhost:5432/rpg_engine` (default)
- `SPRING_DATASOURCE_USERNAME`: `rpg_user`
- `SPRING_DATASOURCE_PASSWORD`: `rpg_password`
- `JWT_SECRET`: The secret key used for signing JWTs (must be at least 256 bits).
- `JWT_EXPIRATION`: Token expiration time in milliseconds.

### Frontend Configuration (`.env.local`)
- `NEXT_PUBLIC_API_URL`: The URL of the backend API (defaults to `http://localhost:8080/api/v1`).

## Current Progress

- ✅ Authentication
- ✅ Character System
- ✅ Inventory
- ✅ Equipment
- 🚧 Combat
- 🚧 Skills
- 🚧 Crafting
- 🚧 Quests
- 🚧 Guilds
- 🚧 Trading
- 🚧 Marketplace
- 🚧 Leaderboards
- 🚧 Admin Panel

## Design Patterns Used

- **Factory Pattern**: Used in `StatGrowthStrategyFactory` to instantiate the correct stat progression strategy based on a chosen character class.
- **Strategy Pattern**: Used for `StatGrowthStrategy` to handle different leveling curves and base stat calculation for Warriors, Mages, and Rogues.
- **Data Transfer Object (DTO)**: Employed heavily in the Presentation layer to isolate the rich Domain models from API contracts.
- **Repository Pattern**: Used to abstract database access and persistence logic away from the Application layer.

## Testing

To run the unit tests for the backend:
```bash
cd backend
mvn test
```

## Future Roadmap

- **Combat Engine:** Implement a scalable, turn-based combat engine with skill modifiers.
- **Skill Trees:** Introduce active and passive abilities that integrate with character levels.
- **World Infrastructure:** Add quests and an Admin Panel for managing the game world state.

## License

MIT License.
