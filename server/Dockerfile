# Use a Node.js image as the base
FROM node:20.11-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire project directory (excluding node_modules)
COPY . .

# Create a new image to serve the application
FROM node:20.11-alpine

# Set the working directory
WORKDIR /app

# Copy only the production-ready code (excluding node_modules)
COPY . .

# Expose the port (adjust if you use a different port)
EXPOSE 5000

# Start the server (replace "index.js" if your entry point is different)
CMD [ "node", "server.js" ]
