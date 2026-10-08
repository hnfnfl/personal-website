FROM node:22-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Static files only: no Node runtime in the final image.
# The unprivileged variant runs as a non-root user, so it starts under cap_drop: ALL.
FROM nginxinc/nginx-unprivileged:1.30-alpine AS runner

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 3000
