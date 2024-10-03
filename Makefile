# Makefile for managing the project

# Default goal
.DEFAULT_GOAL := help

# Variables
DOCKER_COMPOSE_FILE := docker-compose.yml
GRADLE := ./gradlew

# Help command
.PHONY: help
help: ## Display this help message
	@echo "Usage: make [target]"
	@echo
	@echo "Available targets:"
	@awk 'BEGIN {FS = ":.*?## "}; /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-35s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# Build commands
.PHONY: build
build: build-local build-docker ## Build locally and Docker images

.PHONY: build-local
build-local: ## Build JAR files locally using Gradle
	@echo "Building JAR files locally..."
	$(GRADLE) :race_application_query_service:build :race_application_command_service:build

.PHONY: build-docker
build-docker: ## Build Docker images for all services
	@echo "Building Docker images..."
	docker-compose -f $(DOCKER_COMPOSE_FILE) build

# Run commands
.PHONY: run
run: start-dependencies run-services ## Start dependencies and run services

.PHONY: start-dependencies
start-dependencies: ## Start PostgreSQL and RabbitMQ using Docker Compose
	@echo "Starting PostgreSQL and RabbitMQ..."
	docker-compose -f $(DOCKER_COMPOSE_FILE) up -d postgres-db rabbitmq

.PHONY: run-services
run-services: ## Run all services using Docker Compose
	@echo "Starting command and query services..."
	docker-compose -f $(DOCKER_COMPOSE_FILE) up -d race_application_query_service race_application_command_service

# Stop commands
.PHONY: stop
stop: stop-services stop-dependencies ## Stop all services

.PHONY: stop-services
stop-services: ## Stop command and query services
	@echo "Stopping command and query services..."
	docker-compose -f $(DOCKER_COMPOSE_FILE) stop race_application_command_service race_application_query_service

.PHONY: stop-dependencies
stop-dependencies: ## Stop PostgreSQL and RabbitMQ
	@echo "Stopping PostgreSQL and RabbitMQ..."
	docker-compose -f $(DOCKER_COMPOSE_FILE) stop postgres-db rabbitmq

# Remove commands
.PHONY: down
down: ## Remove all services and dependencies
	@echo "Removing all services and dependencies..."
	docker-compose -f $(DOCKER_COMPOSE_FILE) down

# Test commands
.PHONY: test
test: ## Run tests (tests should be part of Dockerfile if needed)
	@echo "Running tests in Docker containers..."

# Clean commands
.PHONY: clean
clean: ## Clean up Docker resources (volumes, networks, images)
	@echo "Cleaning up Docker resources..."
	docker-compose -f $(DOCKER_COMPOSE_FILE) down --volumes --remove-orphans

# Logs command
.PHONY: logs
logs: ## Tail logs for PostgreSQL, RabbitMQ, and services
	@echo "Tailing logs for all services..."
	docker-compose -f $(DOCKER_COMPOSE_FILE) logs -f postgres-db rabbitmq race_application_command_service race_application_query_service

# Remove all containers, images, volumes, and networks (use with caution)
.PHONY: prune
prune: ## Remove all Docker containers, images, volumes, and networks
	@echo "Pruning Docker system (containers, images, volumes, networks)..."
	docker system prune -a --volumes

# Restart dependencies
.PHONY: restart-dependencies
restart-dependencies: stop-dependencies start-dependencies ## Restart PostgreSQL and RabbitMQ
	@echo "Restarting PostgreSQL and RabbitMQ..."