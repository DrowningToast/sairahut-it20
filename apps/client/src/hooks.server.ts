import { createContext } from '$lib/trpc/context';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { createTRPCHandle } from 'trpc-sveltekit';
import { AuthHook } from '$lib/auth/auth';
import { routers } from '$lib/trpc/router/routers';

export const handle: Handle = sequence(
	AuthHook,
	createTRPCHandle({ router: routers, createContext })
);
