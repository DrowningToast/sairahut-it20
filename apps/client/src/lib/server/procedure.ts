import { TRPCError } from '@trpc/server';
import { t } from './context';

export const publicProcedure = t.procedure;

const enforcedAuth = t.middleware(({ ctx, next }) => {
	const { user } = ctx;

	if (!user) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}

	return next({
		ctx
	});
});

export const protectedProcedure = t.procedure.use(enforcedAuth);
