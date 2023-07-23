import { publicProcedure, t } from '../procedure';
import { createTRPCRouter } from './routers';

export const exampleRouter = createTRPCRouter({
	greeting: publicProcedure.query(async ({ ctx }) => {
		const name = ctx.user?.name;

		if (name) {
			return 'Hello tRPC v10 ' + ctx.user?.name;
		}
		return 'Hello tRPC v10 Guest!';
	})
});
