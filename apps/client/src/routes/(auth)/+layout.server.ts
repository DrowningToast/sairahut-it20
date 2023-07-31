import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const { session, user } = locals;

	console.log(user);

	// Check auth guard
	if (!session) {
		throw redirect(307, '/');
	}

	return {
		session
	};
};
