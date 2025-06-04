# Projeto Leads MRV

Este projeto foi feito utilizando NextJS/React no frontend e NestJS no backend + SQL Server como banco de dados e interface ORM (TypeORM) para acesso no backend.

## Instalando o projeto

Execute os seguintes comandos:

1. Instalação das dependências

```sh
npm i
```

## Executando o projeto

1. Inicialização do container do SQL Server

```sh
docker-compose up -d
```

2. Migração dos dados iniciais para a base de dados

```sh
npm --prefix ./apps/backend npm run build | npx typeorm migration:run -d ./apps/backend/dist/shared/database/typeorm/data-source.js
```

3. E, finalmente, execute o projeto

```sh
npm run dev
```