import { prisma } from '$lib/serverUtils';
import { trpc, trpcOnServer } from '$lib/trpc';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, fetch }) => {
	const trpc = trpcOnServer(fetch);

	// fetch every verses for the freshmen
	const verses = await prisma.magicVerses.findMany();
	const user = locals.user;

	return { verses, user };
}) satisfies PageServerLoad;
