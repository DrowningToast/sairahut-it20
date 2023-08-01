import { prisma } from '$lib/serverUtils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    const { user } = locals

    const data = await prisma.hints.findMany({
        where: {
            sophomoreId: user?.sophomoreDetails?.id
        }
    })

    console.log(data)

    return { data }
}