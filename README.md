# Solace Candidate Assignment

A modern, full-stack web application built with Next.js 15, TypeScript, and Drizzle ORM for managing and searching health advocates. This project demonstrates advanced full-stack development skills, database design, API architecture, and modern React patterns.

## Features

- **Modern Tech Stack**: Next.js 15, React 19, TypeScript 5.9
- **Database Integration**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Advanced Search**: Multi-field search across advocate profiles with database-level filtering
- **Responsive UI**: Beautiful, modern interface built with Tailwind CSS and Radix UI components
- **Data Tables**: Interactive tables with pagination and search capabilities
- **Type Safety**: Full TypeScript coverage with strict type checking

## Technical Implementation

### What I Built

This project is a complete full-stack application that demonstrates:

**Backend Architecture**

- **RESTful API Design**: Clean, RESTful endpoints with proper HTTP status codes and error handling
- **Database Layer**: PostgreSQL integration with Drizzle ORM for type-safe database operations
- **Search Engine**: Advanced multi-field search with database-level filtering
- **Pagination System**: Efficient server-side pagination with proper count queries
- **Error Handling**: Error handling with graceful degradation

**Frontend Architecture**

- **Modern React Patterns**: React 19 with hooks, custom hooks, and functional components
- **State Management**: TanStack Query for server state management with caching and optimistic updates
- **Component Library**: Reusable UI components built with Shadcn/Radix UI primitives and Tailwind CSS
- **Data Tables**: Interactive tables with filtering and pagination using Tanstack Table
- **Responsive Design**: Mobile-first responsive design with modern CSS practices

**Development Experience**

- **Type Safety**: 100% TypeScript coverage
- **Build System**: Next.js 15 with optimized builds and proper bundling
- **Code Quality**: ESLint, Prettier, and strict TypeScript configuration
- **Database Tools**: Drizzle Studio for database management and migration system

### Technical Decisions & Problem Solving

**Search Implementation**

- Implemented database-level filtering using PostgreSQL LIKE queries for performance
- Used proper SQL injection prevention with parameterized queries

**API Architecture**

- Designed RESTful endpoints following best practices
- Implemented proper pagination with offset/limit and total count
- Added error handling with meaningful error messages

**Frontend State Management**

- Chose TanStack Query for its excellent caching, background updates, and error handling
- Implemented custom hooks for data fetching with proper loading and error states
- Used Tanstack Table for complex table functionality with sorting and pagination built in.
- Built responsive components that work across all device sizes, well most but there can always be improvments.

**Performance Optimizations**

- Implemented server-side pagination to handle large datasets efficiently
- Implemented proper loading states and skeleton loaders for better UX

**Error Handling & Resilience**

- Implemented error boundaries and error states
- Added proper logging and error reporting throughout the application

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL (optional, see fallback mode)
- Docker (optional, for local PostgreSQL)

### Installation

1. **Clone and install dependencies**

   ```bash
   git clone <your-repo-url>
   cd solace-jp
   npm install
   ```

2. **Environment Setup**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your database configuration
   ```

3. **Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Setup

### Option 1: Docker (Recommended for Development)

1. **Start PostgreSQL container**

   ```bash
   docker compose up -d
   ```

2. **Generate and apply database migrations**

   ```bash
   npm run db:generate  # Generate migration files
   npm run db:pushd     # Apply changes to database
   ```

3. **Seed the database**

   ```bash
   npm run seed
   ```

### Option 2: External PostgreSQL

1. **Configure your PostgreSQL connection in `.env.local`**
2. **Create the database**

   ```sql
   CREATE DATABASE solaceassignment;
   ```

3. **Generate and run migrations, then seed**

   ```bash
   npm run db:generate  # Generate migration files
   npm run db:migrate   # Apply migrations to database
   npm run seed         # Seed with sample data
   ```

### Option 3: Fallback Mode (No Database)

The application automatically falls back to static data if no database is configured, so you can run it immediately without any database setup.

## Available Scripts

| Command               | Description                                 |
| --------------------- | ------------------------------------------- |
| `npm run dev`         | Start development server                    |
| `npm run build`       | Build for production                        |
| `npm run start`       | Start production server                     |
| `npm run lint`        | Run ESLint                                  |
| `npm run db:generate` | Generate new Drizzle migrations             |
| `npm run db:migrate`  | Run database migrations                     |
| `npm run db:push`     | Push schema changes to database             |
| `npm run db:studio`   | Open Drizzle Studio for database management |
| `npm run seed`        | Seed database with sample data              |

## Project Structure

```
solace-jp/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── advocates/     # Advocates API endpoint
│   │   │   └── health/        # Health check endpoint
│   │   ├── components/        # React components
│   │   │   ├── advocates/     # Advocate-specific components
│   │   │   └── ui/            # Reusable UI components
│   │   └── hooks/             # Custom React hooks
│   ├── db/                    # Database layer
│   │   ├── schema.ts          # Drizzle schema definitions
│   │   ├── seed/              # Database seeding scripts
│   │   └── migrate.ts         # Migration utilities
│   ├── lib/                    # Utility functions
│   └── types/                  # TypeScript type definitions
├── drizzle/                    # Drizzle configuration and migrations
├── public/                     # Static assets
└── docker-compose.yml          # Local development database
```

## Search Functionality

The advocates search system provides comprehensive, multi-field search capabilities:

### Search Fields

- **Name**: First and last name (partial matching)
- **Location**: City-based search
- **Education**: Degree and qualifications
- **Specialties**: Health practice areas
- **Experience**: Years of practice
- **Contact**: Phone number search

### Search Features

- **Case-insensitive**: Search works regardless of capitalization
- **Partial matching**: Find "John" in "Johnny" or "cardio" in "Cardiology"
- **Multi-field**: Single search term searches across all relevant fields
- **Database-optimized**: Uses PostgreSQL LIKE queries for performance
- **Fallback support**: Works with both database and static data

### API Usage

```bash
# Search for advocates
GET /api/advocates?search=john&page=1&limit=10

# Pagination
GET /api/advocates?page=2&limit=20

# Combined search and pagination
GET /api/advocates?search=criminal&page=1&limit=5
```

## UI Components

Built with modern, accessible components:

- **Shadcn/Radix UI**: Headless, accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **React Table**: Powerful table component with sorting and pagination
- **Lucide Icons**: Beautiful, consistent icon set
- **Loading States**: Skeleton loaders and loading indicators

## Type Safety

- **Full TypeScript**: 100% type coverage with strict mode enabled
- **Drizzle ORM**: Type-safe database queries and schema definitions
- **API Types**: Shared types between frontend and backend

## Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `NODE_ENV`: Environment (development/production)

## Development

### Code Quality

- **ESLint**: Code linting with Next.js configuration
- **Prettier**: Code formatting
- **TypeScript**: Strict type checking

### Database Development

- **Drizzle Studio**: Visual database management tool
- **Migrations**: Version-controlled schema changes
- **Seeding**: Sample data for development

## API Endpoints

| Endpoint         | Method | Description                                |
| ---------------- | ------ | ------------------------------------------ |
| `/api/advocates` | GET    | Fetch advocates with search and pagination |
| `/api/health`    | GET    | Health check endpoint                      |
| `/api/seed`      | POST   | Seed database with sample data             |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure all tests pass and build succeeds
5. Submit a pull request

## Troubleshooting

### Build Issues

- Ensure TypeScript compilation passes: `npm run build`
- Check for linting errors: `npm run lint`
- Verify all dependencies are installed: `npm install`

### Database Issues

- Check PostgreSQL connection in `.env.local`
- Verify database exists and is accessible
- Run migrations: `npm run db:push`
- Check Drizzle Studio: `npm run db:studio`

### Search Issues

- Verify search parameters are properly encoded
- Check database connection status
- Review API response format

---

**Built with Next.js, TypeScript, and Drizzle ORM**
