import { createRouter } from '../context';
import { protectedProcedure, publicProcedure } from '../procedure';

export const authRouter = createRouter({
	getUser: protectedProcedure.query(async ({ ctx }) => {
		const user = { ctx };

		console.log(user);

		return user;
	})
});