import { generateRandomString } from '$lib/utils';
import type { Prisma, PrismaClient, SophomoreDetails } from 'database';

export const SophomoreDetailsController = (prisma: PrismaClient) => {
	const findUnique = (fresh: Prisma.SophomoreDetailsWhereUniqueInput) => {
		return prisma.sophomoreDetails.findUnique({
			where: fresh,
			include: {
				user: true
			}
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
		});
	};

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
		});
	};

	/**
	 *
	 * Only returns current user's active passcode
	 * returns undefined if there's none
	 *
	 * @param sop
	 * @returns
	 */
	const _getCurrentPasscode = async (sop: Prisma.SophomoreDetailsWhereInput) => {
		const passcode = await prisma.passcodeInstances.findFirst({
			where: {
				ownerId: sop.id,
				usedById: null
			}
		});

		return passcode;
	};

	/**
	 * Can only generte a new passcode, if the current one is used
	 * Sophomore cannot owns 2 or more passcodes at the same time
	 */
	const _generateNewPasscode = async (
		sop: Prisma.SophomoreDetailsWhereUniqueInput,
		secret: string
	) => {
		// check if the old one exists or not
		const currPasscode = await _getCurrentPasscode({
			id: sop.id
		});

		if (currPasscode) return currPasscode;

		return await prisma.passcodeInstances.create({
			data: {
				owner: {
					connect: sop
				},
				content: secret
			}
		});
	};

	/**
	 * Get current active sophomore passcode or generate a new one if the old one expires
	 *
	 * @param sop
	 * @returns
	 */
	const getSophomorePasscode = async (sop: Prisma.SophomoreDetailsWhereUniqueInput) => {
		// return current passcode if it's still alive,
		// if not, generate a new one
		const passcode = await prisma.passcodeInstances.findFirst({
			where: {
				owner: sop,
				usedById: null
			}
		});

		if (passcode) {
			return passcode;
		} else {
			return await _generateNewPasscode(sop, generateRandomString(6));
		}
	};

	const getSophomoreMagicVerse = async (sop: Prisma.SophomoreDetailsWhereUniqueInput) => {
		return await prisma.sophomoreDetails.findUnique({
			where: sop,
			select: {
				verses: true
			}
		});
	};

	return {
		findUnique,
		findUniqueUserWithFresh: findUniqueWithUser,
		findMany,
		updateOne,
		getUsedQRsByOwnerId,
		getUsedPasscodesByOwnerId,
		getSophomorePasscode,
		getSophomoreMagicVerse
	};
};
