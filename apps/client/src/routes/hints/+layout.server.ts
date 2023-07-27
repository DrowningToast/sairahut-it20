import type { LayoutServerLoad } from '../home/$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals }) => {
    const { user, session } = locals;

    // Check auth guard
    if (!session) {
        throw redirect(307, '/');
    }

    // if user is already done this or that
    if (user?.type === 'FRESHMEN') {
        throw redirect(307, '/unauthorized');
    }

    return {
        session
    }
}