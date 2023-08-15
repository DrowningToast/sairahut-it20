import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const freshmens = await prisma.todayResin.findMany()

    const freshmensWithPasscodePoints = freshmens.map((f) => {
        const passcodePoints =  40 - f.quota
        return { ...f, passcodePoints }
    })

    for (let { passcodePoints, freshmenDetailsId } of freshmensWithPasscodePoints) {
        await prisma.freshmenDetails.update({
            where: {
                id: freshmenDetailsId
            },
            data: {
                passcodePoints
            }
        })
    }
}

main()
    .catch(console.error)