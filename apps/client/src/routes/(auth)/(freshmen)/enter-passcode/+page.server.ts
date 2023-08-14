import { trpcOnServer } from '$lib/trpc';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, locals }) => {
	const { user } = locals;

	const freshId = user?.freshmenDetails?.id;

	if (!freshId) throw redirect(307, '/');

	const trpc = trpcOnServer(fetch);
	const resinLeft = await trpc.resin.getMyQuota.query();

	return { resinLeft };
}) satisfies PageServerLoad;
