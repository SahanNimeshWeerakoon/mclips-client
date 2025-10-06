# FROM node:22-alpine
# WORKDIR /app
# COPY package.json package-lock.json* ./
# RUN npm install
# COPY . .
# EXPOSE 3000
# CMD ["npm", "run", "dev"]
# Step 1: Build stage
FROM node:22-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy source code
COPY . .

# Build the Next.js app
RUN npm run build

# Step 2: Production stage
FROM node:22-alpine AS runner
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json* ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Expose the port and run the production server
EXPOSE 3000
CMD ["npm", "run", "start"]