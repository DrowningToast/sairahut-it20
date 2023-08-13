import { prisma } from '$lib/serverUtils';
import { TRPCError } from '@trpc/server';
import { createRouter } from '../context';
import { ResinController } from '../database/resin/controller';
import { freshmenProcedure, publicProcedure } from '../procedure';
import { FreshmenDetailsWhereUniqueInputSchema } from 'database/zod';

export const resinRouter = createRouter({
	getMyQuota: freshmenProcedure.query(async ({ ctx }) => {
		const freshId = ctx.user?.freshmenDetails?.id;
		if (!freshId)
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'cannot find freshmen details'
			});
		const resinController = ResinController(prisma);

		const resin = await resinController.getTotalResin({
			id: ctx.user?.freshmenDetails!.id
		});

		return resin;
	}),
	/**
	 * EXECUTE ONLY BY CRONJOB
	 */
	createTodayResinPool: publicProcedure
		.input(FreshmenDetailsWhereUniqueInputSchema)
		.query(async ({ input }) => {
			const freshId = input.id;
			if (!freshId)
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'cannot find freshmen details'
				});

			const resinController = ResinController(prisma);

			// get latest resin pool
			const latest = await resinController.getLatestResinPool({ id: freshId });

			// if not found, create a new one right away
			if (!latest) {
				const res = await resinController.createResinPool({ id: freshId });
				return res;
			}

			// check if it's in today, ignore it
			// if it's from yesterday, create a new one
			const today = new Date();
			const resinDate = latest.create_at;

			if (
				resinDate.getDay() === today.getDay() &&
				resinDate.getMonth() === today.getMonth() &&
				resinDate.getFullYear() === today.getFullYear()
			) {
				return latest;
			} else {
				const res = await resinController.createResinPool({
					id: freshId
				});

				return res;
			}
		})
});
