import { createTRPCRouter, protectedProcedure, publicProcedure, t } from '../procedure';
import { z } from 'zod';

export const exampleRouter = createTRPCRouter({
	greeting: publicProcedure.query(async ({ ctx }) => {
		// const name = ctx.user?.name;

		return 'hello world';
		// if (name) {
		// 	return 'Hello tRPC v10 ' + ctx.user?.name;
		// }
		// return 'Hello tRPC v10 Guest!';
	}),
	secret: protectedProcedure
		.input(
			z.object({
				password: z.string().min(1)
			})
		)
		.mutation(async () => {
			console.log('password received');
		})
});
