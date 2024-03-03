# Teste Prático - Desenvolvedor Back-End

## Iniciar
Para iniciar a aplicação, precisa-se instalar todas as dependencias
```bash
#instale as dependencias
> npm install --save
#depois de ter instalado
> npm run dev
```

## Infraestrutura
### Pastas

A **pasta** [`src`](./src/) | Tem como principal caracteristica guardar todos os arquivos do app, lá 
dentro podemos encontrar as principais pastas do app.

- [`database`](./src/database) | É a pasta onde há o [`index.ts`](./src/database/index.ts) 
que guarda o **PrismaClient** para conexão com o banco de dados e fazer queries.

- [`entities`](./src/entities) | Pasta onde fica localizado todas as entitidades do app.

- [`repositories`](./src/modules/) | Essa pasta fica armazenada os controllers com os dtos da aplicação. Dentro da pasta [`user`](./src/modules/user/), por exemplo, temos o [`user-controller`](./src/modules/user/user-controller.ts) que tem o controller juntamente com as regras de negócio.

- [`repositories`](./src/repositories/) | no repositories podemos colocar nossas interfaces e na pasta [`prisma`](./src/repositories/prisma/) temos nossas implementações das interfaces.

- [`routes`](./src/routes/) | Temos todas as nossas rotas da aplicação.

## Demonstração

## Perguntas


## Motivos
*Porque dividir*


## Melhorias
Apresar de ser um teste muito simple, é bom sempre pensar na melhoria de um sistema. Por isso,
é necessário que os desenvolvedores, façam um código limpo e estruturado.