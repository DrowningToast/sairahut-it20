import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { SophomoreDetailsController } from '$lib/server/database/sophomore/controller';
import { prisma } from '$lib/serverUtils';

export const load = (async ({ locals }) => {
	const { user } = locals;

	const sophomoreId = user?.sophomoreDetails?.id;
	if (!sophomoreId) throw redirect(307, '/');

	const history = await SophomoreDetailsController(prisma).getUsedPasscodesByOwnerId(sophomoreId);

	return { history };
}) satisfies PageServerLoad;
