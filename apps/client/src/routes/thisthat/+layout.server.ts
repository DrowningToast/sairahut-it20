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

    console.log(data?.sophomoreDetails)

    if (data?.sophomoreDetails?.thisOrThat.length || data?.freshmenDetails?.thisOrThat.length) {
        throw redirect(307, '/')
    }

    return {
        session
    }
}