import { checkMagicVerse } from '$lib/auth/auth';
import { prisma } from '$lib/serverUtils';
import type { Handle } from '@sveltejs/kit';

/**
 *
 * Inject the user session into the event.locals
 *
 * @param param0
 * @returns
 */
export const injectSessionMiddleware: Handle = async ({ event, resolve }) => {
	const session = await event.locals.getSession();
	event.locals.session = session;

	if (session?.user?.email) {
		const user = await prisma.user.findUnique({
			where: {
				email: session.user.email
			},
			include: {
				faction: true,
				sophomoreDetails: true,
				freshmenDetails: true
			}
		});

		event.locals.user = user;
	}

	const response = resolve(event);
	return response;
};
