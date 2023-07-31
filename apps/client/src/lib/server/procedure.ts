import { TRPCError } from '@trpc/server';
import { t } from './context';
import { determineYear } from '$lib/middlewares/firstTimeMiddleware';

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
 * Ensure the user has either sophomoreDetails or freshmenDetails fields already
 */
const enforcedReady = t.middleware(({ ctx, next }) => {
	if (!(ctx?.user?.freshmenDetails || ctx?.user?.sophomoreDetails)) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}

	return next({
		ctx
	});
});

/**
 * Ensure the user is GEN 21
 */
const enforcedFreshmen = t.middleware(({ ctx, next }) => {
	if (!ctx.user?.email) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}

	const gen = determineYear(ctx.user?.email);

	if (gen !== 21) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}

	return next({
		ctx
	});
});

/**
 * Ensure the user is GEN 20 or earlier
 */
const enforcedSophomoreOrOlder = t.middleware(({ ctx, next }) => {
	if (!ctx.user?.email) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}

	const gen = determineYear(ctx.user?.email);

	if (gen >= 21) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}

	return next({
		ctx
	});
});

export const protectedProcedure = t.procedure.use(enforcedAuth);
export const protectedReadyProcedure = t.procedure.use(enforcedAuth).use(enforcedReady);
export const freshmenProcedure = t.procedure.use(enforcedFreshmen).use(enforcedReady);
export const oldProcedure = t.procedure.use(enforcedSophomoreOrOlder).use(enforcedReady);
