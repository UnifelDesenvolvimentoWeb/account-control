# Repositório do projeto account-contro!

<details>
  <summary><strong>Para desenvolver</strong></summary><br />

  Uma aplicação de cadastro usuarios em que será possível cadastrar, visualizar, pesquisar, editar e excluir informações. Para isso você deverá:
  1. Desenvolver uma API de um `CRUD` (**C**reate, **R**ead, **U**pdate e **D**elete);
  2. Desenvolver alguns endpoints que irão ler e escrever em um arquivo utilizando o módulo `fs`.

</details>

# Orientações

<details>
  <summary><strong>Clonando o projeto e criando um PR</strong></summary><br />

  1. Clone o repositório

  - `git clone git@github.com:UnifelDesenvolvimentoWeb/account-control.git`.
  - Entre na pasta do repositório que você acabou de clonar:
    - `account-control`

  2. Crie uma branch a partir da branch `master`

  - Verifique que você está na branch `master`
    - Exemplo: `git branch`
  - Se não estiver, mude para a branch `master`
    - Exemplo: `git checkout master`
  - Agora crie uma branch à qual você vai submeter os `commits` do seu projeto
    - Você deve criar uma branch no seguinte formato: `nome-de-usuario-nome-do-projeto`
    - Exemplo: `git checkout -b maria-account-control`

  3. Faça alguma alteração ou algum requisito e depois adicione as mudanças ao _stage_ do Git e faça um `commit`

  - Verifique que as mudanças ainda não estão no _stage_
    - Exemplo: `git status` (deve aparecer listada a pasta em vermelho)
  - Adicione o novo arquivo ao _stage_ do Git
    - Exemplo:
      - `git add .` (adicionando todas as mudanças - _que estavam em vermelho_ - ao stage do Git)
      - `git status` (deve aparecer listado o arquivo que foi adicionado em verde)
  - Faça o `commit` inicial
    - Exemplo:
      - `git commit -m 'iniciando o projeto account-control'` (fazendo o primeiro commit)
      - `git status` (deve aparecer uma mensagem tipo _nothing to commit_ )

  4. Adicione a sua branch com o novo `commit` ao repositório remoto

  - Usando o exemplo anterior: `git push -u origin maria-account-control`

  5. Crie um novo `Pull Request` _(PR)_

  - Vá até a página de _Pull Requests_ do [repositório no GitHub](https://github.com/UnifelDesenvolvimentoWeb/account-control)
  - Clique no botão verde _"New pull request"_
  - Clique na caixa de seleção _"Compare"_ e escolha a sua branch **com atenção**
  - Clique no botão verde _"Create pull request"_
  - Adicione uma descrição para o _Pull Request_ e clique no botão verde _"Create pull request"_
  - Volte até a [página de _Pull Requests_ do repositório](https://github.com/UnifelDesenvolvimentoWeb/account-control) e confira que o seu _Pull Request_ está criado

</details>

<details>
  <summary><strong>Informações Adicionais</strong></summary><br />
  
  > Instale as dependências com `npm install`

  > O arquivo `src/users.json` será utilizado como base para fazer as requisições da API. As operações de leitura e escrita dos requisitos devem ser feitas nesse arquivo usando os métodos da biblioteca `fs`.

  > Há um arquivo `src/index.js` no repositório. Não remova, nele, o seguinte trecho de código:


```javascript
    app.get('/', (_request, response) => {
      response.status(HTTP_OK_STATUS).send();
    });
```

> Você pode usar o comando `npm run restore` para restaurar o arquivo `src/users.json` para seu estado inicial.

</details>

<details>
  <summary><strong>Durante o desenvolvimento</strong></summary><br />

  - Faça `commits` das alterações que você fizer no código regularmente

  - Os comandos que você utilizará com mais frequência são:
    1. `git status` _(para verificar o que está em vermelho - fora do stage - e o que está em verde - no stage)_
    2. `git add` _(para adicionar arquivos ao stage do Git)_
    3. `git commit` _(para criar um commit com os arquivos que estão no stage do Git)_
    4. `git push -u nome-da-branch` _(para enviar o commit para o repositório remoto na primeira vez que fizer o `push` de uma nova branch)_
    5. `git push` _(para enviar o commit para o repositório remoto após o passo anterior)_

</details>

<details>
  <summary><strong>Testes</strong></summary><br />

  ### Executando todos os testes

  Para poder executar os testes, inicie sua aplicação com `npm run dev`, em seguida, basta executar o comando `npm test` e **todos** os seus testes serão executados.

  ### Executando um teste específico

  Para executar um teste expecífico, inicie sua aplicação com `npm run dev`, em seguida, basta executar o comando `npm test nome-do-teste`.

  Ex: Para executar o teste referente ao **01-getAll**, basta digitar `npm test 01`.

</details>

# Requisitos

---

## 1 - Crie o endpoint GET `/users`

<details>
  <summary>A requisição deve retornar o <code>status 200</code> e um array com todas usuários cadastradas. Exemplo: </summary><br />

```json
[
  {
    "id": 1,
    "name": "Cristina Oliveira",
    "email": "cristina.oliveira@example.com",
    "password": "12345678",
    "age": 25,
    "info": {
      "city": "Salvador",
      "phoneNumber": "(71) 73265-0285"
    },
    "accessDate": {
      "registrationDate": "2023-08-15T11:20:31.665Z",
      "lastAccess": "2024-04-18T02:15:25.665Z"
    }
  },
  {
    "id": 2,
    "name": "Amanda Ferraz",
    "email": "amanda.ferraz@example.com",
    "password": "12345678",
    "age": 31,
    "info": {
      "city": "Belo Horizonte",
      "phoneNumber": "(31) 7256-5521"
    },
    "accessDate": {
      "registrationDate": "2024-01-28T16:19:20.665Z",
      "lastAccess": "2024-04-21T18:21:15.665Z"
    }
  },
  //...
]
```
  
</details>

<details>
  <summary>Caso não exista nenhum usuário cadastrado a requisição deve retornar o <code>status 200</code> e um array vazio. Exemplo:</summary><br />

  ```json
  []
  ```
</details>


## 2 - Crie o endpoint GET `/users/:id`

<details>
  <summary>A requisição deve retornar o <code>status 200</code> e um usuário com base no <code>id</code> da rota. Por exemplo, ao fazer uma requisição <code>/users/5</code>, a resposta deve ser:</summary><br />

  ```json
   {
    "id": 5,
    "name": "João Carlos",
    "email": "joão.carlos@example.com",
    "password": "12345678",
    "age": 38,
    "info": {
      "city": "Salvador",
      "phoneNumber": "(71) 7548-9655"
    },
    "accessDate": {
      "registrationDate": "2024-01-12T12:50:36.665Z",
      "lastAccess": "2024-04-21T12:20:41.665Z"
    }
  }
  ```
</details>


<details>
  <summary>Caso não seja encontrado um usuário com base no <code>id</code> da rota, a requisição deve retornar o <code>status 404</code> com o seguinte corpo:</summary><br />
  
  ```json
  {
    "message": "Usuário não encontrado"
  }
  ```
</details>

## 3 - Crie o endpoint POST `/login` e suas validações.

O endpoint deverá receber no corpo da requisição os campos `email` e `password`.

Deverá ocorrer uma validação se a senha e email estão corretos de acordo com os usuários já cadastrados.

Os campos recebidos pela requisição devem ser validados e, caso os valores sejam inválidos, o endpoint deve retornar o código de `status 400` com a respectiva mensagem de erro.

<details>
  <summary>As regras de validação são:</summary><br />

  - o campo `email` é obrigatório;
  - o campo `email` deve ter um email válido;
  - o campo `password` é obrigatório;
  - o campo `password` deve ter pelo menos 8 caracteres.

</details>

<details>
  <summary>O <strong>corpo da requisição</strong> deverá ter seguinte formato:</summary><br />

  ```json
  {
    "email": "email@email.com",
    "password": "12345678"
  }
  ```
</details>
  
<details>
  <summary>Os seguintes pontos serão avaliados:</summary><br />

 - Caso o campo `email` não seja passado ou esteja vazio, retorne um código de `status 400` com o seguinte corpo:

  ```json
  {
    "message": "O campo \"email\" é obrigatório"
  }
  ```

  - Caso o email passado não seja válido, retorne um código de `status 400` com o seguinte corpo:

  ```json
  {
    "message": "O \"email\" deve ter o formato \"email@email.com\""
  }
  ```

  - Caso o campo `password` não seja passado ou esteja vazio retorne um código de `status 400` com o seguinte corpo:

  ```json
  {
    "message": "O campo \"password\" é obrigatório"
  }
  ```

  - Caso a senha não tenha pelo menos 6 caracteres retorne um código de `status 400` com o seguinte corpo:

  ```json
  {
    "message": "O \"password\" deve ter pelo menos 8 caracteres"
  }
  ```

   - O endpoint deverá retornar um código de `status 401` com a mensagem "Email ou senha incorretos" caso o usuário não esteja nos registros ou infome email ou senha incorretos, retornando o seguinte corpo:

  ```json
  {
    "message": "Email ou senha incorretos"
  }
  ```
  
  - O endpoint deverá retornar um código de `status 200` com a mensagem "Login realizado com sucesso" e o seguinte corpo:

  ```json
  {
    "message": "Login realizado com sucesso"
  }
  ```
  
</details>

## 4 - Crie o endpoint POST `/users`

<details>
  <summary>Os seguintes pontos serão avaliados:</summary><br />

- O endpoint deve ser capaz de adicionar um novo usuário ao seu arquivo;

- O corpo da requisição deverá ter o seguinte formato:

  ```json
  {
    "name": "Josefa Bezerra",
    "email": "josefa.bezerra@example.com",
    "password": "12345678",
    "age": 62,
    "info": {
      "city": "Paulo Afonso",
      "phoneNumber": "(75) 7185-8565"
    },
  }
  ```

- O campo `name` deverá ter no mínimo 3 caracteres. Ele é obrigatório.

  - Caso o campo não seja passado ou esteja vazio retorne um código de `status 400`, com o seguinte corpo:

    ```json
    {
      "message": "O campo \"name\" é obrigatório"
    }
    ```

  - Caso o nome não tenha pelo menos 3 caracteres retorne um código de `status 400`, com o seguinte corpo:

    ```json
    {
      "message": "O \"name\" deve ter pelo menos 3 caracteres"
    }
    ```

- O campo `age` deverá ser um inteiro e apenas usuários maiores de idade (pelo menos `18 anos`) podem ser cadastrados. Ele é obrigatório.

  - Caso o campo não seja passado ou esteja vazio retorne um código de `status 400`, com o seguinte corpo:

    ```json
    {
      "message": "O campo \"age\" é obrigatório"
    }
    ```

  - Caso o usuário não tenha pelo menos 18 anos retorne `status 400`, com o seguinte corpo:

    ```json
    {
      "message": "O usuário deve ser maior de idade"
    }
    ```

  - O campo `info` deverá ser um objeto com as chaves `phoneNumber` e `city`:

  - O campo `info` é obrigatório.

      - Caso o campo não seja informado retorne `status 400`, com o seguinte corpo:

        ```json
        {
          "message": "O campo \"info\" é obrigatório"
        }
        ```
      
  - A chave `phoneNumber` é obrigatória.  

    - Caso a chave não seja informada ou esteja vazia retorne `status 400`, com o seguinte corpo:

      ```json
      {
        "message": "O campo \"phoneNumber\" é obrigatório"
      }
      ```

  - O campo `city` é obrigatório.  

    - Caso o campo não seja informado ou esteja vazio retorne `status 400`, com o seguinte corpo:

      ```json
      {
        "message": "O campo \"city\" é obrigatório"
      }
      ```
  
- Caso esteja tudo certo, retorne o `status 201`  e o usuário cadastrado.
  
- O endpoint deve retornar o `status 201` e o usuário que foi cadastrado, Ex:

  ```json
  {
    "id": 8,
    "name": "Josefa Bezerra",
    "email": "josefa.bezerra@example.com",
    "password": "12345678",
    "age": 62,
    "info": {
      "city": "Paulo Afonso",
      "phoneNumber": "(75) 7185-8565"
    },
  }
  ```

</details>


## 5 - Crie o endpoint PUT `/users/:id`

<details>
  <summary>Os seguintes pontos serão avaliados:</summary><br />

  - O endpoint deve ser capaz de editar um usuário com base no id da rota, sem alterar o id registrado.

  - O corpo da requisição deverá ter o seguinte formato:

    ```json
    {
      "name": "Rebeca Maria",
      "email": "rebeca.maria@example.com",
      "password": "12345678",
      "age": 34,
      "info": {
        "city": "Salvador",
        "phoneNumber": "(75) 7185-8565"
      },
    }
    ```

  - O campo `name` deverá ter no mínimo 3 caracteres. Ele é obrigatório.

    - Caso o campo não seja passado ou esteja vazio retorne um código de `status 400`, com o seguinte corpo:

      ```json
      {
        "message": "O campo \"name\" é obrigatório"
      }
      ```

    - Caso o nome não tenha pelo menos 3 caracteres retorne um código de `status 400`, com o seguinte corpo:

      ```json
      {
        "message": "O \"name\" ter pelo menos 3 caracteres"
      }
      ```

  - O campo `age` deverá ser um inteiro e apenas usuários maiores de idade (pelo menos `18 anos`) podem ser cadastrados. Ele é obrigatório.

    - Caso o campo não seja passado ou esteja vazio retorne um código de `status 400`, com o seguinte corpo:

      ```json
      {
        "message": "O campo \"age\" é obrigatório"
      }
      ```

    - Caso o usuário não tenha pelo menos 18 anos retorne `status 400`, com o seguinte corpo:

      ```json
      {
        "message": "O usuário deve ser maior de idade"
      }
      ```

  - O campo `info` deverá ser um objeto com as chaves `phoneNumber` e `city`:

    - O campo `info` é obrigatório.

        - Caso o campo não seja informado retorne `status 400`, com o seguinte corpo:

          ```json
          {
            "message": "O campo \"info\" é obrigatório"
          }
          ```
        
    - A chave `phoneNumber` é obrigatória.  

      - Caso a chave não seja informada ou esteja vazia retorne `status 400`, com o seguinte corpo:

        ```json
        {
          "message": "O campo \"phoneNumber\" é obrigatório"
        }
        ```

    - O campo `city` é obrigatório.  

      - Caso o campo não seja informado ou esteja vazio retorne `status 400`, com o seguinte corpo:

        ```json
        {
          "message": "O campo \"city\" é obrigatório"
        }
        ```
  - Caso esteja tudo certo, retorne o `status 200` e a usuário editada.
    - O endpoint deve retornar o `status 200` e o usuário que foi editado, Ex:

      ```json
      {
        "id": 1,
        "name": "Rebeca Maria",
        "email": "rebeca.maria@example.com",
        "password": "12345678",
        "age": 34,
        "info": {
          "city": "Salvador",
          "phoneNumber": "(75) 7185-8565"
        },
      }
      ```
     
     - Os dados atualizados por meio do endpoint deve ser persistidos no arquivo `users.json`.

</details>


## 6 - Crie o endpoint DELETE `/users/:id`

<details>
  <summary>Os seguintes pontos serão avaliados:</summary><br />

  - O endpoint deve deletar um usuário com base no id da rota. Devendo retornar o `status 204`, sem conteúdo na resposta.

</details>
  
## 7 - Crie o endpoint GET `/users/search?q=searchTerm`

<details>
  <summary>Os seguintes pontos serão avaliados:</summary><br />

  - O endpoint deve retornar um array de usuários que contenham em seu nome o termo pesquisado no queryParam da URL. Devendo retornar o `status 200`, com o seguinte corpo:

    ```
    /search?q=Jo
    ```

    ```json
    [
      {
        "id": 5,
        "name": "João Carlos",
        "email": "joão.carlos@example.com",
        "password": "12345678",
        "age": 38,
        "info": {
          "city": "Salvador",
          "phoneNumber": "(71) 7548-9655"
        },
        "accessDate": {
          "registrationDate": "2024-01-12T12:50:36.665Z",
          "lastAccess": "2024-04-21T12:20:41.665Z"
        }
      }
    ]
    ```

  - Caso `searchTerm` não seja informado ou esteja vazio, o endpoint deverá retornar um array com todos os usuários cadastrados, assim como no endpoint GET `/users`, com um `status 200`.

  - Caso nenhum usuário satisfaça a busca, o endpoint deve retornar o `status 200` e um array vazio.

  **Dica** é importante ter atenção se essa rota não entra em conflito com as outras, já que a ordem das rotas faz diferença na interpretação da aplicação

</details>
