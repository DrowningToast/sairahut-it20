import type { Handle } from '@sveltejs/kit';

/**
 * If the sophomore doesn't have their magic verse, create one
 * @param param0
 */
export const checkMagicVerseMiddleware: Handle = async ({ event, resolve }) => {
	const response = resolve(event);
	return response;
};
