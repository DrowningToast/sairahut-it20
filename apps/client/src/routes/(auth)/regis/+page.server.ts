import { determineYear } from '$lib/middlewares/firstTimeMiddleware';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const { user } = locals;

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const gen: number = determineYear(user!.email!);

	// Ensure the user is gen 21 and doesn't have freshmen details just yet
	if (gen !== 21) {
		return redirect(307, 'home');
	}

	return {};
}) satisfies PageServerLoad;
