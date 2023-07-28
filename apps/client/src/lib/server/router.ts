// src/lib/server/router.ts
import { z } from 'zod';
import { createRouter } from './context';
import { publicProcedure } from './procedure';
import { sophomoreRouters } from './routes/sophomoreRouters';
import { freshmenRouters } from './routes/freshmenRouters';

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
	sophomores: sophomoreRouters,
	freshmens: freshmenRouters
});

export type AppRouter = typeof appRouter;
