import type { FreshmenDetails, PasscodeInstances, Prisma, PrismaClient } from 'database';

export const PasscodeController = (prisma: PrismaClient) => {
	/**
	 * Get passcode information
	 */
	const getPasscode = async (query: Prisma.PasscodeInstancesWhereUniqueInput) => {
		return prisma.passcodeInstances.findUnique({
			where: query,
			include: {
				owner: {
					select: {
						nickname: true,
						fullname: true,
						title: true,
						instagram_link: true,
						facebook_link: true,
						student_id: true,
						branch: true
					},
					include: {
						user: {
							select: {
								faction: {
									select: {
										name: true,
										handler: true
									}
								}
							}
						}
					}
				},
				usedBy: {
					select: {
						nickname: true,
						id: true
					}
				}
			}
		});
	};

	/**
	 * Mark that the following passcode has used by who (resulting in making it expires)
	 */
	const setAsUsed = (
		query: Prisma.PasscodeInstancesWhereUniqueInput,
		who: Prisma.FreshmenDetailsWhereUniqueInput
	) => {
		return prisma.passcodeInstances.update({
			where: query,
			data: {
				usedBy: {
					connect: who
				}
			}
		});
	};

	return {
		getPasscode,
		setAsUsed
	};
};
