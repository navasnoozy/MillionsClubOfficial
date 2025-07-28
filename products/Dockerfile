# products/Dockerfile
# Build stage
FROM node:alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci 

COPY . .



CMD ["npm", "run", "dev"]