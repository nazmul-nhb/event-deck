# Event Deck

## Event Management Web Application

A full-stack event management system built with the MERN stack (MongoDB, Express.js, React.js, and Node.js) featuring custom authentication, event management, and search functionality.

- Live Demo [on Vercel](https://event-deck.vercel.app/)

## Features

- **User Authentication**: Custom-built auth system with password hashing and token generation
- **Event Management**: Create, read, update, and delete events
- **Dynamic UI**: Responsive interface with intuitive navigation
- **Search & Filter**: Advanced event discovery with multiple filter options
- **Attendance Tracking**: Join events with single-attendee restriction

## Tech Stack

**Frontend:**

- Vite + TypeScript + React
- Redux Toolkit for state management
- Shadcn UI components
- Tailwind CSS for styling
- Utilities from self-made package [nhb-toolbox](https://nhb-toolbox.vercel.app/)

**Backend:**

- Node.js with Express.js
- MongoDB with Mongoose ODM
- Custom authentication (crypto for hashing/tokens)
- Zod for schema validation
- Utilities from self-made package [nhb-toolbox](https://nhb-toolbox.vercel.app/)

**Developer Tools:**

- Comprehensive error handling
- Type-safe implementation

## Getting Started

1. Clone the repository
2. Set up environment variables (see server/README.md)
3. Install dependencies for both server and client
4. Run the development servers

## Project Structure

```bash
event-deck/
├── client/          # Frontend application
├── server/          # Backend application
├── .gitignore       # Ignore sensitive files from the root
├── README.md        # This file
└── task.js          # Solution to array sorting problem
```
