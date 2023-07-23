import type { Context } from '$lib/trpc/context';
import type { RequestEvent } from '@sveltejs/kit';
import { TRPCError, initTRPC } from '@trpc/server';
import type { PrismaClient } from 'database';
import delay from 'delay';
import superjson from 'superjson';
import type { routers } from './router/routers';

export const t = initTRPC.context<Context>().create({
	transformer: superjson,
	errorFormatter({ shape }) {
		return shape;
	}
});

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

export type Routers = typeof routers;
