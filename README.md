<div align="center">
    <a href="https://github.com/kaikbomfim/PizzaHub-Backend" target="_blank">
        <img src="./public/logo.png" 
        alt="Logo" width="300" height="300">
    </a>
</div>

<div align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=50&duration=3000&pause=200&color=F7B062FF&center=true&vCenter=true&multiline=true&random=false&width=435&height=100&lines=PizzaHub"> 
</div>

<h2 align="center">Experimente o sabor irresistível da perfeição, com pizzas artesanais que conquistam corações e paladares.</h2>

### Visão Geral

API REST desenvolvida para atender às demandas de um aplicativo mobile voltado para a listagem e exibição de informações detalhadas sobre pizzas. Este projeto foi criado como parte de uma atividade acadêmica, com o objetivo de explorar tecnologias modernas e boas práticas no desenvolvimento de sistemas escaláveis

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

### 🛠️ Instalação e Configuração

O sistema foi projetado para ser executado via **Docker**, proporcionando maior portabilidade e facilidade na configuração. Para iniciar a instalação, é necessário obter uma cópia local do código-fonte. Isso pode ser feito utilizando o comando:

```bash
git clone https://github.com/kaikbomfim/PizzaHub-Backend
```

Após clonar o repositório, é preciso criar um arquivo `.env` baseado no modelo disponível em `.env.example`, especificando os seguintes valores:

- `DATABASE_URL` — O caminho para o banco de dados;
- `PORT` — A porta na qual a aplicação será executada.

Com o arquivo `.env` configurado, o servidor pode ser executado com o comando:

```bash
docker compose up
```

Para encerrar a execução, utilize:

```bash
docker compose down
```

### 🧪 Cobertura de Testes

O servidor conta com testes unitários que validam suas principais funcionalidades implementadas na camada de serviço. Para executar os testes, utilize o comando:

```bash
npm run test
```

### ⚖️ Licença

Este repositório adota a **Licença MIT**, permitindo o uso e a modificação do código como desejar. Peço apenas que seja dado o devido crédito, reconhecendo o esforço e o tempo investidos no desenvolvimento.
