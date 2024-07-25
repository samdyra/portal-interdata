# Define variables
COMPOSE_FILE = docker-compose.yml
CLIENT_IMAGE_NAME = dwiputrasam/client

# Build the Docker images
.PHONY: build
build:
	@echo "Building Docker images..."
	docker compose -f $(COMPOSE_FILE) build

# Run the Docker containers
.PHONY: up
up:
	@echo "Starting Docker containers..."
	docker compose -f $(COMPOSE_FILE) up -d

# Stop the Docker containers
.PHONY: down
down:
	@echo "Stopping Docker containers..."
	docker compose -f $(COMPOSE_FILE) down

# Rebuild the Docker images
.PHONY: rebuild
rebuild: down build up

# View Docker Compose logs
.PHONY: logs
logs:
	@echo "Viewing logs..."
	docker compose -f $(COMPOSE_FILE) logs -f

# Clean up Docker resources
.PHONY: clean
clean:
	@echo "Cleaning up Docker resources..."
	docker compose -f $(COMPOSE_FILE) down -v --remove-orphans
	docker system prune -f
	docker volume prune -f

# Remove images
.PHONY: rmi
rmi:
	@echo "Removing Docker images..."
	docker rmi $(CLIENT_IMAGE_NAME)
