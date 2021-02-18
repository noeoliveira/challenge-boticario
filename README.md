# Challenge - O Boticário -BackEnd <a id="comeco" />

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=noeoliveira_projeto-grupo-boticario&metric=alert_status)](https://sonarcloud.io/dashboard?id=noeoliveira_projeto-grupo-boticario) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=noeoliveira_projeto-grupo-boticario&metric=coverage)](https://sonarcloud.io/dashboard?id=noeoliveira_projeto-grupo-boticario)

- Autor: Noé Oliveira
- Desafio: “Eu revendedor `O Boticário` quero ter benefícios de acordo com o volume de vendas”.

Este projeto tem o objetivo de propor uma resolução do desafio indicado pelo Grupo Boticário, a fim de demonstrar minhas habilidades.

## Descrição do Projeto <a id="descricao" />

A oportunidade proposta é criar um sistema de Cashback, onde o valor será disponibilizado como crédito para a próxima compra da revendedora no Boticário;
Cashback quer dizer “dinheiro de volta”, e funciona de forma simples: o revendedor faz uma compra e seu benefício vem com a devolução de parte do dinheiro gasto.

Sendo assim o Boticário quer disponibilizar um sistema para seus revendedores(as) cadastrarem suas compras e acompanhar o retorno de cashback de cada um.

## Lista de conteúdos <a id="lista-de-conteudo" />

<!--ts-->

- [Começo](#comeco)
- [Descrição do Projeto](#descricao)
- [Lista de Conteúdo](#lista-de-conteudo)
- [Breve explicação](#explicacao)
- [Requisitos](#requisitos)
- [Libs](#libs)
- [Instalação](#instalacao)
  - [Após a inicialização](#init)
- [License](#license)
<!--te-->

## Breve explicação: <a id="explicacao"/>

Foi utilizado conceitos como `DRY - Don't Repeat Yourself`, `KISS - Keep It Simple, Stupid`, `Clean Architecture`, `SOLID` e `DDD - Domain Driven Design` para preservar a integridade de cada função que, por sua vez, faz com que cada função e/ou parte do back-end tenha uma tarefa bem delimitada e sem repetição de código. Cada rota tem seu arquivo separado afim de criar uma manutenção mais fácil, assim como foi utilizado o TypeORM para manutenção do banco de dados - com a grandiosa vantagem de aumentar a legibilidade do código e a performance das queries no banco.

Minha lógica para implementação de uso:

O revendedor, após se registrar, terá seu cashback cadastrado em meu sistema somado e, junto a isto, será somado o valor retornado pela API disponibilizada.

## Requisitos <a id="requisitos" />

- [x] Utilizado NodeJS;
- [x] Utilizado SQLite podendo utilizar outros bancos conforme o [TypeORM](https://typeorm.io);
- [x] Diferencial: Testes de unidade;
- [x] Diferencial: Teste de integração;
- [x] Diferencial: Autenticação por JWT;

## Libs <a id="libs" />

- [Express] - Estrutura da web minimalista, rápida e sem opinião para Node.js.
- [routing-controllers](https://github.com/typestack/routing-controllers) - Permite criar classes de controllers com métodos como ações que tratam de solicitações. Você pode usar `routing-controllers` com express.js ou koa.js .
- [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express) - Adiciona middleware ao seu aplicativo Express para servir a Swagger UI vinculada ao seu documento Swagger.
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme) - **JWT** (JSON Web Token) é um sistema de transferência de dados que pode ser enviado via POST ou em um cabeçalho HTTP (header)
- [Passaport](http://www.passportjs.org/) - Passaport é middleware de autenticação para Node.js . Extremamente flexível e modular, o Passport pode ser inserido em qualquer aplicativo da web baseado no Express de forma discreta .
- [TypeORM](https://typeorm.io) - é um ORM que pode ser utilizado em plataformas como o Node, Ionic, dentre outras, e que possibilita o desenvolvimento tanto com JavaScript como com TypeScript.
- [TSyringe](https://github.com/microsoft/tsyringe) - Recipiente de injeção de dependência leve para JavaScript / TypeScript
- [Node.js] - é um runtime de JavaScript construído no motor V8 JavaScript do Chrome .

## Instalação <a id="instalacao" />

O projeto foi construído sobre [Node.js](https://nodejs.org/) LTS.

Instale as dependências e dependências de desenvolvimento e inicie o servidor.

> **Importante! Verifique [aqui](.env.example) seu arquivo `.env` para a configuração de variáveis de ambiente estão devidamente configurado antes de continuar!**

# `Por usar como base o SQLite não é necessário criar nenhuma instância de DB`

```bash
npm install
npm run dev
```

Para executar todos os testes `npm run test`, caso deseje apenas os unitários `npm run test:unit` e apenas o de integração `npm run test:integration`

Para ambientes de produção...

```bash
npm install
npm run build
npm start
```

#### Após inicializar <a id="init" />

Com o start do servidor ele é inicializado por padrão na porta 3000, caso não tenha alterado no [.env](.env.example). É possível ver a documentação da api em qualquer browser na rota `/api-docs`. Vale ressaltar que algumas rotas possuem autenticação devendo receber no header o token devendo seguir o seguinte padrão `Authorization: Bearer **Token**`

exemplo: `Authorization: Bearer ZXhlbXBsbyBkZSB0ZXN0ZSBwYXJhIGRlbW9zdGFyIGEgYXBp`

## License <a id="license" />

MIT

**Free Software, Hell Yeah!**
