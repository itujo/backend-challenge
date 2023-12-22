# Projeto de Investimento em Bitcoin

Descrição breve do projeto: Este projeto é uma API de investimento em bitcoins, permitindo aos usuários comprar, vender bitcoins, visualizar o histórico de transações e acompanhar o valor do bitcoin ao longo do tempo.

## Funcionalidades

- Cadastro e autenticação de usuários
- Depósito de valores em reais
- Compra e venda de bitcoins
- Visualização do saldo em reais e bitcoins
- Histórico de transações financeiras

## Tecnologias Utilizadas

- Node.js com Express
- TypeScript
- PostgreSQL
- Drizzle ORM
- Docker
- Integração com API externa para cotação do bitcoin
- Api de envio de emails

## Instalação e Execução

1. **Clone o Repositório**

   ```
   git clone git@github.com:itujo/backend-challenge.git
   cd backend-challenge
   ```

2. **Configure as Variáveis de Ambiente**

   Crie um arquivo `.env` na raiz do projeto e preencha as variáveis conforme necessário (exemplo disponível em `.env.example`).

3. **Instale as Dependências**

   ```
   npm install
   ```

4. **Executando o Projeto com Docker**

   ```
   docker-compose up -d
   ```

   Ou, para executar sem Docker:

   ```
   npm start
   ```

## Link da documentação

A coleção do postman pode ser importada pelo link
[backend-challenge-collection.json](https://api.postman.com/collections/31387001-f10906ca-0a16-4436-8923-2d0f7f5657db?access_key=PMAT-01HJ7HCZT4ZZTTA56H96QRXGHM)
