import { prisma } from '$lib/serverUtils';
import type { RequestEvent } from '@sveltejs/kit';
import type { inferAsyncReturnType } from '@trpc/server';
import { PrismaClient, type User } from 'database';
import { client } from 'database/db';

interface CookieObject {
	name: string;
	value: string;
}

const findCookie = (cookies: CookieObject[], name: string) => {
	return cookies.find((cookie) => cookie.name == name);
};

// we're not using the event parameter is this example,
// hence the eslint-disable rule
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createContext(event: RequestEvent) {
	const { cookies } = event;

	console.log('Context created');
	console.log(cookies.getAll());

	const sessionTokenCookie = findCookie(cookies.getAll(), 'next-auth.session-token');
	let user: User | undefined;

	if (sessionTokenCookie?.value) {
		user = (
			await prisma.session.findUnique({
				where: {
					sessionToken: sessionTokenCookie?.value
				},
				select: {
					user: true
				}
			})
		)?.user;
	}

	return {
		// context information
		user,
		prisma: PrismaClient
	};
}

export type Context = inferAsyncReturnType<typeof createContext>;
