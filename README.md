# Node.js Express TypeScript API

A RESTful API backend built with Node.js, Express, and TypeScript following the MVC architecture pattern.

## Features

- TypeScript support
- ESM Modules
- MVC Architecture
- Express Framework
- Environment Configuration
- Error Handling
- Input Validation with Joi
- Request Logging with Morgan
- Security with Helmet
- CORS support

## Project Structure

```
workscout-backend/
├── src/
│   ├── config/              # Configuration files
│   ├── controllers/         # Route controllers (controller layer)
│   ├── models/              # Database models (model layer)
│   ├── services/            # Business logic (service layer)
│   ├── routes/              # Express route definitions
│   ├── middlewares/         # Custom express middlewares
│   ├── utils/               # Utility functions
│   ├── types/               # TypeScript type definitions
│   └── app.ts               # Express app
└── server.ts                # Server entry point
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository

   ```
   git clone <repository-url>
   cd workscout-backend
   ```

2. Install dependencies

   ```
   npm install
   ```

3. Set up environment variables

   ```
   cp .env.example .env
   ```

   Edit the `.env` file with your configuration.

4. Build the project

   ```
   npm run build
   ```

5. Start the server

   ```
   npm start
   ```

   For development with auto-reload:

   ```
   npm run dev
   ```

## API Endpoints

### Health Check

- `GET /health` - Check API health

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Development

### Available Scripts

- `npm run build` - Builds the app for production
- `npm start` - Starts the production server
- `npm run dev` - Starts the development server with auto-reload
- `npm run lint` - Lints the code

## Next Steps

This project provides a basic structure to get started. Here are some recommended next steps:

1. Integrate a database (MongoDB, PostgreSQL, etc.)
2. Add authentication and authorization (JWT, OAuth)
3. Implement input validation and sanitization
4. Add comprehensive unit and integration tests
5. Set up CI/CD pipelines
6. Add documentation (Swagger/OpenAPI)
