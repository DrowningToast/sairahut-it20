import { prisma } from '$lib/serverUtils';
import { createRouter } from '../context';
import { hintController } from '../database/hint/controller';
import { protectedProcedure } from '../procedure';
import { z } from 'zod';

export const thisThatRouter = createRouter({
	submitThisOrThat: protectedProcedure
		.input(
			z
				.array(z.enum(['LEFT', 'RIGHT']))
				.min(11)
				.max(11)
		)
		.mutation(async ({ ctx, input }) => {
			const update = {
				thisOrThat: input,
				thisOrThatReady: true
			};

			if (ctx.user?.freshmenDetails?.id != null) {
				await hintController.submitHints(ctx.user?.email as string, {
					freshmenDetails: {
						update
					}
				});
			} else if (ctx.user?.sophomoreDetails?.id != null) {
				await hintController.submitHints(ctx.user?.email as string, {
					sophomoreDetails: {
						update
					}
				});
			}

			return 'OK';
		})
});
