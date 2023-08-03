import type { Prisma, PrismaClient } from 'database';

export const SophomoreDetailsController = (prisma: PrismaClient) => {
	const findUnique = (fresh: Prisma.FreshmenDetailsWhereUniqueInput) => {
		return prisma.sophomoreDetails.findUnique({
			where: fresh
		});
	};

	const findUniqueWithUser = (user: Prisma.UserWhereUniqueInput) => {
		return prisma.user.findUnique({
			where: user,
			select: {
				sophomoreDetails: true
			}
		});
	};

	const findMany = (searchQuery: Prisma.SophomoreDetailsFindManyArgs) => {
		return prisma.sophomoreDetails.findMany(searchQuery);
	};

	const updateOne = (searchQuery: Prisma.SophomoreDetailsUpdateArgs) => {
		return prisma.sophomoreDetails.update(searchQuery);
	};

	return { findUnique, findUniqueUserWithFresh: findUniqueWithUser, findMany, updateOne };
};
