# Build
FROM node:18-bullseye AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

# Runtime
FROM node:18-bullseye
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app /app
EXPOSE 3001
CMD ["node", "src/server.js"]
