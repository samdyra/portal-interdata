# Unified Makefile

# CKAN Docker commands
.PHONY: ckan-build ckan-run ckan-build-dev ckan-run-dev ckan-stop-dev ckan-create-extension ckan-rebuild-dev

ckan-build:
	@echo "Building CKAN Docker images..."
	$(MAKE) -C ckan-docker build

ckan-run:
	@echo "Running CKAN Docker containers..."
	$(MAKE) -C ckan-docker run

ckan-build-dev:
	@echo "Building CKAN Docker images for development..."
	$(MAKE) -C ckan-docker build dev

ckan-run-dev:
	@echo "Running CKAN Docker containers for development..."
	$(MAKE) -C ckan-docker run dev

ckan-stop-dev:
	@echo "Stopping CKAN Docker containers for development..."
	$(MAKE) -C ckan-docker down dev

ckan-create-extension:
	@echo "Creating a new CKAN extension..."
	$(MAKE) -C ckan-docker create extension

ckan-rebuild-dev:
	@echo "Rebuilding CKAN Docker images for development..."
	$(MAKE) -C ckan-docker rebuild dev

# GeoJSON commands
.PHONY: geojson-build geojson-run geojson-stop geojson-rm geojson-clean geojson-rebuild

geojson-build:
	@echo "Building GeoJSON Docker image..."
	$(MAKE) -C geojson build

geojson-run:
	@echo "Running GeoJSON Docker container..."
	$(MAKE) -C geojson run

geojson-stop:
	@echo "Stopping GeoJSON Docker container..."
	$(MAKE) -C geojson stop

geojson-rm:
	@echo "Removing GeoJSON Docker container..."
	$(MAKE) -C geojson rm

geojson-clean:
	@echo "Cleaning up GeoJSON Docker container..."
	$(MAKE) -C geojson clean

geojson-rebuild:
	@echo "Rebuilding GeoJSON Docker image..."
	$(MAKE) -C geojson rebuild

# WebGIS Vite commands
.PHONY: webgis-build webgis-up webgis-down webgis-rebuild webgis-logs webgis-clean webgis-rmi

webgis-build:
	@echo "Building WebGIS Vite Docker images..."
	$(MAKE) -C webgis-vite build

webgis-up:
	@echo "Starting WebGIS Vite Docker containers..."
	$(MAKE) -C webgis-vite up

webgis-down:
	@echo "Stopping WebGIS Vite Docker containers..."
	$(MAKE) -C webgis-vite down

webgis-rebuild:
	@echo "Rebuilding WebGIS Vite Docker images..."
	$(MAKE) -C webgis-vite rebuild

webgis-logs:
	@echo "Viewing WebGIS Vite Docker logs..."
	$(MAKE) -C webgis-vite logs

webgis-clean:
	@echo "Cleaning up WebGIS Vite Docker resources..."
	$(MAKE) -C webgis-vite clean

webgis-rmi:
	@echo "Removing WebGIS Vite Docker images..."
	$(MAKE) -C webgis-vite rmi

# GeoNetwork commands
.PHONY: geonetwork-start geonetwork-stop

geonetwork-start:
	@echo "Starting GeoNetwork..."
	$(MAKE) -C geonetwork start

geonetwork-stop:
	@echo "Stopping GeoNetwork..."
	$(MAKE) -C geonetwork stop
