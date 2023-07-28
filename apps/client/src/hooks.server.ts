import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { AuthHook } from '$lib/auth/auth';
import { injectSessionMiddleware } from '$lib/middlewares/injectSessionMiddleware';
import { firstTimeMiddleware } from '$lib/middlewares/firstTimeMiddleware';

export const handle: Handle = sequence(AuthHook, injectSessionMiddleware, firstTimeMiddleware);
