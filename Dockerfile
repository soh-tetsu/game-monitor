# syntax=docker/dockerfile:1.2

# parallel build: build stage
FROM registry.access.redhat.com/ubi9/nodejs-18-minimal:1-51

WORKDIR /app

# layer caching for pnpm install
RUN --mount=type=cache,target=/root/.cache \
    npm install -g pnpm

# download packages
COPY pnpm-lock.yaml ./
RUN --mount=type=cache,target=/root/.cache \
    pnpm fetch --prod

# install packages
COPY package.json ./
RUN --mount=type=cache,target=/root/.cache \
    pnpm install -r --offline --prod

# copy over other files and compile
COPY . .

ENTRYPOINT ["pnpm", "start"]

