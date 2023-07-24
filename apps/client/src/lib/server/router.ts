// src/lib/server/router.ts
import { z } from 'zod';
import { createRouter } from './context';
import { publicProcedure } from './procedure';
import { userRouters } from './routes/userRouters';
import { sophomoreParticipant } from '$lib/airtable-api';

export const appRouter = createRouter({
	greet: publicProcedure
		.input(
			z.object({
				name: z.string()
			})
		)
		.query(({ ctx, input }) => {
			return `Hello ${input.name}`;
		}),
	user: publicProcedure
		.query(async () => {
			const query = await sophomoreParticipant.select({
				filterByFormula: `student id = ${65070171}`
			}).all()

			console.log('Query:', query);

			return query
		})
});

export type AppRouter = typeof appRouter;
