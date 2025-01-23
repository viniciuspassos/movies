# Movies API

> Uma API criada com NestJS para identificar filmes outliers a partir de um banco de dados hospedado na memória.

## 📖 Descrição

O objetivo desta API é gerenciar um banco de dados de filmes e identificar outliers com base em critérios específicos.  
O projeto utiliza **NestJS** para a estruturação e **SQLite** como banco de dados em memória, facilitando a execução e testes.

---

## 🛠️ Tecnologias utilizadas

- **NestJS**: Framework para construção de aplicações escaláveis.
- **TypeScript**: Linguagem principal do projeto.
- **SQLite**: Banco de dados leve e em memória.
- **TypeORM**: Ferramenta para modelagem e consultas ao banco.
- **Jest**: Framework para testes unitários e de integração.

---

## 🚀 Configuração do projeto

1. **Clone o repositório**

   ```bash
   git clone https://github.com/viniciuspassos/movies.git
   cd movies
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Inicie o servidor**

   - Para desenvolvimento:
     ```bash
     npm run start:dev
     ```
   - Para produção:
     ```bash
     npm run start:prod
     ```

4. **Como obter os filmes**

GET `http://localhost:3000/movies/outliers`: Retorna os filmes que receberam prêmios no maior e menor intervalo de tempo.

---

## 🔍 Execução de testes

Para garantir a qualidade do código, o projeto conta com diversos testes:

- **Testes end-to-end (E2E)**:

  ```bash
  npm run test:e2e
  ```

---

## 📚 Documentação

A documentação da API (se configurada com Swagger) pode ser acessada em:  
`http://localhost:3000/api`

---

## 📦 Estrutura do projeto

```plaintext
src
├── app.module.ts            # Módulo principal da aplicação
├── app.controller.ts
├── app.controller.spec.ts   # Módulo de testes
├── app.service.ts
├── main.ts
├── movies                   # Módulo de filmes
│   ├── movies.controller.ts # Controladores dos endpoints de filmes
│   ├── movies.service.ts    # Serviços relacionados à lógica de filmes
│   └── entities
└── ...
```

## 📝 Licença

Este projeto está sob a licença **MIT**. Consulte o arquivo [LICENSE](./LICENSE) para mais informações.
