import type { Prisma, PrismaClient } from 'database';

export const SophomoreDetailsController = (prisma: PrismaClient) => {
	const findUnique = (fresh: Prisma.SophomoreDetailsWhereUniqueInput) => {
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

	const getUsedQRsByOwnerId = async (ownerId: string) => {
		return await prisma.qRInstances.findMany({
			where: {
				ownerId,
				quota: {
					equals: 0
				}
			},
			include: {
				scannedBy: true
			}
		})
	}

	const getUsedPasscodesByOwnerId = async (ownerId: string) => {
		return await prisma.passcodeInstances.findMany({
			where: {
				ownerId,
				usedById: {
					not: null
				}
			},
			include: {
				usedBy: true
			}
		})
	}

	return {
		findUnique,
		findUniqueUserWithFresh: findUniqueWithUser,
		findMany,
		updateOne,
		getUsedQRsByOwnerId,
		getUsedPasscodesByOwnerId
	};
};
