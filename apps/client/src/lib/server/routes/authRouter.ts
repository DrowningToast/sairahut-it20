import { createRouter } from '../context';
import { protectedProcedure } from '../procedure';

export const authRouter = createRouter({
	getUser: protectedProcedure.query(async ({ ctx }) => {
		const user = { ctx };

		return user;
	})
});
