FROM oven/bun
WORKDIR /app
COPY . .
RUN bun install
 
ARG PORT
EXPOSE ${PORT:-8080}
 
CMD ["bun", "index.ts"]