import { createRouter } from '../context';
import { protectedReadyProcedure } from '../procedure';

export const profileRouter = createRouter({
	getMyProfile: protectedReadyProcedure.query(async ({ ctx }) => {
		const { user } = ctx;

		return user;
	})
});
