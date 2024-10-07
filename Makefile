# Default goal
.DEFAULT_GOAL := help

# Variables
DOCKER_COMPOSE_FILE := docker-compose.yml
GRADLE := ./gradlew
FRONTEND_DIR := ./race_application_client_application

# Help command
.PHONY: help
help: ## Display this help message
	@echo "Usage: make [target]"
	@echo
	@echo "Available targets:"
	@awk 'BEGIN {FS = ":.*?## "}; /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-35s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# Build commands
.PHONY: build
build: build-local build-docker frontend-install ## Build locally and Docker images

.PHONY: build-local
build-local: ## Build JAR files locally using Gradle
	@echo "Building JAR files locally..."
	$(GRADLE) :race_application_query_service:build :race_application_command_service:build

.PHONY: build-docker
build-docker: ## Build Docker images for all services
	@echo "Building Docker images..."
	docker-compose -f $(DOCKER_COMPOSE_FILE) build

# Backend Test Command
.PHONY: backend-test
backend-test: ## Run backend tests
	@echo "Running backend tests..."
	$(GRADLE) test

# Frontend operations
.PHONY: frontend-install
frontend-install: ## Install frontend dependencies
	@echo "Installing frontend dependencies..."
	cd $(FRONTEND_DIR) && npm install

.PHONY: frontend-start
frontend-start: ## Start the frontend application in development mode
	@echo "Starting frontend application..."
	cd $(FRONTEND_DIR) && npm start

.PHONY: frontend-lint
frontend-lint: ## Run linting on the frontend code
	@echo "Linting frontend code..."
	cd $(FRONTEND_DIR) && npm run lint:fix

.PHONY: frontend-test
frontend-test: ## Run frontend tests
	@echo "Running frontend tests..."
	cd $(FRONTEND_DIR) && npm run test

.PHONY: frontend-prettier
frontend-prettier: ## Run Prettier to fix formatting on frontend code
	@echo "Running Prettier on frontend code..."
	cd $(FRONTEND_DIR) && npm run prettier:fix

# Run commands
.PHONY: run
run: start-dependencies run-services frontend-start ## Start dependencies, run services, and start frontend

.PHONY: start-dependencies
start-dependencies: ## Start PostgreSQL and RabbitMQ using Docker Compose
	@echo "Starting PostgreSQL and RabbitMQ..."
	docker-compose -f $(DOCKER_COMPOSE_FILE) up -d postgres-db rabbitmq

.PHONY: run-servicesa
run-services: ## Run all services using Docker Compose
	@echo "Starting command and query services..."
	docker-compose -f $(DOCKER_COMPOSE_FILE) up -d race_application_query_service race_application_command_service

# Stop commands
.PHONY: stop
stop: stop-services stop-dependencies ## Stop all services including frontend

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
test: backend-test frontend-test ## Run tests for both frontend and backend
	@echo "Running tests for both frontend and backend..."

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