# Event Deck

## Event Management API Server

Node.js backend for the Event Management Web Application featuring custom authentication and RESTful API endpoints.

- Live Deployment [on Vercel](https://event-deck-server.vercel.app/)

## Features

- Custom authentication system
- Password hashing using Node's crypto module
- Custom token generation and verification
- MongoDB data models with Mongoose
- Zod schema validation
- Comprehensive error handling
- RESTful API endpoints

## Installation

1. Ensure you have Node.js (v22+) installed
2. Clone the repository
3. Navigate to the server directory: `cd server`
4. Install dependencies: `npm install`
5. Create a `.env` file
6. Start the development server: `npm run dev`

## Environment Variables

```bash
PORT=4242
MONGO_URI=your_mongodb_uri
TOKEN_SECRET=secret_for_token_generation_and_verification
```

## API Endpoints

### Auth Routes

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### User Endpoints

- `GET /api/users/profile` - Get profile for the logged in user

### Event Routes

- `GET /api/events` - Get all events
- `POST /api/events` - Create new event
- `GET /api/events/user` - Get user's events
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event
- `PATCH /api/events/join/:id` - Join an event

## Database Models

- **User**: Stores user credentials and profile information
- **Event**: Contains event details and attendee information

## Available Scripts

### Development

- `npm run dev` — Start development server
- `npm run start` — Start the production server (runs `dist/server.js`)

### Build

- `npm run build` — Create a production build with progress bar
- `npm run clean` — Remove the `dist` folder (`rimraf dist`)
- `npm run deploy` — Build and deploy using Vercel (`scripts/build.mjs`)

### Linting & Formatting

- `npm run lint` — Run ESLint
- `npm run format` — Format code using Prettier
- `npm run fix` — Custom fix script (`scripts/fix.mjs`)

### Utilities

- `npm run commit` — Fast commit and push using custom script
- `npm run module` — Run custom module generator (`scripts/module.mjs`)
