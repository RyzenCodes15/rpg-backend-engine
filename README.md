# Monster Maniac

Monster Maniac built with Spring Boot, Next.js, and PostgreSQL. Features a robust Clean Architecture backend with package-by-feature organization, comprehensive JWT authentication, and a pixel-art styled React frontend.

## 🌟 Features

- **Robust Authentication & Authorization**: Secure JWT-based auth with Role-Based Access Control (RBAC). Admin and Player roles.
- **Clean Architecture Backend**: Organized by feature (Auth, Character, Combat, Inventory, Admin) using Spring Boot and Spring Data JPA.
- **Dynamic Combat System**: Turn-based combat engine calculating damage, critical hits, speed, and status effects.
- **Inventory & Equipment Management**: Full inventory system with equippable gear affecting combat stats.
- **Crafting System**: Gather materials and craft powerful items using recipes.
- **Admin Dashboard**: Full CRUD management interface for Users, Items, Monsters, Skills, and Recipes.
- **Modern Frontend**: Next.js 14 App Router, Tailwind CSS, TypeScript, and a responsive pixel-art UI.
- **Containerized**: Fully Dockerized environment for seamless local development and deployment.

## 🏗️ Architecture & Tech Stacks

### Backend (Spring Boot 3 + Java 17)
- **Framework**: Spring Boot (Web, Data JPA, Security)
- **Database**: PostgreSQL
- **Authentication**: JSON Web Tokens (JWT)
- **Design Pattern**: Clean Architecture, Package-by-Feature, AOP (Aspect-Oriented Programming)

### Frontend (Next.js 14 + React)
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **State Management**: React Hooks (`useState`, `useEffect`, `useCallback`)

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Build Tool**: Maven / npm

## 🚀 Getting Started

### Prerequisites
- Docker and Docker Compose
- Java 17 (for local development outside Docker)
- Node.js 18+ (for local development outside Docker)

### Running with Docker (Recommended)

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/monster-maniac.git
   cd monster-maniac
   ```

2. Start the services:
   ```bash
   docker compose up --build
   ```

3. Access the application:
   - Frontend: [http://localhost:3001](http://localhost:3001)
   - Backend API: [http://localhost:8080](http://localhost:8080)

*The database will be automatically initialized with test data, including an admin user (`admin` / `admin`).*

### Local Development (Without Docker)

#### Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
*(Requires a running PostgreSQL instance on localhost:5432 with db `rpgdb`, user `postgres`, pass `postgres`)*

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🎮 Gameplay Systems

- **Characters**: Create and manage multiple heroes per account (Warrior, Mage, Rogue).
- **Combat**: Engage monsters. Stats (Attack, Defense, Speed) dictate combat outcomes.
- **Inventory**: Collect loot, use consumables (potions), and manage your stash.
- **Equipment**: Equip weapons and armor to boost your core stats.
- **Crafting**: Combine materials into powerful weapons and gear.
- **Skills**: Unlock class-specific abilities as you level up.

## 🛡️ Admin Dashboard

Accessible only to `ROLE_ADMIN` users. Provides a complete CMS to manage the game world:
- **User Management**: Ban/unban users, change roles.
- **Content Management**: Create, edit, and delete Items, Monsters, Skills, and Recipes on the fly.

## 🧪 Testing

The backend includes a comprehensive suite of unit and integration tests.
```bash
cd backend
mvn clean test
```

## 📝 License

This project is licensed under the MIT License.
