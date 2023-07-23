import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { AuthHook } from '$lib/auth/auth';

export const handle: Handle = sequence(AuthHook);
