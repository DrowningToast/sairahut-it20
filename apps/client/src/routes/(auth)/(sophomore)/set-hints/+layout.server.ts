import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../../$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const { user, session } = locals;

	// if user is already done hints
	if (user?.sophomoreDetails?.hintsReady) {
		throw redirect(307, '/home');
	}

	return {
		session
	};
};
