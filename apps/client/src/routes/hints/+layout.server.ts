import { prisma } from '$lib/serverUtils';
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

    const sophomoreDetails = await prisma.sophomoreDetails.findUnique({
        where: {
            id: user?.sophomoreDetailsId as string
        },
        include: {
            hints: true
        }
    })

    if (sophomoreDetails?.hints.length !== 0) {
        throw redirect(307, '/')
    }

    return {
        session
    }
}