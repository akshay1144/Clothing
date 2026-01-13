########## -------------------------------
# 1. Builder Stage
# -------------------------------
FROM node:18 AS builder

WORKDIR /app

RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma

RUN pnpm config set enable-pre-post-scripts true
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build


# -------------------------------
# 2. Production Stage
# -------------------------------
FROM node:18

WORKDIR /app

RUN npm install -g pnpm

COPY --from=builder /app ./

EXPOSE 3000

# IMPORTANT: already added to package.json → next start -H 0.0.0.0
CMD ["pnpm", "start"]

