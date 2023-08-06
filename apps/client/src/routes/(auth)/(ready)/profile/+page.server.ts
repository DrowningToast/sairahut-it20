import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const { user } = locals;

	return {
		...user,
		...user?.sophomoreDetails,
		...user?.freshmenDetails
	};
}) satisfies PageServerLoad;
