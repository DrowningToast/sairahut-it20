import { trpcOnServer } from '$lib/trpc';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const trpc = trpcOnServer(fetch);
	const factions = await trpc.profile.getFactions.query();

	return { factions };
}) satisfies PageLoad;

export const ssr = false;
