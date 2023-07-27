import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import type { SophomoreDetails } from 'database';
export const load: LayoutServerLoad = async ({ locals }) => {
	const { user, session } = locals;

	// Check auth guard
	if (!session) {
		throw redirect(307, '/');
	}

	// Check if the hints are ready?
	if (user?.type === 'SOPHOMORE' && !user.sophomoreDetails) {
		throw redirect(307, '/hints');
	}

	// check if the this or that is set?
	if (!(user?.sophomoreDetails?.thisOrThat.length || user?.freshmenDetails?.thisOrThat.length)) {
		throw redirect(307, '/thisthat');
	}

	return {
		session
	};
};
