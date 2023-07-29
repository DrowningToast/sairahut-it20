import { prisma } from '$lib/serverUtils';
import type { Prisma } from 'database';

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
		prisma.sophomoreDetails.update({
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

export const submitHints = async (email: string, details: any) => {
	await prisma.user.update({
		data: details,
		where: {
			email,
		}
	});
}

export const hintController = {
	getHintSlugs,
	submitHintSlugs,
	submitHints
};
