# How to start the app

### Prerequisites

Make sure you have Docker and Docker Compose installed on your machine.

---

### Getting Started

### CKAN Docker

**Commands for building and running CKAN Docker images.**

**Build CKAN Docker Images**

To build the CKAN Docker images, run:

```go
make ckan-build
```

**Run CKAN Docker Containers**

To run the CKAN Docker containers, run:

```arduino
make ckan-run
```

---

### GeoJSON Docker

**Commands for managing GeoJSON Docker container.**

**Build GeoJSON Docker Image**

To build the GeoJSON Docker image, run:

```go
make geojson-build
```

**Run GeoJSON Docker Container**

To run the GeoJSON Docker container, run:

```arduino
make geojson-run
```

---

### WebGIS Vite Docker

**Commands for managing WebGIS Vite Docker containers.**

**Build WebGIS Vite Docker Images**

To build the WebGIS Vite Docker images, run:

```go
make webgis-build
```

**Start WebGIS Vite Docker Containers**

To start the WebGIS Vite Docker containers, run:

```go
make webgis-up
```

---

### GeoNetwork Docker

**Commands for managing GeoNetwork.**

**Start GeoNetwork**

To start GeoNetwork, run:

```go
make geonetwork-start
```

**Stop GeoNetwork**

To stop GeoNetwork, run:

```arduino
make geonetwork-stop
```

---

### Additional Commands

The Makefile includes additional commands for development, cleaning up resources, and more. Refer to the `Makefile` for a comprehensive list of commands available for each component.

## Objectives

- Create a simple plugin or extension for visualizing JSON API data in tabular format on the CKAN platform.
- Develop an external map viewer integrated with the GeoNetwork platform.

## Requirements

- Hosted GeoNetwork
- Hosted CKAN with JSON API viewer extension
- Non-specified external WebGIS connected to GeoNetwork (GeoNetwork API not specified)

## Approach

### Repository Management (Monorepo)

We are using a containerized, modular, and command-based philosophy to manage our repository. The main repository consists of three main applications:

- **GeoNetwork**
- **CKAN**
- **WebGIS**


For the custom WebGIS, we use a modern and performant technology stack to accommodate large dataset handling and 3D map visualization.

### WebGIS Tech Stack:

- **React**
- **TypeScript**
- **Mapbox**

In each application, we use `Docker` to containerize our applications, making it easier to manage dependencies and scaling. Additionally, we use `Makefile` everywhere to accommodate our command-based applications.

```makefile

ckan-build-dev:
	@echo "Building CKAN Docker images for development..."
	$(MAKE) -C ckan-docker build dev

ckan-run-dev:
	@echo "Running CKAN Docker containers for development..."
	$(MAKE) -C ckan-docker run dev

ckan-create-extension:
	@echo "Creating a new CKAN extension..."
	$(MAKE) -C ckan-docker create extension

```

## Room for Improvement

- We can more deeply integrate GeoNetwork and the WebGIS to use other APIs, or even to manage the layer visualization. For example, we can leverage data from GeoNetwork to toggle layers shown on the map and display the searched data.
- We can further improve the architecture of the apps by using an OGC-friendly map service like GeoServer to host our data (currently, I use NGINX and GeoJSON to host mock data).
- The CKAN API Table viewer could have more features, such as a geospatial data viewer, graphs, etc.

## Tech Debts
- SSL protection (HTTPS)
- Load balancing using Kubernetes, or even Infrastructure as Code (IaC) tools like Terraform to better handle our infrastructure

## Demo Purposes Only
- 3D map data are only a mock data that are shown in 3D using MapBox
- All applications run without SSL
- All applications run in dev mode
- Only integrate the Search API in our WebGIS

## Link to all resource

CKAN: http://103.6.53.254:20250/dataset/interdata-data/resource/043b6ee2-0fa8-4c10-b6fd-956b944ef627

WebGIS: http://103.6.53.254:20288/

GeoNetwork: http://103.6.53.254:20280/geonetwork/srv/eng/catalog.search#/home

Repository (GitHub): https://github.com/samdyra/portal-interdata