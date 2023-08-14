import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { trpcOnServer } from '$lib/trpc';

export const load = (async ({ locals, fetch }) => {
	const { user } = locals;
	if (!user?.freshmenDetails?.id) throw redirect(307, '/');
	if (!user?.freshmenDetails?.vip) throw redirect(307, '/');

	const trpc = trpcOnServer(fetch);

	const res = await trpc.freshmens.checkReachMilestone.query();

	return { ...res, user: locals.user };
}) satisfies PageServerLoad;
