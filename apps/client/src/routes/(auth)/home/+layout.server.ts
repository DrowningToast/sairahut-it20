import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const { user, session } = locals;

	// commented for testing reasons

	// Check if the hints are ready?
	if (user?.type === 'SOPHOMORE' && !user.sophomoreDetails?.hintsReady) {
		throw redirect(307, '/set-hints');
	}

	// check if the user is freshmen and still haven't registered
	if (user?.type === 'FRESHMEN' && !user.freshmenDetails) {
		throw redirect(307, '/regis');
	}

	// check if the this or that is set?
	if (!(user?.sophomoreDetails?.thisOrThatReady || user?.freshmenDetails?.thisOrThatReady)) {
		throw redirect(307, '/this-or-that');
	}

	return {
		session
	};
};
