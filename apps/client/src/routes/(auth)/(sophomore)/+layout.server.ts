import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({locals}) => {
    const { user, session } = locals;
    console.log(user?.sophomoreDetails)
    if (!user?.sophomoreDetails) {
        throw redirect(307, '/home')
    }
    return {session};
}) satisfies LayoutServerLoad;

