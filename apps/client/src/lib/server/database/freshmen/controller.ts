import type { Prisma, PrismaClient } from 'database';
import { HINT_PRICES, HintsController } from '../hint/controller';
import { factionIds } from '$lib/factionIds';

export const FreshmenDetailsController = (prisma: PrismaClient) => {
	const createFreshmenDetails = (fresh: Prisma.FreshmenDetailsCreateInput) => {
		// insert data into the db
		return prisma.freshmenDetails.create({
			data: {
				...fresh
			}
		});
	};

	/**
	 * Dangerous
	 */
	const getAllFreshmen = () => {
		return prisma.freshmenDetails.findMany();
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

	const getUsedPasscodeByFreshmenId = (freshmenId: string) => {
		return prisma.passcodeInstances.findMany({
			where: {
				usedById: freshmenId
			},
			select: {
				update_at: true,
				owner: {
					select: {
						branch: true,
						nickname: true,
						student_id: true,
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
				}
			}
		});
	};

	const getRevealedHints = async (fresh: Prisma.FreshmenDetailsWhereUniqueInput) => {
		return (
			(
				await prisma.freshmenDetails.findUnique({
					where: fresh,
					select: {
						pair: {
							select: {
								revealedHints: {
									select: {
										hint: {
											select: {
												slug: {
													select: {
														displayName: true,
														slug: true
													}
												},
												content: true
											}
										}
									}
								}
							}
						}
					}
				})
			)?.pair?.revealedHints.map((hint) => hint.hint) ?? []
		);
	};

	const getAllHints = async (fresh: Prisma.FreshmenDetailsWhereUniqueInput) => {
		return (
			await prisma.freshmenDetails.findUnique({
				where: fresh,
				select: {
					pair: {
						select: {
							sophomore: {
								select: {
									hints: {
										select: {
											slug: true,
											revealedHintInstances: true
										}
									}
								}
							}
						}
					}
				}
			})
		)?.pair?.sophomore.hints;
	};

	const increasePasscodePoints = (fresh: Prisma.FreshmenDetailsWhereUniqueInput, amount = 1) => {
		return prisma.freshmenDetails.update({
			where: fresh,
			data: {
				passcodePoints: {
					increment: amount
				}
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

	const getNextHintPrice = async (fresh: Prisma.FreshmenDetailsWhereUniqueInput) => {
		const revealedHints = (await getRevealedHints(fresh)) ?? [];
		const index = revealedHints.length;
		if (index >= HINT_PRICES.length) return Infinity;
		const price = (await HintsController(prisma).getHintPrice(index)) ?? Infinity;
		return price;
	};

	const decrementPasscodePoint = (fresh: Prisma.FreshmenDetailsWhereUniqueInput, amount = 1) => {
		return prisma.freshmenDetails.update({
			where: fresh,
			data: {
				passcodePoints: {
					decrement: amount
				}
			}
		});
	};

	const revealNextHint = async (fresh: Prisma.FreshmenDetailsWhereUniqueInput) => {
		// get revealed hints
		const revealedHints = await getRevealedHints(fresh);
		const nextIndex = revealedHints.length;
		if (nextIndex >= 10) throw new Error('HINT INDEX EXCEEDING 10');

		// get all hints
		const hints = (await getAllHints(fresh)) ?? [];
		if (hints.length > 1) hints.sort((a, b) => a.slug.index! - b.slug.index!);

		if (hints?.length <= 0) throw new Error('HINTS NOT FOUND');
		const nextHint = hints[nextIndex];

		// create a reveal instance
		const revealed = await HintsController(prisma).revealHint(
			{ freshmenDetailsId: fresh.id },
			{
				slug: nextHint.slug.slug
			}
		);

		return revealed;
	};

	const updateEasterEggStatusById = async (freshmenId: string) => {
		for (const factionId in factionIds) {
			const count = await prisma.passcodeInstances.count({
				where: {
					usedById: freshmenId,
					owner: {
						user: {
							factionId
						}
					}
				}
			})

			if (count == 0) {
				return false
			}
		}

		await prisma.freshmenDetails.update({
			where: {
				id: freshmenId,
			},
			data: {
				easterEgg: true
			}
		})
		
		return true
	}

	return {
		createFreshmenDetails,
		incrementFreshmenBalance,
		getAllFreshmen,
		getUsedPasscodeByFreshmenId,
		getRevealedHints,
		increasePasscodePoints,
		getAllHints,
		getFreshmenById,
		getNextHintPrice,
		decrementPasscodePoint,
		revealNextHint,
		updateEasterEggStatusById
	};
};
