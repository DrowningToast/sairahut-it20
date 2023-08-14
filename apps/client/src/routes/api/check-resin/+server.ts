import { FreshmenDetailsController } from '$lib/server/database/freshmen/controller';
import { ResinController } from '$lib/server/database/resin/controller';
import { prisma } from '$lib/serverUtils';
import { trpcOnServer } from '$lib/trpc';
import type { RequestHandler } from './$types';

// Does fuck all managing resin
export const GET: RequestHandler = async ({ fetch }) => {
	const freshmenController = await FreshmenDetailsController(prisma);
	const freshmens = await freshmenController.getAllFreshmen();
	const trpc = trpcOnServer(fetch);

	await Promise.all(
		freshmens.map(async (fresh) => {
			await trpc.resin.createTodayResinPool.query({
				id: fresh.id
			});
		})
	);

	return new Response('Done generating!');
};
