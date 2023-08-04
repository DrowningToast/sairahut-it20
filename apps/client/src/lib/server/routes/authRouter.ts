import { createRouter } from '../context';
import { protectedProcedure, publicProcedure } from '../procedure';

export const authRouter = createRouter({
	getUser: publicProcedure.query(async ({ ctx }) => {
		const user = { ctx };

		return user;
	})
});
