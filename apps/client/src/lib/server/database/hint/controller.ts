import { prisma } from '$lib/serverUtils';
import type { Prisma } from 'database';
import { SophomoreDetailsController } from '../sophomore/controller';
import { UserController } from '../user/controller';

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
