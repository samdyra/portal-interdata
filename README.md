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