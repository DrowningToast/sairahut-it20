import { signOut } from '@auth/sveltekit/client';
import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async ({ data }) => {
	if (!data.magicVerses) {
		await signOut();
		alert('Your magic verses is not found, please contact your ADMIN right now.');
		throw redirect(307, '/');
	}

	if (!data.idInfo) {
		alert("You're either signed out or not a sophomore");
		throw redirect(307, '/');
	}

	return data;
};

export const ssr = false;
