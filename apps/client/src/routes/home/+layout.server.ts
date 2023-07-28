import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const { user, session } = locals;

	// Check auth guard
	if (!session) {
		throw redirect(307, '/');
	}

	// Check if the hints are ready?
	if (user?.type === 'SOPHOMORE' && !user.sophomoreDetails?.hintsReady) {
		throw redirect(307, '/hints');
	}

	// check if the this or that is set?
	if (!(user?.sophomoreDetails?.thisOrThatReady|| user?.freshmenDetails?.thisOrThatReady)) {
		throw redirect(307, '/thisthat');
	}

	return {
		session
	};
};
