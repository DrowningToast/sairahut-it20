import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const { user } = locals;

	if (!(user?.freshmenDetails || user?.sophomoreDetails)) {
		return redirect(307, '/home');
	}

	return {};
}) satisfies LayoutServerLoad;
