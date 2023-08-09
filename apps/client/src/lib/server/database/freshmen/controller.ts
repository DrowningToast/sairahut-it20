import { hintSlugIds } from '$lib/hintSlugIds';
import { TRPCError } from '@trpc/server';
import type { Prisma, PrismaClient } from 'database';

interface ISubmitPasscode {
	freshmenId: string;
	id: string;
}

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

	/**
	 * Get passcode by secret
	 */
	const getPasscodeBySecret = async (fresh: Prisma.PasscodeInstancesWhereUniqueInput) => {
		return await prisma.passcodeInstances.findUnique({
			where: fresh,
			include: {
				owner: true
			}
		});
	};

	const updatePasscodeInfo = async ({ freshmenId, id }: ISubmitPasscode) => {
		return await prisma.passcodeInstances.update({
			where: {
				id
			},
			data: {
				usedById: freshmenId
			}
		});
	};

	const getUsedPasscodeByFreshmenId = async (freshmenId: string) => {
		return await prisma.passcodeInstances.findMany({
			where: {
				usedById: freshmenId
			}
		});
	};

	const getRevealedHints = async (freshmenId: string) => {
		return await prisma.pair.findUnique({
			where: {
				freshmenDetailsId: freshmenId
			},
			select: {
				revealedHints: {
					select: {
						hint: {
							select: {
								hintSlugId: true,
								content: true,
								slug: true
							}
						}
					}
				},
				freshmenDetailsId: true
			}
		});
	};

	const createRevealedHint = async (freshmenId: string) => {
		const query = await prisma.pair.findUnique({
			where: {
				freshmenDetailsId: freshmenId
			},
			select: {
				revealedHints: true,
				freshmenDetailsId: true,
				sophomoreDetailsId: true,
				id: true,
				freshmen: {
					select: {
						usedPasscodes: true
					}
				}
			}
		});

		if (query?.revealedHints.length === 10) {
			throw new TRPCError({
				message: 'No more hints can revealed',
				code: 'BAD_REQUEST'
			});
		}

		if (
			query?.freshmen.usedPasscodes.length == 0 &&
			query?.freshmen.usedPasscodes.length % 5 !== 0
		) {
			throw new TRPCError({
				message: 'Cannot revealed hints',
				code: 'BAD_REQUEST'
			});
		}

		const hintIndex = query?.revealedHints.length || 0;

		await prisma.revealedHintInstances.create({
			data: {
				hintsHintSlugId: hintSlugIds[hintIndex],
				hintsSophomoreId: query?.sophomoreDetailsId as string,
				pairId: query?.id as string
			}
		});
	};

	const getFreshmenById = async (id: string) => {
		return await prisma.freshmenDetails.findUnique({
			where: {
				id
			},
			include: {
				scannedQrs: {
					include: {
						owner: true
					}
				},
				usedPasscodes: {
					include: {
						owner: true
					}
				}
			}
		});
	};

	return {
		createFreshmenDetails,
		incrementFreshmenBalance,
		getPasscodeBySecret,
		updatePasscodeInfo,
		getUsedPasscodeByFreshmenId,
		getRevealedHints,
		createRevealedHint,
		getFreshmenById
	};
};
