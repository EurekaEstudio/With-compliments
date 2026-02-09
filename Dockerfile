# ===================================
# Stage 1: Build
# ===================================
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production=false

# Copy source code
COPY . .

# Build the app (output to /app/dist)
RUN npm run build

# ===================================
# Stage 2: Production
# ===================================
FROM caddy:2.8.4-alpine

# Copy built assets from builder
COPY --from=builder /app/dist /srv

# Copy Caddyfile
COPY Caddyfile /etc/caddy/Caddyfile

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Caddy runs automatically with the Caddyfile
