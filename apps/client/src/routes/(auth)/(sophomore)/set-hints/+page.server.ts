import { databaseController } from '$lib/server/controllers';
import { prisma } from '$lib/serverUtils';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

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

	const hintSlugIds = [
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

	const result = hintSlugIds.map((hintSlugId) => {
		const slugDisplayName = hintSlugs.find((d) => d.slug === hintSlugId);
		const find = data.find((d) => d.hintSlugId === hintSlugId);

		return {
			displayName: slugDisplayName?.displayName as string,
			slug: hintSlugId,
			content: find?.content
		};
	});

	return { result };
};
