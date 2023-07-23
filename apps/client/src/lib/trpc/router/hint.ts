import { protectedProcedure } from '../procedure';
import { createTRPCRouter } from './routers';
import { z } from 'zod';

export const hintRouter = createTRPCRouter({
	// set hints ของพี่ๆ edit ไม่ได้
	set: protectedProcedure
		.input(
			z.object({
				// needs to be verified
				scope: z.string().min(1),
				content: z.string().min(1)
			})
		)
		.query(async ({ ctx, input }) => {
			// check does this hint scope exists in the database
			// input validation
			// insert hints into the database
		})
});
