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

## Tech Stack

* Node.js
* Express.js
* Google Gemini API
* Docker
* Docker Compose
* string-similarity


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

## Environment Variables

The following environment variables are required:

```env
GEMINI_API_KEY=your_api_key_here

PORT=3000

GEMINI_MODEL=gemini-2.5-flash-lite

TEMPERATURE=0.3
MAX_OUTPUT_TOKENS=300
TOP_P=0.8
TOP_K=20

CACHE_SIMILARITY_THRESHOLD=0.75
```


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

* Rule-based routing<img width="1920" height="1080" alt="AI_Agent4_Semantic_Cache_Similar_Query" src="https://github.com/user-attachments/assets/61ad925f-65b6-426d-9a36-15ce3a7e4cfb" />
<img width="1920" height="1080" alt="AI_Agent4_Semantic_Cache" src="https://github.com/user-attachments/assets/c2f9f395-e36f-469f-ae7a-d7951a78a273" />
<img width="1920" height="1080" alt="AI_Agent3" src="https://github.com/user-attachments/assets/d25e814b-37b4-4131-a8e0-0fd11baf01c4" />
<img width="1920" height="1080" alt="AI_Agent2" src="https://github.com/user-attachments/assets/4903b29c-43bf-45d9-9505-ee13570946ce" />
<img width="1920" height="1080" alt="AI_agent1" src="https://github.com/user-attachments/assets/6df55229-bc10-4e17-9de8-774678a11c74" />
<img width="1920" height="1080" alt="AI_Agent_Stats_Updated" src="https://github.com/user-attachments/assets/5181ce40-2062-4711-a112-ad0814405674" />
<img width="1920" height="1080" alt="AI_Agent_Stats" src="https://github.com/user-attachments/assets/51682a8f-a39f-4191-b264-a3c138b89da9" />
<img width="1920" height="1080" alt="AI_Agent_Docker_health_check" src="https://github.com/user-attachments/assets/cb509b95-9008-4b90-82da-1dabaf19f09a" />
<img width="1920" height="1080" alt="AI_Agent_Cache" src="https://github.com/user-attachments/assets/67c4c947-bdac-40c0-b39d-dc95db280791" />
<img width="1920" height="1080" alt="AI_Agent_Docker_Compose_Running" src="https://github.com/user-attachments/assets/5f0a8eb8-43e5-4a36-958b-08a22bb3fc20" />
<img width="1920" height="1080" alt="AI_Agent_Docker_Compose_Running" src="https://github.com/user-attachments/assets/67914ce2-b929-4189-9067-b15627a5ad51" />
<img width="1920" height="1080" alt="AI_Agent_Cache" src="https://github.com/user-attachments/assets/c1ef8101-7625-4e71-9c7f-48aa1bcf7a15" />

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

**Ambreesh Kumar**

Backend Developer Assignment Submission for NextRow Digital.

Thank you for reviewing my solution.

