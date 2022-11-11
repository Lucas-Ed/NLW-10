// Conexão da aplicação com o prisma.

import {PrismaClient} from '@prisma/client'

export const prisma = new PrismaClient({
    log:['query'],
})