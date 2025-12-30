# Docker Instructions

This project includes Docker configuration for easy setup and development.

## Prerequisites

* Docker
* Docker Compose

## Development

To run the application in development mode with hot reloading:

```bash
docker compose up react-dev
```

Or using the helper script (Unix/Git Bash):

```bash
./scripts/dev.sh
```

## Production Build

To build the Docker image for production:

```bash
docker compose build
# or run the standard build command
docker build -t zoom-participants-chat-count .
```

To run the production build locally:

```bash
docker compose up react-app
```
