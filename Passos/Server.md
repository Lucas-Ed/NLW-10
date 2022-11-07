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

#### Fastfy
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
npm i @fastify/cors
```
a bliblioteca cors é utilizada para definição de quais aplicações esarão aptas a consumir os dados do backend,
é uma medida de segurança para a aplicação.

- Configurando o cors, 1° fazer o import e depois incluindo na função do arquivo server.ts:

```bash
import cors from '@fastfy/cors'

// usar dentro da função true no ambiente de produção e quando for fazer o deploy
// incluir o dominio em origin: 'https://meusite.com.br'
await fastfy = Fastfy({
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
dentro da pasta prisma crie o aruivo de nom seed .ts e criar usuário fictício de acordo com o video....
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
short-unique-id( cri um código automático para cada bolõ criado!)
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

```bash

```
```bash

```
#### Criação de usuário(Acsses Token Google)
```bash

```
```bash

```
```bash

```
#### GERAÇÃO DE JWT
```bash

```
```bash

```
```bash

```
#### Validação de JWT
```bash

```
```bash

```
```bash

```
#### Rota e perfil
```bash

```
```bash

```
```bash

```
#### Criação de bolão com usuário logado
```bash

```
```bash

```
```bash

```

#### Entrar em um bolão.
```bash

```
```bash

```
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

```