import { z } from 'zod';
import { createRouter } from '../context';
import { protectedProcedure, publicProcedure } from '../procedure';
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
		const data = {
			student_id: parseInt(student_id),
			first_name: input.first_name,
			last_name: input.last_name,
			phone: input.phone,
			nickname: input.nickname,
			branch: input.branch,
			facebook_link: input.facebook_link as string,
			instagram_link: input.instagram_link as string,
			title: input.title
		}

		await insertFreshmen(data)

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
				instagram_link: input.instagram_link
			}
		});
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
});
