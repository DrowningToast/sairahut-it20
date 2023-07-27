import { trpcOnServer } from '$lib/trpc';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../home/$types';

export const load: LayoutServerLoad = async ({ locals }) => {
    const { user, session } = locals;

    const trpc = trpcOnServer(fetch)

    // Check auth guard
    if (!session) {
        throw redirect(307, '/');
    }

    // if user is already done this or that
    const data = await trpc
        .sophomores.getDatabaseParticipantByEmail.query({
            email: user?.email as string
        })

    if (data?.sophomoreDetails) {
        redirect(307, '/')
    }

    return {
        session
    }
}