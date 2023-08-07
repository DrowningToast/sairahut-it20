import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { determineYear } from '$lib/utils';

export const load: PageServerLoad = async ({ locals }) => {
	const { user } = locals;

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const gen: number = determineYear(user!.email!);

	// Ensure the user is gen 21 and doesn't have freshmen details just yet
	// if (gen !== 21) {
	// 	throw redirect(307, '/home');
	// }

	// // If the user has already registered once, redirect them to home page
	// if (user?.freshmenDetails) {
	// 	throw redirect(307, '/home');
	// }

	return {};
};
