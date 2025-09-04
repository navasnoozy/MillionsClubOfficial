# # auth/Dockerfile
# # Build stage
# FROM node:alpine

# WORKDIR /app
# COPY package*.json ./
# RUN npm ci 

# COPY . .



# CMD ["npm", "run", "dev"]




# Stage 1: Builder
FROM node:alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build    # compiles TS -> JS into /app/dist

# Stage 2: Runtime
FROM node:alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

CMD ["node", "dist/index.js"]