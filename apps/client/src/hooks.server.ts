import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/procedure';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { createTRPCHandle } from 'trpc-sveltekit';
import { SvelteKitAuth } from '@auth/sveltekit';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Google from '@auth/core/providers/google';
import { AUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import { client } from 'database/client';

export const handle: Handle = sequence(
	SvelteKitAuth({
		providers: [
			//@ts-ignore
			Google({
				clientId: GOOGLE_CLIENT_ID,
				clientSecret: GOOGLE_CLIENT_SECRET
			})
		],
		adapter: PrismaAdapter(client),
		secret: AUTH_SECRET
	}),
	createTRPCHandle({ router, createContext })
);
