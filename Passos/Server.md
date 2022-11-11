<p align="center">
  <img src="../mobile/src/assets/logo.svg" alt="Next Level Week Copa Logo"/>
</p>

# Passo a Passo 
### Todos os comandos e instalações necessários para o projeto do server .

# Server-(Backend)
### Setup

- Iniciando um projeto:
```bash
npm init -y
```
- Utilizar o typescript no projeto:
```bash
npm i typescript -D
```
criar o config.json:
```bash
npx tsc --init
```
em config.json modificar o "target" para es2020

#### Fastify
- Instalação:
```bash
npm i fastify 
```
- Criar uma pasta de nome SRC.
dentro de SRC criar um arquivo de nome server.ts

- Importar o Fastfy:
```bash
import Fastify from "fastify";
```
- Criar uma função:
```bash
 fastify.get('/pools/count', () => {

        return {count: 0}
    });
```
- Criar servidor:
  
 ```bash
 const fastify = Fastify({
        logger:true,
    })
```
- Definir a porta que a aplicação irá rodar:
```bash
await fastify.listen({port:3333, host:'0.0.0.0'})
```
- Converter o server de typescipt para js:
```bash
npx tsc
// Rodar o server
node src/server.js
```
- Para não ser necessário fazer o método anterior iremos utilizar a bliblioteca tsx que compila o código e executa
  automaticamente:
  
```bash
npm i tsx -D
```
Deletar o arquivo server.js caso vc tenha criado.

- no arquivo package.json modificar o script de "test" para "dev"

e por o arquivo para executar
  
```bash
"dev": "tsx src/server.ts"
```
- Rodar o servidor:
```bash
npm run dev
```
#### Criar as rotas dentro de server.ts.
- Contagem de bolões
  
```bash
 // Rota dos bolões
    // https://localhost:3333/pools/count
    fastify.get('/pools/count',async ()=>{
        const count= await prisma.pool.count();
        return {count}
    });
```
- No arquivo package.json modificar o "Scripts" inserindo o watch para atualizar sozinho o servidor :
 ```bash
"dev": "tsx watch src/server.ts"
```
---
#### Prisma
[- Veja a documentação do prisma aqui.](http://bit.ly/3fuYWoN)

- Instalação do prisma:
```bash
npm i prisma -D
```
- Instalação da dependência de produção do prisma:
```bash
npm i @prisma/client
```
- rodar o seguinte comando para utilizar como banco de dados o SQLite, por padrão o prisma utiliza o Postgree como banco de dados.
```bash
npx prisma init --datasource-provider SQLite
```
No VSCode instalar a extensão prisma.

no arquivo schema.prisma é onde ficará definido as tabelas do banco de dados.
#### Banco de dados
- Criar tabela de contagem de bolões.
cada tabela no prisma é uma model

exemplo da tabela utilizada com os campos definidos:
```bash
model Pool{
  id String @id @default(cuid())
  title String
  code String @unique
  createdAt DateTime @default(now())
  ownerId   String?
  Participants Participant[]
  owner        User?         @relation(fields: [ownerId], references: [id])
}
```
@id na model da tabela é a chave primária.

- Para gerar strings únicas na em um capo na tabela usar o seguinte código na tabela:
```bash
@default(cuid())
```
o @unique é usado para determinar um campo único na tabela, isso garante á não inserção de 2 códigos iguais na tabela.

- Anotar a data de que quando um dado foi inserido na tabela: 
```bash
createdAt DateTime @default(now())
```
Gerar uma migration(é o versionamento do banco de dados)
```bash
npx prisma migrate dev
```
Dar o nome para a migrate, exemplo: create table pools.
após rodar o comando anterior o prima cria a pasta migrations, que contém as migrations feitas.

Para vizualizar o banco de dados rodar o comando:
```bash
npx prisma studio
```
#### Diagrama ERD

- Para retornar o log de todas as tabelas que estão no banco de dados colocar em server.ts:
```bash
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient({
    log:['query'],
})
```
- Contagem de bolões
```bash
 fastify.get('/pools/count',async ()=>{
        const count= await prisma.pool.count();
        return {count}
    });
```
- Instalar a bliblioteca Prisma ERD Generator juntamente com a bliblioteca mermaid para heração de diagramas :
```bash
npm i prisma-erd-generator @mermaid-js/mermaid-cli -D
```

- No arquivo schema,prisma passar o código do gerador ERD:
```bash
// abaixo pode-se configurar o thema do arquvo gerado também, colocando theme = ""
generator erd {
   provider = "prisma-erd-generator"
}
```
- Rodar o comando para gerar o arquivo .SVG do diagrama do banco de dados:
```bash
npx prisma generate
```
após gerado o .SVG abrir o arquivo no navegador para a vizualização.

---
# Web
# Setup Frontend
- React, Nextjs, e número de bolões.
- Instalar a bliblioteca: 
```bash
npm install @fastify/cors
```
a bliblioteca cors é utilizada para definição de quais aplicações estarão aptas a consumir os dados do backend,
é uma medida de segurança para a aplicação.

- Configurando o cors, 1° fazer o import e depois incluindo na função do arquivo server.ts:

```bash
import cors from '@fastify/cors'

// usar dentro da função true no ambiente de produção e quando for fazer o deploy
// incluir o dominio em origin: 'https://meusite.com.br'
await fastify = Fastify({
    origin: true,
})
```
- Para funcionar no androi é necessário incluir o host no arquivo server.ts:
```bash
await fastify.listen({port:3333, host:'0.0.0.0'})
```
# WEB
### Frontend com react
- Começamos criando o projeto com o framwork react, o [NEXT.](http://bit.ly/3Um6QA5):
```bash
npx create-next-app@latest --use-npm
```
dar o nome do projeto de web, e está criado.
após criado deletar alguns arquivos como: readme,arquivos .css, .icon e .svg.
deletar pasta api.

trocar a extensão do arquivo _app.js para _app.tsx e index também.
apagar todoas as importações no arquivo _app.tsx e por:

```bash
export default function Home(){
    return (
        <h1>Hello world</h1>
    )
}
```
rodar a aplicação:

```bash
npm run dev
```
---

# Aula-02.

#### Continuando o backend.
- Estruturas do banco e relacionamento.
Criar novas models.
As estruturas de relacionamento é feita incluino o nome do que vai ser relacionado:
```bash
game Game
```
após relacionar com outra model e salvar cria-se o relacionamento automático.
```bash
  game        Game        @relation(fields: [gameId], references: [id])
```
Após criado as novas models e relacionamento entre elas rodar o comando:
```bash
npx prisma migrate dev
```
Colocar o nome: create db structure

Abrir p prisma studio:
```bash
npx prisma studio
```
- Criando seed do banco de dados.
Criando o SEED(Pré popula o banco de dados, com dados fictícios)
dentro da pasta prisma crie o arquivo de nome seed .ts, e criar usuário fictício de acordo com o video....
exemplo:
```bash
import { PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data:{
            name:'John Doe',
            email:'john.doe@gmail.com',
            avatarUrl: 'https://github.com/Lucas-Ed.png'
        }
    })

    const pool = await prisma.pool.create({
        data:{
            title:'Example Pool',
            code:'BOL123',
            ownerId:user.id,
            Participants:{
                create:{userId:user.id}
            }
        }
    })

    await prisma.game.create({
        data:{
            date:'2022-11-02T12:00:00.201Z',
            firstTeamCountryCode:'DE',
            secondTeamCountryCode:'BR',
        }
    })

    await prisma.game.create({
        data:{
            date:'2022-11-03T12:00:00.201Z',
            firstTeamCountryCode:'BR',
            secondTeamCountryCode:'AR',

            guesses:{
                create:{
                    firstTeamPoints:2,
                    secondTeamPoints:1,
                    participant:{
                        connect:{
                            userId_poolId:{
                                userId:user.id,
                                poolId:pool.id
                            }
                        }
                    }
                }
            }
        }
    })
}

main()

```


No console do navegador para descubrir o time stamp:
```bash
new Date().toISOString()
```
copiar mudando dia e hora.


Em package.json criar o campo a seed:
```bash
 "prisma": {
    "seed": "tsx prisma/seed.ts"
  },
```
colocar no banco os usuários da seed criada:
```bash
npx prisma db seed
```

Abrir p prisma studio:
```bash
npx prisma studio
```
- Criação de um novo bolão.

Criar as outras rotas no arquivo server.ts.
testar as rotas criadas com o insominia ou postman.

instalar blibliotecas:
ZOD(VALIDAÇÃO)
```bash
npm i zod
```
short-unique-id( cria um código automático para cada bolão criado!)
```bash
npm i short-unique-id
```
```bash

 const generate= new ShortUniqueId({length:6})
const code=String(generate()).toLocaleUpperCase(); 

  await prisma.pool.create({
            data:{
                title,
                code
            }
        })
```


- Contagem de usuários.
- Contagem de palpites.
# Aula-04.

#### Finalizando o backend


#### separando arquivos de rotas
Criar a pasta routes dentro de src, criar separações das rotas por recurso(entidade.)

- Sistema de Plugins
os arquivos onde ficará as rotas pecisa exportar uma função, exemplo:


```bash
export function poolsRoutes(){

    return()
}
```
porém a unção precisa receber o Fastify como parâmetro, ficara assim:
```bash
export function poolsRoutes(fastify){

    return()
}
```

separar a conexão do prisma em uma pasta de nome lib, com o arquivo de nome prisma .ts:
```bash
import {PrismaClient} from '@prisma/client'

export const prisma = new PrismaClient({
    log:['query'],
})
```

no arquivo da rota, exemplo a pools
temos que tupar a chamada do fastify, e ficará assim:
```bash
export async function poolRoutes(fastify: FastifyInstance){
  fastify.get('/pools/count', async () => {
    const count = await prisma.pool.count()

    return { count }
  })

```

para chamar a rota no arquivo server, junto com a importação:
```bash
import { poolRoutes } from "./routes/pool"

await fastify.register(poolRoutes)
```
#### Criação de usuário(Acsses Token Google)
Criar dentro da pasta routes um arquivo de nome auth

Validar entrada de dados dentro do backend por meio do

```bash
export async function authRoutes(fastify: FastifyInstance){
  fastify.post('/uers', async (request) =>{
    const createUserBody = z.object({
    
    })
   const {access_token:} = createUserBody.parse(request.body)
})
```

- Comunicar com a api:

```bash
 const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo',{
      method: 'GET',
      headers:{
        Authorization: `Bearer ${access_token}`,
      }
    })
<!-- Devolução das informações -->
const userData = await userResponse.json()
```
Devolução das informações :
```bash
      const userInfoSchema = z.object({
      id: z.string(),
      email: z.string().email(),
      name: z.string(),
      picture: z.string().url(),
})
```
```bash
   <!-- Validação -->
const userInfo = userInfoSchema.parse(userData)
```

- incluir no modelo de banco de dados a coluna com o id do google:
deixar ela como opcional(?) por que se tiver usuários sem esse campo dará conflito
```bash
googleId  String?  @unique
```
- Rodar a nova migração pro banco de dados:
```bash
npx prisma migrate dev
```
Procurar um usuário no banco de dados que exista, se não existir ele criará o usuário com o id d google:
```bash
let user = await prisma.user.findUnique({
      where:{
        googleId: userInfo.id,
      }
    })

    if(!user){
      user = await prisma.user.create({
        data:{
          googleId: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          avatarUrl: userInfo.picture,
        }
      })
    }

```
#### GERAÇÃO DE [JWT](jwt.io)

O Token JWT é criado dentro da aplicação e tem um tempo de validade, esse token é enviado pra toda requisção ao backend no período de validade, pra saber qual usuário está fazendo a requisição

Instalação blibliotecas:
```bash
 npm i @fastify/jwt
```
- No arquivo server(ARQUIVO RAÍZ) fazer o import do JWT:
```bash
import jwt from '@fastify/jwt'
```
- Passar as configurações do JWT:
```bash
 await fastify.register(jwt, {
    secret: 'nlwcopa',
  })
```

No final da rota de autenticação(arquivo auth), criar o token pro usuário:
```bash
const token = fastify.jwt.sign({
      name: user.name,
      avatarUrl: user.avatarUrl,
    },{
      sub: user.id,
      expiresIn: '7 days',
    })

    return {token}
  }
```
-Testar o a requisição com o Insomnia passando  na rota /users o accsses token 
```bash
{
    "accsses_token": "token aqui"
}
```
- Validar o JWT
```bash
 fastify.get('/me', async (request) => {
    await request.jwtVerify()
    return{ user: request.user 
  })
```
Testar no insominia!


Criar uma nome pasta plugins com o arquivo, authenticate.ts

```bash
import { FastifyRequest } from "fastify";

export async function authenticate(request: FastifyRequest){
  await request.jwtVerify()
}
```
Executar a rota do authenticate antes da rota padrão ser chamada:
```bash
  // Rota que retorna informações do usuário logado
  fastify.get('/me', {
      onRequest:[authenticate],
    }, async (request) => {
    return{ user: request.user 
  })
```
Testar no insomnia novamente !
<!-- #### Entrar em um bolão.

```bash

```
- Criar uma pasta de nome@types e um arquivo de nome fastify-jwt.d.ts, esse é um arquivo de definição de tipos do typescript.
  
```bash

```
#### Bolões que eu participo
```bash

```
```bash

```
```bash

```

#### Detalhes de um bolão
```bash

```
```bash

```
```bash

```
#### Listagem de jogos de um bolão
```bash

```
```bash

```
```bash

```
#### Criação de um palpite
```bash

```
```bash

```
```bash

``` -->