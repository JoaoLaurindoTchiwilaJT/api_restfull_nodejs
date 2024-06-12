# Aplicativo de Candidatura JAPP

BackEnd do JAPP.

## Guia de Configuração do Projeto
Este guia destina-se a orientar sobre como configurar o projeto e garantir o funcionamento adequado das funcionalidades relacionadas ao tratamento dos dados dos usuarios que usam a plataforma.

### Configuração do Projeto

O projeto utiliza Node.js com Express para criar o servidor e manipular as requisições HTTP, e Mysql para armazenamento de dados .

### Rotas do Projeto

As principais rotas do projeto são:

- `/usuario`: Rotas relacionadas aos dois usuarios abaixo citados, tendo em conta a existencia de dois usuarios diferentes.
- `/empresa`: Rotas relacionadas aos dados da empresa.
- `/candidato`: Rotas relacionadas aos dados do candidato.
- `/vaga`: Rotas relacionadas as vagas das empresas.
- `/notificacao`: Rotas relacionadas as notificações dos usuarios.
- `/mensagem`: Rotas relacionadas as mensagens dos usuarios.
- `/upload`: Rotas relacionadas ao upload de arquivos.
- `/candidatura`: Rotas relacionadas a candidatura do candidato.
- `/pesquisar`: Rota para pesquisa de vaga.
- `/usuario/login`: Rota para login
- `/usuario/confirmar`: Rota para confirmar usuario
- `/arquivo/`: Rota para incersão de fotos de perfil e capa do usuario

### Executando o Projeto

Para executar o projeto localmente, siga estas etapas:

1. **Instale as Dependências:**
   - Execute `npm install` para instalar todas as dependências do projeto.

2. **Configure as Chaves de Segurança do E-mail:**
   - Substitua a senha de acesso à sua conta de e-mail pela chave de segurança gerada.

3. **Inicie o Servidor:**
   - Execute `npm start` para iniciar o servidor.
   - O servidor estará disponível em http://localhost:3000/ por padrão.

4. **Testando as Funcionalidades:**
   - Utilize um cliente HTTP, como Postman ou Insomnia, para testar as diferentes rotas e funcionalidades do projeto.

### Rotas do candidato
### 1. Cadastrar um candidato
- **Rota**: `POST http://localhost:3000/candidato/`
 **Descrição**: Permite que um candidato faça o seu cadastramento na plataforma.
- **Corpo da Requisição**: JSON contendo os dados do candidato.
  ```json
   {
   "nome": "João Tchiwila",
   "email": "joaolaurindotchiwilajt@gmail.com",
   "numero": "930248236",
   "senha": "joao@2004",
   "localidade":"2024/04/13",
   "cidade":"Luanda",
   "setor":"TI/Programação",
   "habilidades":"programador",
   "instituicao_formacao":"30 de Setembro",
   "data_nasc":"2004/09/21",
   "sobrenome": "Tchiwila"
   }
 ```
 ```
### 2. Buscar dados do candidato por ID passando o ID do usuario como parametro na URL  
- **Rota**: `GET http://localhost:3000/candidato/1`
 **Descrição**: Permite que um candidato busque os seus dados na plataforma.
- **Corpo da Requisição**: JSON contendo os dados do candidato que foram pedidos.
  ```json
    {
    "idusuario": 3,
    "nome": "Cristecpro",
    "email": "joaolaurindotchiwilajt@gmail.com",
    "numero": 930248236,
    "tipoUsuario": "candidato",
    "senha": "$2b$10$/SzxAUhL5.UAul2axJimv.WCsUtAnuOr7jI8qMHgc9ziyJTn2MbHu",
    "idcandidato": 2,
    "data_nasc": "2004/09/21",
    "localidade": "2024/04/13",
    "cidade": "Luanda",
    "setor": "TI/Programação",
    "habilidades": "programador",
    "instituicao_formacao": "30 de Setembro",
    "sobrenome": null,
    "sobre": "programador"
  }
 ```
 ```
### 3. Actualizar os dados do candidato por ID passando o ID do usuario como parametro na URL  
- **Rota**: `PUT http://localhost:3000/candidato/1`
 **Descrição**: Permite que um candidato actualize os seus dados na plataforma.
- **Corpo da Requisição**: JSON contendo os dados do candidato que foram pedidos.
  ```json
   {
      "data_nasc": "2004/09/21",
      "localidade": "2024/04/13",
      "cidade": "Luanda",
      "setor": "TI/Programação",
      "habilidades": "programador",
      "instituicao_formacao": "30 de Setembro",
      "sobrenome": "Tchiwila",
      "nome": "Cristecpro",
      "email": "joaolaurindotchiwilajt@gmail.com",
      "numero": 930248236,
      "tipoUsuario": "empresa",
      "senha": "Cristecpro"
   }
 ```
 ```
### 4. Eliminar candidato por ID passando o ID do usuario como parametro na URL  
- **Rota**: `DELETE http://localhost:3000/candidato/1`
 **Descrição**: Permite que um candidato elimine a sua conta na plataforma.
- **Corpo da Requisição**: Não é necessário o envio de dados no corpo da requisição.

### Rotas do empresa
### 1. Cadastrar uma empresa
- **Rota**: `POST http://localhost:3000/empresa/`
 **Descrição**: Permite que uma empresa faça o seu cadastramento na plataforma.
- **Corpo da Requisição**: JSON contendo os dados da empresa.
  ```json
   {
   "nome": "Cristecpro",
   "email": "joaolaurindotchiwilajt@gmail.com",
   "numero": "930248236",
   "senha": "joao@2004",
   "site":"https://www.youtube.com/watch?v=Jy93WgiXtzo&list=RDEstxoy6Knlg&index=27",
   "setor":"agricola",
   "localizacao":"Futungo"
   }
 ```
 ```
### 2. Buscar dados da empresa por ID passando o ID do usuario como parametro na URL  
- **Rota**: `GET http://localhost:3000/empresa/1`
 **Descrição**: Permite que uma empresa busque os seus dados na plataforma.
- **Corpo da Requisição**: JSON contendo os dados da empresa que foram pedidos.
  ```json
    {
    "idusuario": 2,
    "nome": "Cristecpro",
    "email": "joaolaurindotchiwilajt@gmail.com",
    "numero": 930248236,
    "tipoUsuario": "empresa",
    "senha": "$2b$10$4JTIeuOZIvJXiThsvwbTtusmJJGj9sh2qSjEecdLS0roW/y1Ddu42",
    "idempresa": 1,
    "localizacao": "Futungo",
    "site": "https://www.youtube.com/watch?v=Jy93WgiXtzo&list=RDEstxoy6Knlg&index=27",
    "setor": "agricola"
  }
 ```
 ```
### 3. Actualizar os dados do candidato por ID passando o ID do usuario como parametro na URL  
- **Rota**: `PUT http://localhost:3000/empresa/1`
 **Descrição**: Permite que uma empresa actualize os seus dados na plataforma.
- **Corpo da Requisição**: JSON contendo os dados da empresa que foram pedidos.
  ```json
   {
   "nome": "Cristecpro",
   "email": "joaolaurindotchiwilajt@gmail.com",
   "numero": "930248236",
   "senha": "joao@2004",
   "site":"https://www.youtube.com/watch?v=Jy93WgiXtzo&list=RDEstxoy6Knlg&index=27",
   "setor":"agricola",
   "localizacao":"Futungo"
   }
 ```
 ```
### 4. Eliminar candidato por ID passando o ID do usuario como parametro na URL  
- **Rota**: `DELETE http://localhost:3000/empresa/1`
 **Descrição**: Permite que um empresa elimine a sua conta na plataforma.
- **Corpo da Requisição**: Não é necessário o envio de dados no corpo da requisição.


### Rotas do usuario
### 1. Login do usuario
- **Rota**: `POST http://localhost:3000/usuario/login`
 **Descrição**: Permite que um usuario faça o login na plataforma.
- **Corpo da Requisição**: JSON contendo os dados da empresa.
  ```json
   {
   "contacto":"930248236", "ou também o email"
   "senha": "Teixeir"
   }
 ```
 ```
### 2. Confirmar usuario  
- **Rota**: `POST http://localhost:3000/usuario/confirmar`
 **Descrição**: Permite que um usuario confirme o codigo que lhe foi enviado no email pela plataforma Durante o cadastramento.
- **Corpo da Requisição**: JSON contendo os dados de confirmação do  usuario .
   ```json
   {
   "codigo": "6960"
   }
 ```
 ```

### Rota para cadastrar uma vaga
### 1. Cadastrar uma vaga passando o ID do usuario(empresa) via body
- **Rota**: `POST http://localhost:3000/vaga/`
 **Descrição**: Permite que uma empresa faça o  cadastramento de uma vaga na plataforma.
- **Corpo da Requisição**: JSON contendo os dados de cadastramento de uma vaga de uma determinada  empresa.
  ```json
   {
   "qtd_vaga" : "29" ,
   "titulo":"programadores front end",
   "descricao":"precisamos de programadores",
   "responsabilidades":"orientar uma equipe",
   "diferenciais":"ser licenciado",
   "beneficios":"remuneração",
   "experiencia":"4 anos",
   "tempo_trabalho":"integral",
   "salario":"2345,900",
   "idempresa":1
   }
 ```
 ```
### 2. Buscar dados de uma vaga de uma determinada  empresa por ID passando o ID do usuario como parametro na URL  
- **Rota**: `GET http://localhost:3000/vaga/1`
 **Descrição**: Permite que uma empresa busque os dados das vagas publicadas  na plataforma.
- **Corpo da Requisição**: JSON contendo os dados das vagas publicadas pela empresa.
  ```json
    [
    {
      "idvaga": 1,
      "qtd_vaga": 29,
      "data": "2024-04-18T23:00:00.000Z",
      "titulo": "programadores front end",
      "descricao": "precisamos de programadores",
      "responsabilidades": "orientar uma equipe",
      "diferenciais": "ser licenciado",
      "beneficios": "remuneração",
      "experiencia": "4 anos",
      "tempo_trabalho": "integral",
      "salario": 2345,
      "idempresa": 2
    }
  ]
 ```
 ```
### 3. Actualizar os dados da vaga publicadas pela empresa por ID passando o ID do usuario como parametro na URL  
- **Rota**: `PUT http://localhost:3000/vaga/1`
 **Descrição**: Permite que uma empresa actualize os dados das vagas publicadas na  na plataforma.
- **Corpo da Requisição**: JSON contendo os dados das vagas publicadas pela  empresa que seram actualizadas.
  ```json
    {
    "qtd_vaga" : "29" ,
    "titulo":"programadores front end",
    "descricao":"precisamos de programadores",
    "responsabilidades":"orientar uma equipe",
    "diferenciais":"ser licenciado",
    "beneficios":"remuneração",
    "experiencia":"4 anos",
    "tempo_trabalho":"tempo inteiro",
    "salario":"2345,900"
  }
 ```
 ```
### 4. Eliminar vaga por ID passando o ID do usuario como parametro na URL  
- **Rota**: `DELETE http://localhost:3000/vaga/1`
 **Descrição**: Permite que um empresa elimine uma vaga publicada na plataforma.
- **Corpo da Requisição**: Não é necessário o envio de dados no corpo da requisição.

### Rota para cadastrar uma candidatura
### 1. Cadastrar uma candidatura passando o ID do usuario(candidato) e o id da vaga via body
- **Rota**: `POST http://localhost:3000/candidatura/`
 **Descrição**: Permite que um candidato faça o candidatura a uma vaga na plataforma.
- **Corpo da Requisição**: JSON contendo os dados de candidatura de uma vaga para uma determinada  empresa.
  ```json
  {
  "idvaga": 1,
  "idcandidato": 1
  }
 ```
 ```
### 2. Buscar dados da candidatura de um determinado candidato por ID passando o ID do usuario como parametro na URL  
- **Rota**: `GET http://localhost:3000/candidatura/1`
 **Descrição**: Permite que uma empresa busque os dados da candidatura feitas pelo candidato  na plataforma.
- **Corpo da Requisição**: JSON contendo os dados das candidatura feitas pelo candidato pela empresa.
  ```json
    [
    {
      "idcandidatura": 3,
      "idcandidato": 3,
      "idvaga": 1,
      "estado": "Enviado",
      "data_envio": "2024/04/19",
      "qtd_vaga": 29,
      "data": "2024-04-18T23:00:00.000Z",
      "titulo": "programadores front end",
      "descricao": "precisamos de programadores",
      "responsabilidades": "orientar uma equipe",
      "diferenciais": "ser licenciado",
      "beneficios": "remuneração",
      "experiencia": "4 anos",
      "tempo_trabalho": "tempo inteiro",
      "salario": 2345,
      "idempresa": 1
    },
  ]
 ```
 ```
### 3. Actualizar os dados da candidatura feita  pelo  candidato por ID passando o ID da candidatura como parametro na URL  
- **Rota**: `PUT http://localhost:3000/candidatura/1`
 **Descrição**: Permite que uma empresa ou candidato actualize o estado da candidatura a uma vaga na plataforma.
- **Corpo da Requisição**: JSON contendo os dados da candidatura que sera actualizada quando o usuario(candidato) clica em cancelar e rejeitar(empresa) .
  ```json
  {
    "estado": "cancelada" /*ou "rejeitar" ou "aceitar"*/
  }
 ```
 ```
### 4. Eliminar vaga por ID passando o ID do usuario como parametro na URL  
- **Rota**: `DELETE http://localhost:3000/candidatura/1`
 **Descrição**: Permite que um empresa elimine uma vaga publicada na plataforma.
- **Corpo da Requisição**: Não é necessário o envio de dados no corpo da requisição.


### Rota de notificações
### 1. Buscar Notificação de um determinado usuario por ID passando o ID do usuario como parametro na URL 
- **Rota**: `GET http://localhost:3000/notificacao/1`
 **Descrição**: Permite que um candidato faça a busca das suas notificações  na plataforma.
- **Corpo da Requisição**: JSON contendo os dados de busca da notificação de um candidato na plataforma.Os valores que encontram se null como o estado identifica se a notificação foi lida, agora no caso do id_receptor estár null apenas é quando o tipo_notificacao para o candidato é vaga pois neste tipo de notificação é direcionada vagas aos usuarios de acordo as suas habilidades cadastradas  
  ```json
   [
   {
      "idnotificacao": 1,
      "tipo_notificacao": "vaga",
      "estado": null,
      "data": "2024/04/14",
      "descricao": "programadores front end",
      "id_emissor": 1,
      "id_receptor": null
   },
   {
      "idnotificacao": 2,
      "tipo_notificacao": "vaga",
      "estado": null,
      "data": "2024/04/14",
      "descricao": "programadores front end",
      "id_emissor": 2,
      "id_receptor": null
   },
   {
      "idnotificacao": 3,
      "tipo_notificacao": "mensagem",
      "estado": null,
      "data": "2024/04/14",
      "descricao": null,
      "id_emissor": 1,
      "id_receptor": 2
   }
   ]   
- **Rota**: `GET http://localhost:3000/notificacao/9`
 **Descrição**: Permite que uma empresa faça busca das suas notificações  na plataforma.
- **Corpo da Requisição**: JSON contendo os dados de busca da notificação de uma empresa na plataforma. Retornando assim dosi tipos de notificação para empresa tipo candidatura e mensagem  
  ```json
   [
  {
    "idnotificacao": 11,
    "tipo_notificacao": "candidatura",
    "estado": null,
    "data": "2024/04/15",
    "descricao": "Cristecpro enviou uma candidatura",
    "id_emissor": 2,
    "id_receptor": 9
  },
  {
    "idnotificacao": 12,
    "tipo_notificacao": "mensagem",
    "estado": null,
    "data": "2024/04/15",
    "descricao": "Cristecpro enviou uma mensagem",
    "id_emissor": 2,
    "id_receptor": 9
  }
   ]  
```
 ```
### 4. Eliminar notificação por ID passando o ID da notificação como parametro na URL  
- **Rota**: `DELETE http://localhost:3000/notificacao/9`
 **Descrição**: Permite que um empresa elimine uma vaga publicada na plataforma.
- **Corpo da Requisição**: Não é necessário o envio de dados no corpo da requisição.

### Rota de pesquisa
### 1. Buscar vagas de acordo a pesquisa de um determinado candidato  passando o valor da pesquisa via body 

- **Rota**: `GET http://localhost:3000/pesquisar/`
 **Descrição**: Permite que um candidato faça a busca de vagas na   na plataforma.
- **Corpo da Requisição**: JSON contendo os dados de busca da vaga .  
  ```json
    {
      "valor":"end"
    }
- **valor de retorno**: JSON contendo os dados da pesquisa
```json
  [
  {
    "idvaga": 1,
    "qtd_vaga": 29,
    "data": "2024/04/19",
    "titulo": "programadores front end",
    "descricao": "precisamos de programadores",
    "responsabilidades": "orientar uma equipe",
    "diferenciais": "ser licenciado",
    "beneficios": "remuneração",
    "experiencia": "4 anos",
    "tempo_trabalho": "tempo inteiro",
    "salario": 2345,
    "idempresa": 1
  },
  {
    "idvaga": 2,
    "qtd_vaga": 29,
    "data": "2024/04/19",
    "titulo": "programadores front end",
    "descricao": "precisamos de programadores",
    "responsabilidades": "orientar uma equipe",
    "diferenciais": "ser licenciado",
    "beneficios": "remuneração",
    "experiencia": "4 anos",
    "tempo_trabalho": "tempo inteiro",
    "salario": 2345,
    "idempresa": 2
  }
]
```

### Rota para upload de arquivo 
### 1. Upload de img de perfil ou capa  passando o tipo (perfil ou capa) e o ID do usuario via parametros na URL
- **Rota**: `POST http://localhost:3000/upload/perfil/1`
 **Descrição**: Permite que um usuario faça o upload de uma img para perfil ou capa  na plataforma.
- **Corpo da Requisição**: Form exemplificando o upload de img na plataforma, o nome do input deve ser file.
  ```json
    <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Upload de Arquivo</title>
  </head>
  <body>
      <h1>Upload de Arquivo</h1>
      <form id="uploadForm" enctype="multipart/form-data">
          <label for="fileInput">Selecione um arquivo:</label>
          <input type="file" id="file" name="file">
          <br>
          <button type="button" onclick="enviarArquivo()">Enviar</button>
      </form>
      <script>
            async function enviarArquivo() {
                  const formData = new FormData();
                  const fileInput = document.getElementById('fileInput');
                  formData.append('file', file.files[0]);

                  try {
                      const response = await fetch('/upload', {
                          method: 'POST',
                          body: formData
                      });
                      if (response.ok) {
                          alert('Arquivo enviado com sucesso!');
                      } else {
                          alert('Erro ao enviar arquivo.');
                      }
                  } catch (error) {
                      console.error('Erro ao enviar arquivo:', error);
                      alert('Erro ao enviar arquivo.');
                  }
            }
      </script>
  </body>
  </html>

 ```
 ```
### 2. Buscar img de perfil ou capa  passando o tipo (perfil ou capa) e o ID do usuario via parametro na URL
- **Rota**: `GET http://localhost:3000/upload/perfil/1`
 **Descrição**: Permite que um usuario busque a img do perfil ou capa da candidatura feitas pelo candidato  na plataforma.
- **Corpo da Requisição**: JSON contendo os dados da img pedida pelo usuario, retorna apenas uma img de acordo com a data de upload.O caminho da imagem já é retornado com o ip actual da maquina
  ```json
      [
    {
      "idarquivo": 1,
      "caminho": "http://192.168.0.12:3000/upload/perfil/1/1665393152414.jpg_1714263784699.jpg",
      "data": "2024/04/28",
      "tipo": "imagem",
      "extensao": ".jpg",
      "idMensagem": null,
      "idusuario": 1
    }
  ]
 ```
 ```
### 4. Eliminar img por nome passando o tipo (perfil ou capa) o id do usuario e o nome da img como parametro na URL  
- **Rota**: `DELETE http://localhost:3000/upload/perfil/1/1665393152414.jpg_1713609582341.jpg`
 **Descrição**: Permite que um usuario elimine uma img na plataforma.
- **Corpo da Requisição**: Não é necessário o envio de dados no corpo da requisição.


### Rotas da mensagem
### 1. Cadastrar uma mensagem
- **Rota**: `POST http://localhost:3000/mensagem/`
 **Descrição**: Permite que um candidato ou uma empresa  faça o envio da mensagem na plataforma.
- **Corpo da Requisição**: JSON contendo os dados da mensagem passando o idemissor(usuario que enviou) e o idreceptor(uuario que ira receber) na ordem emissor,receptor.
  ```json
  {
  "conteudo":"Bom dia Irmão",
  "idemissor": 3,
  "idreceptor": 2
  }
```
```
  **Rota**: `POST http://localhost:3000/mensagem/enviar/2/3`
 **Descrição**: Permite que um candidato ou uma empresa  faça o envio da mensagem do tipo arquivo na plataforma.
- **Corpo da Requisição**: formData contendo os dados da mensagem passando o idemissor(usuario que enviou) e o idreceptor(uuario que ira receber) por parametro na ordem emissor,receptor.
  ```formData
  {
  "arquivo": "objecto contendo os dados do arquivo"
  }
 ```
 ```
### 2. Buscar dados da mensagem enviada pelo usuario(candidato ou empresa)  passando o ID do emissor(usuario que enviou a solicitação da mensagem ao servidor) receptor(usuario que ira trocou a sms com o emissor) como parametro na URL na ordem emissor,receptor  
- **Rota**: `GET http://localhost:3000/mensagem/3/2`
 **Descrição**: Permite que um usuario busque os seus dados na plataforma.
- **Corpo da Requisição**: JSON contendo os dados da mensagem pedida pelo emissor(usuario que solicitou os dados ao banco de dados) que foram pedidos.
  ```json
      [
    {
      "idusuario": 3,
      "nome": "Tchiwila",
      "idmensagem": 5,
      "conteudo": "Bom dia Irmão",
      "data": "2024/04/27",
      "tipo": "texto",
      "idemissor": 3,
      "idreceptor": 2,
      "idarquivo": null,
      "caminho": null
    },
    {
      "idusuario": 3,
      "nome": "Tchiwila",
      "idmensagem": 6,
      "conteudo": "Bom dia Irmão",
      "data": "2024/04/28",
      "tipo": "texto",
      "idemissor": 3,
      "idreceptor": 2,
      "idarquivo": null,
      "caminho": null
    },
    {
      "idusuario": 3,
      "nome": "Tchiwila",
      "idmensagem": 8,
      "conteudo": null,
      "data": "2024/04/28",
      "tipo": "desconhecido",
      "idemissor": 2,
      "idreceptor": 3,
      "idarquivo": null,
      "caminho": null
    },
    {
      "idusuario": 3,
      "nome": "Tchiwila",
      "idmensagem": 9,
      "conteudo": null,
      "data": "2024/04/28",
      "tipo": "desconhecido",
      "idemissor": 3,
      "idreceptor": 2,
      "idarquivo": null,
      "caminho": null
    },
    {
      "idusuario": 3,
      "nome": "Tchiwila",
      "idmensagem": 10,
      "conteudo": null,
      "data": "2024/04/28",
      "tipo": "desconhecido",
      "idemissor": 3,
      "idreceptor": 2,
      "idarquivo": null,
      "caminho": null
    },
    {
      "idusuario": 3,
      "nome": "Tchiwila",
      "idmensagem": 11,
      "conteudo": null,
      "data": "2024/04/28",
      "tipo": "desconhecido",
      "idemissor": 3,
      "idreceptor": 2,
      "idarquivo": 1,
      "caminho": "http://192.168.0.12:3000/upload/mensagem/3/Imagem%20do%20WhatsApp%20de%202023-09-14%20%C3%83%C2%A0(s)%2011.23.03.jpg_1714266336756.jpg"
    }
  ]
 ```
 ```
### 3. Actualizar os dados da mensagem do usuario  passando o ID da mensagem como parametro na URL  
- **Rota**: `PUT http://localhost:3000/mensagem/5`
 **Descrição**: Permite que um usuario actualize as suas  mensagem na plataforma.
- **Corpo da Requisição**: JSON contendo os dados da mensagem que será actualizada pelo usuario, isso em sms de texto.
  ```json
  {
  "conteudo":"Bai Irmão"
  }
```
 ```
### 4. Eliminar mensagem   
- **Rota**: `DELETE http://localhost:3000/mensagem/3/1`
 **Descrição**: Permite que um usuario elimine uma mensagem  na plataforma.
- **Corpo da Requisição**: Não é necessário o envio de dados no corpo da requisição, apenas passe os seguintes dados na url o id do emissor(usuario) e da mensagem.

- **Rota**: `DELETE http://localhost:3000/mensagem/arquivo/3/Captura_de_EcrÃ£_(26).png_1714310590699.png`
 **Descrição**: Permite que um usuario elimine uma mensagem do tipo arquivo na plataforma.
- **Corpo da Requisição**: Não é necessário o envio de dados no corpo da requisição, apenas passe os seguintes dados na url o id do emissor(usuario) e o nome do arquivo a ser eliminado.
