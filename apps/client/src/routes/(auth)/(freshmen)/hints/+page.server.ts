import { FreshmenDetailsController } from '$lib/server/database/freshmen/controller';
import { HintsController } from '$lib/server/database/hint/controller';
import { prisma } from '$lib/serverUtils';
import { User } from 'lucide-svelte';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ locals }) => {
	const { user } = locals;

	if (!user?.freshmenDetails?.id) throw redirect(308, '/error?error=INVALID_FRESHMEN_ID');

	// fetch revealed hints
	const revealeds = await FreshmenDetailsController(prisma).getRevealedHints({
		id: user?.freshmenDetails?.id
	});

	// fetch next hint price
	const nextHintPrice = await FreshmenDetailsController(prisma).getNextHintPrice({
		id: user?.freshmenDetails?.id
	});

	// current points
	const points = user.freshmenDetails.passcodePoints;

	if (!revealeds || nextHintPrice === undefined)
		throw redirect(308, '/error?error=HINT_DETAILS_NOT_FOUND');

	return {
		hints: revealeds,
		price: nextHintPrice,
		points: points
	};
}) satisfies PageServerLoad;
