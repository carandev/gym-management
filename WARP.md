# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a gym management system built as a monorepo with a React Native (Expo) client and a Node.js server using tRPC for type-safe API communication.

**Architecture:**
- **Client**: React Native with Expo Router, TypeScript, tRPC React Query integration
- **Server**: Node.js with Express, tRPC, Prisma ORM, PostgreSQL
- **Package Management**: pnpm with workspace configuration
- **Database**: PostgreSQL with Prisma ORM for multi-tenant gym management

## Common Development Commands

### Root workspace commands
```bash
# Install all dependencies across the monorepo
pnpm install

# Run client and server concurrently for development
# (Note: Run these in separate terminals)
cd client && pnpm start    # Start Expo development server
cd server && pnpm dev      # Start Node.js server with hot reload
```

### Client commands (React Native/Expo)
```bash
cd client

# Development
pnpm start                 # Start Expo development server
pnpm android              # Run on Android emulator/device
pnpm ios                  # Run on iOS simulator/device  
pnpm web                  # Run web version

# Code quality
pnpm lint                 # Run ESLint

# Project utilities
pnpm reset-project        # Reset to blank template
```

### Server commands (Node.js/tRPC)
```bash
cd server

# Development
pnpm dev                  # Start development server with hot reload

# Database management
npx prisma migrate dev    # Run database migrations in development
npx prisma studio         # Open Prisma Studio database GUI
npx prisma generate       # Regenerate Prisma Client
npx prisma db push        # Push schema changes to database (development)
npx prisma db pull        # Pull schema from database to Prisma schema
```

## Project Architecture

### Multi-tenant Database Design
The system uses a multi-tenant architecture with the following key models:
- **Tenant**: Top-level organization (gym chains)
- **Branch**: Individual gym locations within a tenant
- **TenantUser**: Users with roles (SYSTEM_ADMIN, TENANT_ADMIN, TRAINER, MEMBER)
- **Machine**: Gym equipment linked to branches
- **Muscle**: Exercise muscle groups with many-to-many relationship to machines

### tRPC Integration
- **Type-safe APIs**: Full-stack type safety between client and server
- **Router structure**: Modular routers in `server/src/trpc/routers/`
- **Client setup**: React Query integration for caching and state management
- **Context**: Prisma client injected into all procedures

### File Structure
```
gym-management/
├── client/                 # React Native Expo app
│   ├── app/               # File-based routing (Expo Router)
│   ├── utils/trpc.ts      # tRPC client configuration
│   └── package.json
├── server/                # Node.js tRPC server
│   ├── src/
│   │   ├── trpc/          # tRPC setup and routers
│   │   ├── app.ts         # Express app configuration
│   │   └── db.ts          # Prisma client instance
│   ├── prisma/schema.prisma  # Database schema
│   └── package.json
```

### Key Development Patterns

**tRPC Router Pattern**: Each domain has its own router (e.g., `tenantRouter`) with procedures for queries and mutations.

**Client State Management**: Uses tRPC React Query integration with automatic cache invalidation on mutations.

**Database Access**: All database operations go through Prisma ORM with the client injected via tRPC context.

**Mobile Development**: Uses Expo Router for file-based navigation and cross-platform deployment.

## Environment Setup

### Required Environment Variables
```bash
# Server (.env in server/)
DATABASE_URL="postgresql://username:password@localhost:5432/gym_management"
PORT=3000
```

### Development Prerequisites
- Node.js 18+
- pnpm 8+
- PostgreSQL database
- Expo CLI for mobile development
- Android Studio/Xcode for mobile testing

### IP Configuration
The client is configured to connect to server at `192.168.101.19:3000`. Update this in `client/utils/trpc.ts` for your development environment.

## Database Management

### Schema Changes
1. Modify `server/prisma/schema.prisma`
2. Run `npx prisma migrate dev --name migration_description`
3. Restart server to pick up generated client changes

### Common Prisma Commands
```bash
# Development workflow
npx prisma migrate dev          # Create and apply migration
npx prisma db seed              # Run seed scripts (if configured)
npx prisma studio               # Visual database browser

# Production workflow  
npx prisma migrate deploy       # Apply pending migrations
npx prisma generate             # Generate client without migration
```

### Multi-tenant Considerations
- All queries should filter by tenant context for data isolation
- User roles determine access levels within tenants
- Branch-level data scoping for location-specific operations
