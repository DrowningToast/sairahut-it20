// import { redirect } from '@sveltejs/kit';
// import type { LayoutServerLoad } from '../home/$types';

// export const load: LayoutServerLoad = async ({ locals }) => {
// 	const { user, session } = locals;

// 	// Check auth guard
// 	if (!session) {
// 		throw redirect(307, '/');
// 	}

// 	// if user is already done this or that
// 	if (user?.sophomoreDetails?.thisOrThatReady || user?.freshmenDetails?.thisOrThatReady) {
// 		throw redirect(307, '/');
// 	}

// 	return {
// 		session
// 	};
// };
