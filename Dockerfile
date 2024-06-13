# Version 4
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn build
CMD [ "node", "dist/index.js" ]
