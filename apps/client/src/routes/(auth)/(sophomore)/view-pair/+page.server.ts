import { prisma } from '$lib/serverUtils';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const { user } = locals;

	const pairs = await prisma.pair.findMany({
		where: {
			sophomoreDetailsId: user?.sophomoreDetails?.id
		},
		include: {
			freshmen: {
				select: {
					nickname: true,
					first_name: true,
					last_name: true,
					facebook_link: true,
					instagram_link: true,
					branch: true,
					title: true,
					student_id: true
				}
			}
		}
	});

	// check if has pair, if not redirect to error
	if (pairs?.length <= 0) {
		throw redirect(308, 'error?error=NO_PAIR');
	}

	return {
		pairs,
		email: user?.email
	};
}) satisfies PageServerLoad;
