import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { session } = locals;

	// Send auth state to the client
	return { session };
};
