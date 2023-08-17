import { trpcOnServer } from '$lib/trpc';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, fetch }) => {
	const trpc = trpcOnServer(fetch);
	const { user } = locals;

	const [idInfo, magicVerses] = await Promise.all([
		trpc.sophomores.getMagicVerseID.query(),
		trpc.sophomores.getOwnMagicVerses.query()
	]);

	return {
		idInfo,
		user,
		magicVerses
	};
}) satisfies PageServerLoad;
