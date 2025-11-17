# -------------------------------
# 1. Builder Stage
# -------------------------------
FROM node:18-alpine AS builder

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files first (important for caching)
COPY package.json pnpm-lock.yaml ./

# Copy Prisma schema early so `pnpm install` can run `prisma generate`
COPY prisma ./prisma

# Allow pnpm to run "prisma generate" during install
RUN pnpm config set enable-pre-post-scripts true

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the Next.js app
RUN pnpm build



# -------------------------------
# 2. Production Stage
# -------------------------------
FROM node:18-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy built app from builder stage
COPY --from=builder /app ./

EXPOSE 3000

# Run the app in production
CMD ["pnpm", "start"]
