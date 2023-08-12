import type { Prisma, PrismaClient } from 'database';

export const ResinController = (prisma: PrismaClient) => {
	/**
	 *
	 * @param freshmen
	 * @returns
	 */
	const getLatestResinPool = (freshmen: Prisma.FreshmenDetailsWhereUniqueInput) => {
		return prisma.todayResin.findFirst({
			where: {
				freshmen: freshmen
			},
			orderBy: {
				create_at: 'desc'
			}
		});
	};

	const getTotalResin = (freshmen: Prisma.FreshmenDetailsWhereUniqueInput) => {
		return prisma.todayResin.aggregate({
			where: {
				freshmen: freshmen
			},
			_sum: {
				quota: true
			}
		});
	};

	const createResinPool = (freshmen: Prisma.FreshmenDetailsWhereUniqueInput) => {
		return prisma.todayResin.create({
			data: {
				freshmen: {
					connect: freshmen
				}
			}
		});
	};

	return {
		getLatestResinPool,
		getTotalResin,
		createResinPool
	};
};
