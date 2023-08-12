import { FreshmenDetailsController } from '$lib/server/database/freshmen/controller';
import { HintsController } from '$lib/server/database/hint/controller';
import { prisma } from '$lib/serverUtils';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const { user } = locals;

	const freshmenId = user?.freshmenDetails?.id;

	if (!freshmenId) throw redirect(307, '/');

	const history = await FreshmenDetailsController(prisma).getUsedPasscodeByFreshmenId(freshmenId);

	return { history };
}) satisfies PageServerLoad;
