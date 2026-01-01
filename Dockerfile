# Etapa de build
FROM node:20-alpine AS build
WORKDIR /app

# Copia package.json e instala dependências
COPY package*.json ./
RUN npm ci

# Copia código e compila
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Etapa de produção
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# Instala apenas dependências de produção
COPY package*.json ./
RUN npm ci --only=production

# Copia código compilado da etapa anterior
COPY --from=build /app/dist ./dist

# Expõe a porta da API
EXPOSE 3000

# Comando de inicialização
CMD ["node", "dist/server.js"]