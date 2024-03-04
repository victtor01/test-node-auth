# Teste Prático - Desenvolvedor Back-End

## Iniciar

Para iniciar a aplicação, precisa-se instalar todas as dependencias.

```bash
# install dependecies
npm install --save
# after run app
npm run dev
```

para iniciar o banco de dados ( sqlite ).

```bash
# migrations
npx prisma migrate dev --name [name-migration]

# show database
npx prisma studio
```

## Objetivos
- [x] Conexão com banco de dados
- [x] Criar controller de autenticação
- [x] Testar controller de autentição
    - [x] status 200
    - [x] status 400
    - [x] status 403
- [x] Criar usuário
- [x] Testar controller do usuário

## Infraestrutura

### Pastas

[`src`](./src/) | Tem como principal caracteristica guardar todos os arquivos do app, lá
dentro podemos encontrar as principais pastas do app.

[`database`](./src/database) | É a pasta onde há o [`index.ts`](./src/database/index.ts)
que guarda o **PrismaClient** para conexão com o banco de dados e fazer queries.

[`entities`](./src/entities) | Pasta onde fica localizado todas as entitidades do app.

[`repositories`](./src/modules/) | Essa pasta fica armazenada os controllers com os dtos da aplicação. Dentro da pasta [`user`](./src/modules/user/), por exemplo, temos o [`user-controller`](./src/modules/user/user-controller.ts) que tem o controller juntamente com as regras de negócio.

[`repositories`](./src/repositories/) | no repositories podemos colocar nossas interfaces e na pasta [`prisma`](./src/repositories/prisma/) temos nossas implementações das interfaces.

[`routes`](./src/routes/) | Temos todas as nossas rotas da aplicação.

[`providers`](./src/providers/) | A pasta providers como principal função guardar todos os nossos middlewares.

## Testes

### começar testes

Para começar os testes, certifica-se de ter instalado corretamente o jest.

```bash
npm i --save-dev
```

Agora para executar todos os testes basta digitar o comando abaixo.

```bash
npm run test
```

### Sobre os testes

Foram feito no total **7 testes**, dentre eles, teste de entidades, providers,

## Perguntas

### Porque colocar os testes 'misturados' com nosso código principal ?

Um dos motivos que escolhi para esse teste colocar os teste juntos foi porque sempre
estamos modificando, refatorando e melhorando todo o nosso código, então para ficar mais fácil,
pessoalmente, opto por deixar junto com nosso código. Lembremos sempre que essa opção pode não ser a adequada para todo projeto.

### Porque escolher sqlite como banco de dados ?

Como estamos falando de uma feature muito simples, foi optado por usar [sqlite](https://www.hostgator.com.br/blog/sqlite-o-que-e-como-funciona-e-qual-e-a-diferenca-entre-o-mysql/), porém, aconselho para apps mais complexos, é melhor usar outros bancos de dados mais seguros como, por exemplo, postgres e mysql.

## Melhorias

### uso de framerwork

<h2>Nest.js</h2>
Apresar de ser uma feature muito simples, é bom sempre pensar na melhoria de um sistema. Por isso, é necessário que os desenvolvedores façam um código limpo e bem estruturado. Dito isso, é muito provavel que esse app não vá ser escalado, ou seja, não seria necessário o uso de outras ferramentas com o Nest.js, porém para grandes projetos, se você quiser manter um app escalonável, seguro e que siga padrões mais rígidos, o framerwork Nest.js é uma boa ideia.

### Uso de outros ferramentas de teste

<!-- falar sobre supertest -->

### Separação de responsabilidades

Se você perceber bem, nossos controllers estão fazendo toda nossa lógica de negócios, porém isso não é adequado quando queremos um código limpo. Para melhorar isso, devemos sempre dividir as responsabilidades do sistema, o que poderiamos fazer é criar uma pasta de serviços e trazer toda nossa lógica de negócios para os mesmos.
