// Arquivo para popular banco de dados.

import { PrismaClient } from '@prisma/client'

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
        title: 'Example pool',
        code: 'BOL123',
        ownerId: user.id,
    
        participants:{
        create:{
            userId: user.id,
        } 
        }
    }
})

    await prisma.game.create({
    data:{
        date: '2022-11-11T12:01:00.670Z',
        firstTeamCountryCode: 'DE',
        secondTeamCountryCode: 'BR',
    }
})

    await prisma.game.create({
    data:{
        date: '2022-11-12T12:03:00.670Z',
        firstTeamCountryCode: 'BR',
        secondTeamCountryCode: 'AR',

        guesses:{
        create:{
        firstTeamPoints: 3,
        SecondTeamPoints: 1,

            participant:{
            connect:{
                userId_poolId: {
                userId: user.id,
                poolId: pool.id,
                }
            }
            }
        }
        }
    },
})
}
main()