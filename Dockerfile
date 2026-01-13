# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Update npm to the desired version
RUN npm install -g npm@10.1.0

# Install all dependencies (production and dev)
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Remove development dependencies after build
RUN npm prune --production

# Set the environment variable to tell Next.js to run in production
ENV NODE_ENV=production
ENV PORT=8080

# Expose the port Cloud Run will use
EXPOSE 8080

# Start the Next.js application on port 8080
CMD ["npm", "run", "start"]
