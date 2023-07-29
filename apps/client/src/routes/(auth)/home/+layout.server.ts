import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const { user, session } = locals;

	console.log('hello world');
	console.log(user);
	console.log(session);

	// commented for testing reasons

	// Check if the hints are ready?
	if (user?.type === 'SOPHOMORE' && !user.sophomoreDetails?.hintsReady) {
		throw redirect(307, '/set-hints');
	}

	// check if the this or that is set?
	if (!(user?.sophomoreDetails?.thisOrThatReady || user?.freshmenDetails?.thisOrThatReady)) {
		throw redirect(307, '/this-or-that');
	}

	return {
		session
	};
};