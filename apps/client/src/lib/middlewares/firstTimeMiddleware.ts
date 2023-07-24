import { AirtableController } from '$lib/airtable-api/controller';
import { prisma } from '$lib/serverUtils';
import { redirect, type Handle } from '@sveltejs/kit';
import Airtable from 'airtable';
import type { Branch } from 'database';

const determineYear = (email: string) => {
	const year = parseInt(email[0] + email[1]);
	return year - 45;
};

/**
 *
 * Check if the user joins in for the first time or not.
 * If so, user data should exists in the Airtable, and further more
 * if the user still lacks hints or this or that information, the user should
 * be redirected
 *
 * @param param0
 * @returns
 */
export const firstTimeMiddleware: Handle = async ({ event, resolve }) => {
	const user = event.locals.user;

	console.log(user);

	// Set the user type
	// If it's the first time user enters the website
	if (user?.email && user.type === 'NONE') {
		const gen = determineYear(user.email);

		console.log(gen);

		// if it's the senior
		if (gen < 20) {
			null;
		}

		// if the user IT20
		if (gen === 20) {
			// fetch the IT20 airtable
			const res = await AirtableController.participantIT20.getParticipantByStudentId(
				user.email.replace('@kmitl.ac.th', '')
			);

			if (!res) {
				return redirect(307, '/unauthorized');
			}

			// populate the user details
			await prisma.$transaction([
				prisma.sophomoreDetails.create({
					data: {
						title: res.title === 'นาย' ? 'MR' : 'MRS',
						branch: res.branch as Branch,
						facebook_link: res.facebook_link,
						instagram_link: res.instragram_link,
						fullname: res.firstname + ' ' + res.surname,
						many_fresh: res.many_fresh,
						nickname: res.nickname,
						participate: res.participate,
						phone: res.phone,
						student_id: res.studentId,
						User: {
							connect: {
								email: user?.email
							}
						}
					}
				}),
				prisma.user.update({
					where: {
						email: user.email
					},
					data: {
						type: 'SOPHOMORE'
					}
				})
			]);
		}

		// if the user IT21
		if (gen == 21) {
			null;
		}
	}

	// Check if the hint and this or that available
	if (false) {
		null;
	}

	const response = resolve(event);
	return response;
};
