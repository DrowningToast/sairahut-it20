import { trpcOnServer } from '$lib/trpc';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	return {};
}) satisfies PageLoad;

export const ssr = false;
