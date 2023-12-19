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

# Compila os arquivos TypeScript
RUN npm run build

# Aplica as migrations
RUN npm run migrate

# Abre a porta que o Express vai usar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/main/server.js"]
