import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/procedure';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { createTRPCHandle } from 'trpc-sveltekit';
import { AuthHook } from '$lib/auth/auth';

export const handle: Handle = sequence(AuthHook, createTRPCHandle({ router, createContext }));
