# # Dockerfile
# FROM node:alpine

# WORKDIR /app

# COPY package*.json ./
# RUN npm ci

# COPY . .

# CMD ["npm", "run", "dev"]




# Stage 1: Build the Vite app
FROM node:24.7.0-alpine AS builder

WORKDIR /app

COPY package*.json .
RUN npm ci --quiet

COPY . .

RUN npm run build

RUN ls -la /app/ && echo "Debug $(date)"



# Stage 2: Serve with Nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf


EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]