# Token of Memento

A travel adventure web application built with React, TypeScript, Vite, and Material UI. The app showcases destinations, packages, booking flows, and static content pages using a clean OOP and SOLID-friendly architecture.

## Features

- Destination discovery and filtering
- Package booking flow with payment strategy abstraction
- Reusable card and button components
- Shared navigation and footer services
- Static pages for About, Services, and Blog
- Strategy, Factory, Repository, and Singleton design patterns

## Architecture

The project is structured to separate concerns and follow SOLID principles:

- `src/models` — domain models like `DestinationEntity`
- `src/services` — data services and content providers
- `src/strategies` — sorting and payment strategy implementations
- `src/data` — centralized static records for destinations
- `src/components` — reusable presentational UI components
- `src/pages` — top-level app pages and routes

## Tech Stack

- React
- TypeScript
- Vite
- Material UI
- React Router DOM
- Framer Motion
- React Icons

## Scripts

```bash
npm install
npm run dev        # Start local development server
npm run build      # Build production bundle
npm run preview    # Preview production build
```

## Local Development

Start the development server and open the app in your browser:

```bash
npm run dev -- --host
```

The app will be available at:

- `http://localhost:3000/`

## Notes

This project was refactored with an emphasis on:

- Single Responsibility Principle
- Open/Closed Principle
- Dependency Inversion
- Encapsulation of filtering, sorting, and content logic
- Reusable service-driven page content

## File Highlights

- `src/pages/DestinationPackages.tsx` — destination listing and filtering page
- `src/services/DestinationRepository.ts` — singleton repository for data access
- `src/services/DestinationFilter.ts` — encapsulated filter builder
- `src/strategies/SortStrategy.ts` — strategy pattern for sorting
- `src/services/AuthFormService.ts` — strategy-based auth form configuration
- `src/services/PageContentService.ts` — shared service for page content

## License

This repository does not include a license by default. Add one if needed for your project.
