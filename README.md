# Teste Prático - Desenvolvedor Back-End

## Início

Para iniciar a aplicação, é necessário instalar todas as dependências.

```bash
# install dependecies
npm install --save
# after run app
npm run dev
```

para iniciar o banco de dados ( SQLite ).

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
- [x] Criar controller do usuário
- [x] Testar controller do usuário

## Infraestrutura

### Pastas

[`src`](./src/) | Tem como principal característica armazenar todos os arquivos do aplicativo, onde encontramos as principais pastas do mesmo.

[`database`](./src/database) | Contém o arquivo `ìndex.ts`, que guarda o `PrismaClient` para conexão com o banco de dados e execução de queries.

[`entities`](./src/entities) | Pasta que contém todas as entidades do aplicativo.

[`modules`](./src/modules/) | Armazena os controllers com os DTOs da aplicação. Por exemplo, na pasta user, encontramos o user-controller, que possui o controller juntamente com as regras de negócio.

[`repositories`](./src/repositories/) | Nesta pasta, podemos colocar nossas interfaces, e na subpasta `prisma` temos as implementações das interfaces.

[`routes`](./src/routes/) | Temos todas as nossas rotas da aplicação.

[`providers`](./src/providers/) | A pasta providers como principal função guardar todos os nossos middlewares.

## Testes

### Iniciar testes

Para iniciar os testes, certifique-se de ter instalado corretamente o `Jest`.

```bash
npm i --save-dev
```

Agora, para executar todos os testes, basta digitar o comando abaixo.

```bash
npm run test
```

### Sobre os testes

Foram realizados `8 testes` no total, abrangendo entidades, providers, etc.

## Perguntas

### Porque colocar os testes 'misturados' com nosso código principal ?

Uma das razões para misturar os testes com o código principal é a facilidade de modificação, refatoração e melhoria contínua do código. Pessoalmente, opto por manter os testes junto com o código, considerando a natureza dinâmica do desenvolvimento. No entanto, essa abordagem pode não ser adequada para todos os projetos.

### Porque escolher SQLite como banco de dados ?

Para uma feature simples como esta, optamos por usar [SQLite](https://www.hostgator.com.br/blog/sqlite-o-que-e-como-funciona-e-qual-e-a-diferenca-entre-o-mysql/). No entanto, para aplicativos mais complexos, é aconselhável usar bancos de dados mais robustos, como o PostgreSQL ou MySQL, visando segurança e escalabilidade.

## Melhorias

### Uso de framerwork

#### Nest.js

Apresar de ser uma feature muito simples, é bom sempre pensar na melhoria de um sistema. Por isso, é necessário que os desenvolvedores façam um código limpo e bem estruturado. Dito isso, é muito provavel que esse app não vá ser escalado, ou seja, não seria necessário o uso de outras ferramentas com o Nest.js, porém para grandes projetos, se você quiser manter um app escalonável, seguro e que siga padrões mais rígidos, o framerwork Nest.js é uma boa ideia.

### Uso de outros ferramentas de teste

#### Supertest

Ao combinar o Supertest com o Jest, você pode criar testes robustos para suas APIs. O Jest oferece uma estrutura de teste completa, com suporte para testes assíncronos, assertions poderosas e um ambiente de teste isolado.

### Separação de responsabilidades

Se você perceber bem, nossos controllers estão fazendo toda nossa lógica de negócios, porém isso não é adequado quando queremos um código limpo. Para melhorar isso, devemos sempre dividir as responsabilidades do sistema, o que poderiamos fazer é criar uma pasta de serviços e trazer toda nossa lógica de negócios para os mesmos.

```typescript
class Controller {
  index(req: Request, res: Response) {
    // lógica de negócios.
  }
}
```

Para:

```typescript
class Controller {
  index(req: Request, res: Response) {
    return service(req, res);
  }
}
```

### AuthController

o `AuthController` está retornando somente um token, porém poderiamos melhorar isso retornando `Refresh Token` onde teriamos algumas vantagens com o `Refresh`

- Tem um tempo de vida mais longo.
- É usado para fazer o refresh no token usado para acessar apis privadas.
- É menos frequentemente transmitido pela rede, o que reduz a exposição a ataques de interceptação.

## Outras ferramentas

### Docker

Para projetos mais complexos e de maior envergadura, a incorporação do [Docker](https://www.docker.com) pode significativamente simplificar o processo de desenvolvimento e aprimorar a manutenção do código, especialmente quando trabalhando colaborativamente com outros desenvolvedores. O Docker proporciona ambientes isolados e consistentes, facilitando a reprodução do ambiente de desenvolvimento em diferentes máquinas, reduzindo assim possíveis conflitos e melhorando a eficiência no ciclo de vida do desenvolvimento.

### TypeORM

O [TypeORM](https://typeorm.io) é um framework de Object-Relational Mapping (ORM) para TypeScript e JavaScript. Ele facilita a interação com bancos de dados relacionais ao mapear objetos JavaScript para tabelas no banco de dados, permitindo assim uma transição mais suave entre a lógica de aplicação e o armazenamento de dados. Com suporte para diversos bancos de dados, o TypeORM oferece uma abordagem elegante e eficaz para lidar com operações de banco de dados, melhorando a legibilidade e a manutenção do código, enquanto proporciona flexibilidade no design do banco de dados. Incorporar o TypeORM em projetos pode simplificar significativamente o acesso e manipulação de dados, contribuindo para um desenvolvimento mais organizado e eficiente.
