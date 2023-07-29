import { prisma } from '$lib/serverUtils';
import { createRouter } from '../context';
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
			}

			if (ctx.user?.freshmenDetailsId != null) {
				await prisma.user.update({
					data: {
						sophomoreDetails: {
							update
						}
					},
					where: {
						email: ctx.user?.email as string
					}
				});
			} else if (ctx.user?.sophomoreDetailsId != null) {
				await prisma.user.update({
					data: {
						freshmenDetails: {
							update
						}
					},
					where: {
						email: ctx.user?.email as string
					}
				});
			}

			return 'OK';
		})
});
