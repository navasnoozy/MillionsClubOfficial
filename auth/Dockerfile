# # auth/Dockerfile
# # Build stage
# FROM node:alpine

# WORKDIR /app
# COPY package*.json ./
# RUN npm ci 

# COPY . .



# CMD ["npm", "run", "dev"]




# Stage 1: Builder
FROM node:24.7.0-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

RUN ls -la /app/ && echo "Debug $(date)"




# Stage 2: Runtime
FROM node:24.7.0-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

# Debug: List what was copied
RUN ls -la /app/ && echo "Debug $(date)"

CMD ["node", "dist/index.js"]