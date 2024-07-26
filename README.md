# Bappenas Technical Test
### Author: Dwiputra Sam Mulia

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

![`geojson` Directory is used for hosting mock data](https://prod-files-secure.s3.us-west-2.amazonaws.com/3a6e2eac-8cab-4523-ae95-e82d79516521/2170f6bc-2303-4205-9159-46ab0bf830d6/Untitled.png)

`geojson` Directory is used for hosting mock data

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

## Highlights and Results

## CKAN Extension Development

For our CKAN extension development, we simply run the command `make ckan-docker create extension`, and then develop the logic inside our extension repository. For this API viewer extension, we focus on using the standard CKAN extension development practices. The end result is shown below:

![http://103.6.53.254:20250/dataset/interdata-data/resource/043b6ee2-0fa8-4c10-b6fd-956b944ef627](https://prod-files-secure.s3.us-west-2.amazonaws.com/3a6e2eac-8cab-4523-ae95-e82d79516521/d746fa06-4e01-45cf-bc76-918051e9bc5e/Untitled.png)

http://103.6.53.254:20250/dataset/interdata-data/resource/043b6ee2-0fa8-4c10-b6fd-956b944ef627

Create new Views (Can accommodate any URL based JSON API)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/3a6e2eac-8cab-4523-ae95-e82d79516521/54eaa92e-00e6-4099-be1b-cfed068ac063/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/3a6e2eac-8cab-4523-ae95-e82d79516521/32e84452-c3c6-43d6-a393-e01732415eb2/Untitled.png)

Example end Result could be found here: http://103.6.53.254:20250/dataset/interdata-data/resource/043b6ee2-0fa8-4c10-b6fd-956b944ef627

## Second Objective (WebGIS)

We chose the `Search API` in GeoNetwork to perform searches in our WebGIS application and display all the metadata from GeoNetwork within the WebGIS.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/3a6e2eac-8cab-4523-ae95-e82d79516521/04259fda-90fb-4de6-8cda-fce1aa0636ff/Untitled.png)

Search API from Geonetwork in action:

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/3a6e2eac-8cab-4523-ae95-e82d79516521/c0e5c74f-89fc-46e3-90c5-9bc435698610/Untitled.png)

Details:

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/3a6e2eac-8cab-4523-ae95-e82d79516521/ec0e9ce4-c6e6-4a8d-9abf-1c60ff32551a/Untitled.png)

All the resource can be found here: http://103.6.53.254:20288/

## Room for Improvement

- We can more deeply integrate GeoNetwork and the WebGIS to use other APIs, or even to manage the layer visualization. For example, we can leverage data from GeoNetwork to toggle layers shown on the map and display the searched data.
- We can further improve the architecture of the apps by using an OGC-friendly map service like GeoServer to host our data (currently, I use NGINX and GeoJSON to host mock data).
    
    [#](#)
    
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