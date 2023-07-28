import type { LayoutServerLoad } from '../home/$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals }) => {
    const { user, session } = locals;

    // Check auth guard
    if (!session) {
        throw redirect(307, '/');
    }

    // if user is freshmen
    if (user?.type === 'FRESHMEN') {
        throw redirect(307, '/unauthorized');
    }

    // if user has done hints already
    if (user?.sophomoreDetails?.hintsReady) {
        throw redirect(307, '/home')
    }

    return {
        session
    }
}