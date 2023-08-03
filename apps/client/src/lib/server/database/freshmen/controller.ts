import type { Prisma, PrismaClient } from 'database';

export const FreshmenDetailsController = (prisma: PrismaClient) => {
	const createFreshmenDetails = (fresh: Prisma.FreshmenDetailsCreateInput) => {
		// insert data into the db
		return prisma.freshmenDetails.create({
			data: {
				...fresh
			}
		});
	};

	const incrementFreshmenBalance = (fresh: Prisma.FreshmenDetailsWhereUniqueInput, balance = 1) => {
		// increment freshment balance
		return prisma.freshmenDetails.update({
			where: fresh,
			data: {
				user: {
					update: {
						balance: {
							increment: balance
						}
					}
				}
			}
		});
	};

	return {
		createFreshmenDetails,
		incrementFreshmenBalance
	};
};
