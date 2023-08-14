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

	const getTotalResin = async (freshmen: Prisma.FreshmenDetailsWhereUniqueInput) => {
		return (
			await prisma.todayResin.aggregate({
				where: {
					freshmen: freshmen
				},
				_sum: {
					quota: true
				}
			})
		)._sum.quota;
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

	const decrementResin = async (instance: Prisma.FreshmenDetailsWhereUniqueInput) => {
		const target = await prisma.todayResin.findMany({
			where: {
				freshmen: {
					id: instance.id
				}
			},
			orderBy: {
				create_at: 'desc'
			}
		});

		const notZeroQuotaTarget = target.find((value) => value.quota > 0)

		// decrease the target quota
		await prisma.todayResin.update({
			where: { id: notZeroQuotaTarget?.id },
			data: {
				quota: {
					decrement: 5
				}
			}
		});
	};

	return {
		getLatestResinPool,
		decrementResin,
		getTotalResin,
		createResinPool
	};
};
