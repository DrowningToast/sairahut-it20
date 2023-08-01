import { z } from 'zod';
import { createRouter } from '../context';
import { protectedProcedure } from '../procedure';
import { prisma } from '$lib/serverUtils';
import { TRPCError } from '@trpc/server';
import { freshmenRegister } from '$lib/zod';
import { AirtableController } from '$lib/airtable-api/controller';
import type { FreshmenDetails } from 'database';

export const freshmenRouters = createRouter({
	regis: protectedProcedure.input(freshmenRegister).mutation(async ({ input, ctx }) => {
		const { user } = ctx;

		const student_id = user?.email?.substring(0, 8);
		if (!student_id)
			throw new TRPCError({
				code: 'BAD_REQUEST',
				cause: 'Unable to determine user student id'
			});

		// check if atleast one of the contact url is entered
		if (!(input.instagram_link || input.facebook_link)) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				cause: 'Require at least of the social media URLs'
			});
		}

		// insert information into airtable here
		// Sun จัดการให้หน่อย
		const data = {
			student_id: student_id,
			first_name: input.first_name,
			last_name: input.last_name,
			phone: input.phone,
			nickname: input.nickname,
			branch: input.branch,
			facebook_link: input.facebook_link as string,
			instagram_link: input.instagram_link as string,
			title: input.title
		};

		await AirtableController.participantIT21.insertFreshmen(data);

		// insert data into the db
		await prisma.freshmenDetails.create({
			data: {
				branch: input.branch,
				first_name: input.first_name,
				last_name: input.last_name,
				student_id,
				nickname: input.nickname,
				title: input.title,
				phone: input.phone,
				facebook_link: input.facebook_link,
				instagram_link: input.instagram_link,
				user: {
					connect: {
						id: user?.id
					}
				}
			}
		});

		return 'OK';
	}),

	submitScannedQR: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
		const { user } = ctx;

		const data = await prisma.qRInstances.findUnique({
			where: {
				id: input
			}
		});

		if (!data) {
			return {
				success: 0,
				message: `QR Instance with ID: ${input} not found.`
			};
		} else if (data.scannedById) {
			return {
				success: 0,
				message: `QR Instance with ID: ${input} already scanned.`
			};
		}

		await prisma.qRInstances.update({
			where: {
				id: input
			},
			data: {
				scannedById: user?.freshmenDetails?.id
			}
		});

		return {
			success: 1,
			message: 'OK'
		};
	}),
	getAllFreshmens: protectedProcedure
		.input(
			z.object({
				queryBy: z.enum(['STUDENT_ID', 'FIRSTNAME', 'NICKNAME']),
				q: z.string().optional(),
				first: z.number(),
				last: z.number()
			})
		)
		.query(async ({ input }) => {
			const total = await prisma.freshmenDetails.count()
	
			const { q, queryBy, first, last } = input;

			let data: FreshmenDetails[] = [];
		
			if (queryBy === 'FIRSTNAME') {
				data = await prisma.freshmenDetails.findMany({
					where: {
						first_name: {
							contains: q,
						}
					},
					skip: first,
					take: last,
				})
			} else if (queryBy === 'NICKNAME') {
				data = await prisma.freshmenDetails.findMany({
					where: {
						nickname: {
							contains: q,
						}
					},
					skip: first,
					take: last,
				})
			} else if (queryBy === 'STUDENT_ID') {
				data = await prisma.freshmenDetails.findMany({
					where: {
						student_id: {
							equals: q
						}
					},
					skip: first,
					take: last,
				})
			}

			return {
				count: total,
				data,
			}
		})
})
