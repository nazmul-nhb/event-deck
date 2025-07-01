# Event Deck

## Event Management Client

React-based frontend for the Event Management Web Application built with Vite, TypeScript, and modern UI libraries.

- Live Deployment [on Vercel](https://event-deck.vercel.app/)

## Features

- Responsive layout with Tailwind CSS
- State (Server & Local) management with Redux Toolkit
- Reusable UI components with ShadCN
- React Router for SPA routing
- Protected routes for authenticated users
- Event search and filtering functionality
- Event cards with join functionality
- Modal forms for event updating

## Installation

1. Navigate to the client directory: `cd client`
2. Install dependencies: `npm install`
3. Create a `.env` file: `.env.local`
4. Start the development server: `npm run dev`

## Environment Variables

```bash
VITE_SERVER_API=http://localhost:4242/api/
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run lint` - Run linter
- `npm run preview` - Preview production build
- `npm run commit` - For fast commit and push

## Styling

The application uses Tailwind CSS for utility-first styling with custom configurations. Shadcn components provide accessible, customizable UI elements.
