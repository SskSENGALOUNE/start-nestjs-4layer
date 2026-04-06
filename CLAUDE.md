# CLAUDE.md

## Project Overview

NestJS backend using **Clean Architecture + CQRS pattern**. TypeScript, PostgreSQL (Prisma ORM), Kafka messaging.

## Tech Stack

- **Framework:** NestJS 11, TypeScript 5.7
- **ORM:** Prisma 6 (PostgreSQL)
- **Pattern:** CQRS (`@nestjs/cqrs`)
- **Messaging:** Kafka
- **Caching:** Redis
- **HTTP Client:** Axios
- **Logging:** Winston
- **Package Manager:** pnpm

## Architecture Layers

```
src/
├── presentation/     # Controllers, DTOs, Interceptors
├── application/      # Commands, Queries, Event Handlers, Ports (interfaces)
├── domain/           # Entities, Domain Exceptions
├── infrastructure/   # Prisma repositories, Kafka, external APIs
└── shared/           # Shared utilities
```

### Layer Rules (enforced by dependency-cruiser)
- `presentation` → `application` only
- `application` → `domain` + `ports` only
- `infrastructure` implements `application/ports`
- No circular dependencies between layers
- Commands and Queries must remain separate

## Common Commands

```bash
# Development
pnpm start:dev          # Watch mode (port 3000)
pnpm start:debug        # Debug mode

# Build & Production
pnpm build
pnpm start:prod

# Database
docker-compose up -d    # Start PostgreSQL locally
pnpm prisma:migrate     # Run migrations
pnpm prisma:generate    # Generate Prisma client
pnpm prisma:studio      # Open Prisma Studio GUI

# Testing
pnpm test               # Unit tests
pnpm test:cov           # Coverage
pnpm test:e2e           # E2E tests
pnpm test:arch          # Validate architecture rules (dependency-cruiser)

# Code Quality
pnpm lint               # ESLint with auto-fix
pnpm format             # Prettier
```

## Adding a New Feature (CQRS Pattern)

1. **Domain** — create entity in `src/domain/<module>/`
2. **Port** — define repository interface in `src/application/ports/`
3. **Commands/Queries** — add handlers in `src/application/<module>/`
4. **Repository** — implement port in `src/infrastructure/prisma/repositories/`
5. **Controller** — add endpoints in `src/presentation/<module>/`
6. **Module** — wire everything up in the NestJS module

See `CQRS_GUIDE.md` for a detailed walkthrough and `src/presentation/ex-module/` for a reference implementation.

## Key Files

| File | Purpose |
|------|---------|
| `src/app.module.ts` | Root module, dynamic DB detection |
| `src/main.ts` | Entry point, Swagger setup |
| `prisma/schema.prisma` | Database models |
| `dependency-cruiser.js` | Architecture rule enforcement |
| `CQRS_GUIDE.md` | Feature implementation guide |

## Database Models

- `ExTable` — Example CRUD entity (UUID PK, audit fields)
- `Transactions` — Payment transactions with status tracking
- Enums: `Status` (PENDING, COMPLETED, FAILED), `BankType` (BCEL, JDB, LDB)

## API

- Swagger UI: `http://localhost:3000/api`
- Health check: `GET /health`

## Environment

Copy `.env.example` to `.env` and configure:
- `DATABASE_URL` — PostgreSQL connection string
- Kafka broker settings
- Redis connection

## Docker

```bash
docker-compose up -d    # Start all services (PostgreSQL, etc.)
./setup.sh              # Automated first-time setup
```

Multi-stage Dockerfile targets Node 18-alpine with Asia/Bangkok timezone.

## Kubernetes

Manifests in `k8s/` — deployment, service, ingress. Single replica with 128Mi–512Mi memory, 100m–500m CPU.
