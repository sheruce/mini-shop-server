# Claude Agent Guidelines

**Project:** Mini Shop Server (微信小商城后端)
**Status:** Initial Development
**Last Updated:** 2026-04-23

---

## Project Overview

Backend service for the WeChat Mini Shop (`mini-shop`). Provides RESTful APIs for product management, shopping cart, orders, user authentication, and WeChat Pay integration.

---

## Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** To be determined (e.g., Express, Koa, NestJS)
- **Database:** To be determined
- **Auth:** WeChat Mini Program login flow (code2Session)

> Update this section as tech decisions are made.

---

## Project Structure

```
src/
├── controllers/      # Route handlers (thin — delegate to services)
├── services/         # Business logic
├── models/           # Database models / type definitions
├── middlewares/       # Auth, error handling, logging
├── routes/           # Route definitions
├── utils/            # Shared utility functions
└── config/           # Configuration (env-based)
```

---

## Coding Guidelines

### General Rules

- Use TypeScript with strict mode; define types explicitly, avoid `any`.
- Keep controllers thin — business logic goes in `services/`.
- Database queries go in `models/` or a dedicated `repositories/` layer, not in controllers.
- One module per file. Name files in kebab-case.

### API Design

- RESTful endpoints, consistent naming (plural nouns: `/products`, `/orders`).
- Always return consistent response shape: `{ code, message, data }`.
- Validate request input at the controller/middleware level.
- Use proper HTTP status codes.

### Security

- Never hardcode secrets — use environment variables.
- Validate and sanitize all user inputs.
- Use HTTPS for all external communication.
- Follow WeChat's security requirements for payment flows.
- Never log sensitive data (tokens, passwords, payment info).

---

## AI Decision Rules

### When Writing New Code

1. Follow the project structure above.
2. Business logic in `services/`, route handling in `controllers/`.
3. Define TypeScript types in `models/`.
4. Handle errors consistently with middleware.

### When to Ask Before Proceeding

- Choosing the web framework or database.
- Adding new npm dependencies.
- Modifying shared middleware or configuration.
- Designing database schema.
- Integrating WeChat Pay or other third-party APIs for the first time.

---

## Quick Rules (TL;DR)

```
DO:
- Use TypeScript with strict types
- Keep controllers thin, logic in services/
- Consistent API response shape
- Validate inputs at boundaries
- Use environment variables for config/secrets
- Ask before adding dependencies

DON'T:
- Use `any` type
- Put business logic in controllers
- Hardcode secrets or config values
- Skip input validation
- Log sensitive data
```
