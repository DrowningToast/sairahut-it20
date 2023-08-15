import { prisma } from '$lib/serverUtils';
import type { Prisma, PrismaClient } from 'database';
import { SophomoreDetailsController } from '../sophomore/controller';
import { UserController } from '../user/controller';
import { z } from 'zod';
import { FreshmenDetailsController } from '../freshmen/controller';

/**
 * V1
 * @returns
 */

export const getHintSlugs = async () => {
	const response = await prisma.hintSlugs.findMany({});
	return response;
};

export const submitHintSlugs = async (
	sophomoreDetailsId: string,
	data: Prisma.HintsCreateManyInput[]
) => {
	await prisma.$transaction([
		prisma.hints.createMany({
			data
		}),
		SophomoreDetailsController(prisma).updateOne({
			data: {
				hintsReady: true
			},
			where: {
				id: sophomoreDetailsId
			}
		})
	]);

	return 'OK';
};

// Check that hints is exist
export const checkHints = async (sophomoreDetailsId: string) => {
	const res = await SophomoreDetailsController(prisma).findUnique({
		id: sophomoreDetailsId
	});

	return res?.hintsReady;
};

export const submitHints = async (email: string, details: any) => {
	return await UserController(prisma).updateOne({
		data: details,
		where: {
			email
		}
	});
};

export const hintController = {
	getHintSlugs,
	submitHintSlugs,
	submitHints,
	checkHints
};

/**
 * V2
 */

export const HINT_PRICES = [0, 10, 10, 15, 15, 15, 20, 20, 25, 30, Infinity];
// export const HINT_PRICES = [0, 1, 2, 2, 3, 3, 3, 3, 3, 3, 999];

export const HintsController = (prisma: PrismaClient) => {
	const getHintPrices = async () => {
		return HINT_PRICES;
	};

	const getHintPrice = async (index: number) => {
		const range = z.number().min(0).max(9);

		if (!range.safeParse(index).success) return undefined;

		return HINT_PRICES[index];
	};

	const getHintByIndex = async (fresh: Prisma.FreshmenDetailsWhereUniqueInput, index: number) => {
		return (
			await prisma.pair.findUnique({
				where: {
					freshmenDetailsId: fresh.id
				},
				select: {
					sophomore: {
						select: {
							hints: true
						}
					}
				}
			})
		)?.sophomore.hints;
	};

	const revealHint = async (
		pair: Prisma.PairWhereUniqueInput,
		hintSlug: Prisma.HintSlugsWhereUniqueInput
	) => {
		const _ = await prisma.pair.findUnique({
			where: pair,
			select: {
				sophomoreDetailsId: true,
				id: true
			}
		});

		if (!_) throw new Error('PAIR NOT FOUND');

		const { id: pairId, sophomoreDetailsId } = _;

		return await prisma.revealedHintInstances.create({
			data: {
				hintsHintSlugId: hintSlug.slug!,
				hintsSophomoreId: sophomoreDetailsId,
				pairId
			}
		});
	};

	return {
		getHintPrices,
		getHintPrice,
		getHintByIndex,
		revealHint
	};
};
