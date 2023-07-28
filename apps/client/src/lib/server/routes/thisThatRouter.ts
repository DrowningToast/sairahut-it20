import { prisma } from '$lib/serverUtils';
import { createRouter } from '../context';
import { protectedProcedure } from '../procedure';
import { z } from 'zod';

export const thisThatRouter = createRouter({
	submitThisOrThat: protectedProcedure
		.input(
			z
				.array(z.enum(['LEFT', 'RIGHT']))
				.min(10)
				.max(10)
		)
		.mutation(async ({ ctx, input }) => {
			await prisma.user.update({
				data: {
					sophomoreDetails: {
						update: {
							thisOrThat: input,
							thisOrThatReady: true
						}
					}
				},
				where: {
					email: ctx.user?.email as string
				}
			});

			return 'OK';
		})
});
