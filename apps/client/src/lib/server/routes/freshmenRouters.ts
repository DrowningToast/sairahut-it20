import { z } from 'zod';
import { createRouter } from '../context';
import { protectedProcedure } from '../procedure';
import { prisma } from '$lib/serverUtils';
import { TRPCError } from '@trpc/server';
import { freshmenRegister } from '$lib/zod';
import { insertFreshmen } from '$lib/airtable-api/controller/participant21/mutates';
import type { Branch, NameTitle } from 'database';

export const freshmenRouters = createRouter({
	regis: protectedProcedure.input(freshmenRegister).mutation(async ({ input, ctx }) => {
		const { user } = ctx;

		const student_id = ctx.user?.email?.substring(0, 8);
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
		// const data = {
		// 	student_id: '66050545',
		// 	first_name: 'กัญญาภัค',
		// 	last_name: 'บงพิศาลภพ',
		// 	phone: '0968936153',
		// 	nickname: 'อั้ม',
		// 	branch: 'IT' as Branch,
		// 	facebook_link: 'https://www.facebook.com/aaxmyz',
		// 	instagram_link: 'https://www.instagram.com/aaxmyz',
		// 	title: 'MRS' as NameTitle
		// }

		// await insertFreshmen(data)

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
				User: {
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
				scannedById: user?.freshmenDetailsId
			}
		});

		return {
			success: 1,
			message: 'OK'
		};
	}),

	testYingAirtable: protectedProcedure.query(async () => {
		const data = {
			student_id: '66050545',
			first_name: 'กัญญาภัค',
			last_name: 'บงพิศาลภพ',
			phone: '0968936153',
			nickname: 'อั้ม',
			branch: 'IT' as Branch,
			facebook_link: 'https://www.facebook.com/aaxmyz',
			instagram_link: 'https://www.instagram.com/aaxmyz',
			title: 'MRS' as NameTitle
		};

		await insertFreshmen(data);

		return 'OK';
	})
});
