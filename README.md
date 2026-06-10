# Mini AI Support Agent

## Overview

Mini AI Support Agent is a backend service that intelligently routes user queries between predefined rule-based responses and a Large Language Model (LLM).

The application reduces unnecessary LLM usage through a semantic caching layer and provides operational insights through a statistics endpoint.

The project is containerized using Docker and can be started using Docker Compose.

## Features

- Smart query routing (Rule-based vs LLM)
- Semantic cache to reduce redundant LLM calls
- Statistics endpoint for monitoring
- Environment-based configuration
- Dockerized deployment
- Docker Compose support
- Cost-control configuration for LLM requests

## Architecture

```text
Client
  |
  v
POST /query
  |
  +--> Rule Engine
  |       |
  |       +--> Direct Response
  |
  +--> Semantic Cache
  |       |
  |       +--> Cache Hit
  |
  +--> Gemini LLM
          |
          +--> Cache Store
```

## API Endpoints

### Health Check

**GET /health**

Response:

```json
{
  "status": "ok"
}
```

---

### Query Endpoint

**POST /query**

Request:

```json
{
  "message": "Explain React Hooks"
}
```

Rule-Based Response:

```json
{
  "source": "rules",
  "answer": "You can request a refund within 30 days of purchase."
}
```

LLM Response:

```json
{
  "source": "llm",
  "answer": "..."
}
```

Cached Response:

```json
{
  "source": "cache",
  "similarity": 1,
  "answer": "..."
}
```

---

### Statistics Endpoint

**GET /stats**

Response:

```json
{
  "totalQueries": 3,
  "ruleBased": 1,
  "llmCalls": 1,
  "cacheHits": 1,
  "cacheSize": 1,
  "cacheHitRate": "33.33%",
  "uptimeSeconds": 295
}
```

## Running Locally

### Prerequisites

* Node.js 22+
* Gemini API Key

### Installation

```bash
npm install
```

Create a `.env` file using `.env.example`.

Start the application:

```bash
npm start
```

The API will be available at:

```text
http://localhost:3000
```

## Running with Docker Compose

Build and start the application:

```bash
docker compose up --build
```

The API will be available at:

```text
http://localhost:3000
```

Stop containers:

```bash
docker compose down
```

## Design Decisions

### Rule-Based Routing

Frequently asked questions such as refund policies are handled using predefined rules. This avoids unnecessary LLM calls and reduces response time.

### LLM Fallback

Queries that do not match predefined rules are forwarded to Gemini for response generation.

### Semantic Cache

A similarity-based cache is used to avoid repeated LLM calls for semantically similar questions.

Example:

```text
Explain React Hooks
What are React Hooks?
Can you explain React Hooks?
```

These queries can reuse an existing cached response depending on the similarity threshold.

### Environment-Based Configuration

Model configuration and cost-control parameters are stored in environment variables, allowing deployment-specific tuning without code changes.

### Observability

The `/stats` endpoint provides visibility into routing decisions, cache performance, and service uptime.

## Future Improvements

Given an additional week, I would implement:

1. Embedding-based semantic search using Gemini embeddings instead of string similarity.
2. Redis-backed cache with TTL support.
3. Persistent statistics storage.
4. Request cost tracking and token usage monitoring.
5. WebSocket streaming responses.
6. Automated tests using Jest and Supertest.
7. Rate limiting and API authentication.
8. Structured logging and monitoring.
9. Vector database integration (Redis Vector Search, pgvector, or Pinecone).
10. React frontend dashboard for query monitoring and analytics.

## Screenshots

The repository includes screenshots demonstrating:

* Rule-based routing
* LLM routing
* Semantic cache hits
* Statistics endpoint
* Docker Compose execution

## Assumptions

* Statistics are stored in memory and reset on application restart.
* Cache entries are stored in memory and reset on application restart.
* Gemini API credentials are provided through environment variables.
* The current semantic cache implementation uses string similarity for lightweight operation and simplicity.

## Author

Ambreesh Kumar

Backend Developer Assignment Submission
