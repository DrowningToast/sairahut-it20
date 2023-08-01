import { databaseController } from '$lib/server/controllers';
import { prisma } from '$lib/serverUtils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    const { user } = locals

    if (!user?.sophomoreDetails?.hintsReady) {
        return { result: [] }
    }

    const data = await prisma.hints.findMany({
        where: {
            sophomoreId: user?.sophomoreDetails?.id
        }
    })

    const hintSlugId = [
        'appearance',
        'height',
        'personality',
        'sex',
        'food',
        'hobby',
        'quote',
        'place',
        'fashion',
        'name_hint'
    ];

    const hintSlugs = await databaseController.hints.getHintSlugs();

    const result = hintSlugId.map((hintSlug) => {
        const slugDisplayName = hintSlugs.find((d) => d.slug === hintSlug);
        const find = data.find((d) => d.hintSlugId === hintSlug)

        return {
            displayName: slugDisplayName?.displayName as string,
            slug: hintSlug,
            content: find?.content
        }
    })

    return { result }
}