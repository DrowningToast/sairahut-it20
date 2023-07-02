import type { RequestEvent } from '@sveltejs/kit';
import type { inferAsyncReturnType } from '@trpc/server';
import { PrismaClient } from 'database';

// we're not using the event parameter is this example,
// hence the eslint-disable rule
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createContext(event: RequestEvent) {
	const { cookies } = event;

	console.log('Context created');
	console.log(cookies.getAll());

	return {
		// context information
		prisma: PrismaClient
	};
}

export type Context = inferAsyncReturnType<typeof createContext>;
