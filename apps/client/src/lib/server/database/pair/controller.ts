import type { PrismaClient } from "database";

export const PairController = (prisma: PrismaClient) => {
    const getPairByFreshmenId = async (freshmenDetailsId: string) => {
        return await prisma.pair.findUnique({
            where: {
                freshmenDetailsId
            },
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
        getPairByFreshmenId
    }
}