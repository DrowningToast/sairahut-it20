import type { Prisma, PrismaClient } from "database";

export const PairController = (prisma: PrismaClient) => {
    const getPairByFreshmen = async (fresh: Prisma.FreshmenDetailsWhereUniqueInput) => {
        return await prisma.pair.findUnique({
            where: fresh,
            include: {
                freshmen: {
                    include: {
                        user: true
                    }
                },
                sophomore: {
                    include: {
                        user: true
                    }
                }
            }
        })
    }
    
    return {
        getPairByFreshmen
    }
}