import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { prisma } from '$lib/serverUtils';
export const load: LayoutServerLoad = async ({ locals }) => {
	const { user, session } = locals;

	// Check auth guard
	if (!session) {
		throw redirect(307, '/');
	}

	const sophomoreDetails = await prisma.sophomoreDetails.findUnique({
		where: {
			id: user?.sophomoreDetailsId as string
		},
		include: {
			hints: true
		}
	})

	// Check if the hints are ready?
	if (user?.type === 'SOPHOMORE' && sophomoreDetails?.hints.length === 0) {
		throw redirect(307, '/hints');
	}

	// check if the this or that is set?
	if (!(user?.sophomoreDetails?.thisOrThat.length || user?.freshmenDetails?.thisOrThat.length)) {
		throw redirect(307, '/thisthat');
	}

	return {
		session
	};
};
