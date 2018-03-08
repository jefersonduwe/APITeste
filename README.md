# APITeste
Bem vindo a APITeste, está API REST foi desenvolvida com o intuito de demonstrar minhas habilidades em NodeJS.

Para começar a usá-la, basta copiar o projeto para sua máquina, configurar um database no mongo e adicionar a conexão em config.js.

Existem duas entidades básicas na API:
- User, acessivel através da rota /users
- Product, acessivel através da rota /products

Primeiramente será necessário criar um usuário, através de /user (método POST).
Os atributos necessário para criação do mesmo são:
- name (string)
- email (string)
- password (string)

Após criado o usuário, poderá ser feito o login através de /users/authenticate. Será necessário enviar email e password dentro do JSON.

Após autenticação as demais rotas estarão acessíveis, sendo estas /users (Métodos GET, PUT e DELETE) e /produtcs

Para criação de Product os atributos necessários são:
- name (string)
- brand (string)
- price (number)

**Obrigado!**
