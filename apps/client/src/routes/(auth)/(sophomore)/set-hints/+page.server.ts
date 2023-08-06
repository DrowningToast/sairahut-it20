import { databaseController } from '$lib/server/controllers';
import { prisma } from '$lib/serverUtils';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { hintSlugIds } from '$lib/hintSlugIds';

export const load: PageServerLoad = async ({ locals }) => {
	const { user } = locals;

	if (!user?.sophomoreDetails?.hintsReady) {
		return { result: [] };
	}

	const data = await prisma.hints.findMany({
		where: {
			sophomoreId: user?.sophomoreDetails?.id
		}
	});

	const hintSlugs = await databaseController.hints.getHintSlugs();

	// fetch sophomore pair (1 or more)
	const pairs = await prisma.pair.findMany({
		where: {
			sophomoreDetailsId: user.sophomoreDetails.id
		},
		include: {
			revealedHints: {
				select: {
					hint: true
				}
			}
		}
	});

	const knownHints = pairs.flatMap((item) => item.revealedHints.map((revealed) => revealed.hint));

	if (pairs.length <= 0) {
		throw redirect(308, '/error?error=NO_PAIR');
	}

	const result = hintSlugIds.map((hintSlugId) => {
		const slugDisplayName = hintSlugs.find((d) => d.slug === hintSlugId);
		const find = data.find((d) => d.hintSlugId === hintSlugId);

		return {
			displayName: slugDisplayName?.displayName as string,
			slug: hintSlugId,
			content: find?.content,
			shown: !!knownHints.find((known) => known.hintSlugId === hintSlugId)
		};
	});

	return { result };
};
