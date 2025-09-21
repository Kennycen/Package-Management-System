# Multi-stage build for production optimization
ARG NODE_VERSION=20.16.0
FROM node:${NODE_VERSION}-alpine AS builder

WORKDIR /usr/src/app

# Copy package files first for better caching
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Run build only if needed (e.g. TypeScript)
RUN npm run build || echo "No build step"

# Stage 2: Production
FROM node:${NODE_VERSION}-alpine AS production

# Install curl for health checks
RUN apk add --no-cache curl

WORKDIR /usr/src/app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev && npm cache clean --force

# Copy application code from builder stage
COPY --from=builder /usr/src/app ./

# Change ownership to nodejs user
RUN chown -R nodejs:nodejs /usr/src/app
USER nodejs

# Expose port
EXPOSE 4000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD curl -f http://localhost:4000/health || exit 1

# Start the application
CMD ["npm", "start"]