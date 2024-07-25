# Define the name of the Docker image
IMAGE_NAME = my-nginx-geojson
CONTAINER_NAME = nginx-geojson-container

# Build the Docker image
build:
	docker build -t $(IMAGE_NAME) .

# Run the Docker container
run:
	docker run -d -p 81:81 --name $(CONTAINER_NAME) $(IMAGE_NAME)

# Stop the Docker container
stop:
	docker stop $(CONTAINER_NAME)

# Remove the Docker container
rm:
	docker rm $(CONTAINER_NAME)

# Clean up: stop and remove the container
clean: stop rm

# Rebuild the image and restart the container
rebuild: clean build run
