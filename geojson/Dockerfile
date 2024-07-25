# Use the official Nginx image from the Docker Hub
FROM nginx:alpine

# Copy the GeoJSON file to the Nginx HTML directory
COPY itb_jatinangor.geojson /usr/share/nginx/html/

# Copy a custom Nginx configuration file to change the port
COPY default.conf /etc/nginx/conf.d/

# Expose port 81
EXPOSE 81
