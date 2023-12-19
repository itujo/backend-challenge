# Escolhe a imagem base
FROM node:20-alpine

# Define o diretório de trabalho no container
WORKDIR /usr/src/app

# Copia os arquivos package.json e package-lock.json
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia os arquivos do projeto
COPY . .

# Roda drizzle
RUN npx drizzle-kit generate:pg

# Compila os arquivos TypeScript
RUN npm run build

# Abre a porta que o Express vai usar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/main/server.js"]
