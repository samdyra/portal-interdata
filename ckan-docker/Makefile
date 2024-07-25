# Production commands
.PHONY: build
build:
	@echo "Building Docker images..."
	docker-compose build

.PHONY: run
run:
	@echo "Running Docker containers..."
	docker-compose up

# Development commands
.PHONY: build dev
build dev:
	@echo "Building Docker images..."
	docker compose -f docker-compose.dev.yml build

.PHONY: up dev
run dev:
	@echo "Running Docker containers..."
	docker compose -f docker-compose.dev.yml up

.PHONY: down dev
stop dev:
	@echo "Stopping Docker containers..."
	docker compose -f docker-compose.dev.yml down

.PHONY: create extension
create extension:
	@echo "Creating a new extension..."
	docker compose -f docker-compose.dev.yml exec ckan-dev /bin/sh -c "ckan -c /srv/app/ckan.ini generate extension --output-dir /srv/app/src_extensions"

.PHONY: rebuild dev
rebuild dev:
	@echo "Rebuilding Docker images..."
	docker compose -f docker-compose.dev.yml down
	docker compose -f docker-compose.dev.yml build
	docker compose -f docker-compose.dev.yml up