import type { Session } from '@auth/core/types';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	let session: Session | null = null;

	if (event.route.id == '/') {
		session = await event.locals.getSession();
	}

	return {
		session: session
	};
};
