# Using node.js official Docker image as the base image
FROM node:18-alpine

# Setting the working directory inside container(starting point in the project)
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the code
COPY . .

# Expose the port my backend is running on
EXPOSE 5000

# Start command
CMD ["npm", "start"]

