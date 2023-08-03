import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const { user, session } = locals;

	// if user is already done this or that
	if (user?.sophomoreDetails?.thisOrThatReady || user?.freshmenDetails?.thisOrThatReady) {
		throw redirect(307, '/home');
	}

	// if the user is sophomore and haven't entered the hints, redirect them to the hints first
	if (user?.type === 'SOPHOMORE' && !user.sophomoreDetails?.hintsReady) {
		throw redirect(307, '/set-hints');
	}

	// if the user is freshmen and haven't registered, redirect.
	if (user?.type === 'FRESHMEN' && !user.freshmenDetails) {
		throw redirect(307, '/regis');
	}

	return {
		session
	};
};
