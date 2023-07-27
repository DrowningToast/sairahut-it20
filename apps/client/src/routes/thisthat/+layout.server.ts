import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../home/$types';
import { prisma } from '$lib/serverUtils';

export const load: LayoutServerLoad = async ({ locals }) => {
    const { user, session } = locals;

    // Check auth guard
    if (!session) {
        throw redirect(307, '/');
    }

    // if user is already done this or that
    const data = await prisma.user.findUnique({
        where: {
            email: user?.email as string
        },
        include: {
            sophomoreDetails: true,
            freshmenDetails: true
        }
    })

    if (data?.sophomoreDetails?.thisOrThat || data?.freshmenDetails?.thisOrThat) {
        redirect(307, '/')
    }

    return {
        session
    }
}