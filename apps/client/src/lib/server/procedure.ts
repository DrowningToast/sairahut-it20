import { TRPCError } from '@trpc/server';
import { t } from './context';

export const publicProcedure = t.procedure;

/**
 * Ensure the user is authenticated
 */
const enforcedAuth = t.middleware(({ ctx, next }) => {
	const { user } = ctx;

	if (!user) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}

	return next({
		ctx
	});
});

/**
 * Ensure the user is both authenticated and has either sophomoreDetails or freshmenDetails fields already
 */

export const protectedProcedure = t.procedure.use(enforcedAuth);
