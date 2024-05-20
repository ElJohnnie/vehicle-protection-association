FROM node:16.20.0 as builder
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm rebuild

FROM node:16.20.0 as production-stage

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "start:prod" ]
# # CMD ["tail", "-f", "/dev/null"]
