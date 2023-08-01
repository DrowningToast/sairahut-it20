import { z } from 'zod';
import { createRouter } from '../context';
import { oldProcedure, protectedProcedure } from '../procedure';
import { AirtableController } from '$lib/airtable-api/controller';
import { prisma } from '$lib/serverUtils';
import { databaseController } from '../controllers';
import { TRPCError } from '@trpc/server';
import type { SophomoreDetails } from 'database';

export const generateRandomString = (length: number) => {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	const charactersLength = characters.length;
	let counter = 0;
	while (counter < length) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
		counter += 1;
	}
	return result;
};

export const sophomoreRouters = createRouter({
	getAirtableParticipantByStudentId: oldProcedure
		.input(
			z.object({
				studentId: z.number()
			})
		)
		.query(async ({ input: { studentId }, ctx }) => {
			const response = await AirtableController.participantIT20.getParticipantByStudentId(
				studentId + ''
			);
			return response;
		}),
	getDatabaseParticipantByEmail: oldProcedure
		.input(
			z.object({
				email: z.string()
			})
		)
		.query(async ({ input: { email } }) => {
			const query = await prisma.user.findUnique({
				where: {
					email
				},
				select: {
					sophomoreDetails: true
				}
			});
			return query;
		}),
	submitHints: oldProcedure
		.input(
			z
				.array(
					z.object({
						content: z.string(),
						slug: z.string(),
						displayName: z.string()
					})
				)
				.min(10)
				.max(10)
		)
		.mutation(async ({ ctx, input }) => {
			const { user } = ctx;
			const sophomoreDetailsId = user?.sophomoreDetails?.id as string;
			const studentId = user?.email?.replace('@kmitl.ac.th', '') as string;

			const processData = input.map((value) => ({
				sophomoreId: sophomoreDetailsId,
				content: value.content,
				hintSlugId: value.slug
			}));

			const hintsExist = await databaseController.hints.checkHints(sophomoreDetailsId);

			if (hintsExist) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: `Student with student_id: ${studentId} already done hints.`
				});
			}

			await AirtableController.participantIT20.insertHintsByStudentId(
				parseInt(studentId),
				processData
			);

			await databaseController.hints.submitHintSlugs(sophomoreDetailsId, processData);
		}),
	getHintSlugs: oldProcedure.query(async ({ ctx }) => {
		return await databaseController.hints.getHintSlugs();
	}),
	getQRString: oldProcedure.query(async ({ ctx }) => {
		if (!ctx.user?.id)
			throw new TRPCError({
				code: 'UNAUTHORIZED',
				message: 'User id not found'
			});

		// first check for the existance of the user qr code
		const existed = await prisma.qRInstances.findFirst({
			where: {
				owner: {
					user: {
						id: ctx.user.id
					}
				},
				quota: {
					gt: 0
				}
			}
		});

		if (existed) {
			return existed;
		} else {
			const secret = generateRandomString(6);

			const newQR = await prisma.qRInstances.create({
				data: {
					owner: {
						connect: {
							userId: ctx.user.id
						}
					},
					secret
				}
			});

			return newQR;
		}
	}),
	getAllSophomores: protectedProcedure
		.input(
			z.object({
				queryBy: z.enum(['STUDENT_ID', 'FIRSTNAME', 'NICKNAME']),
				q: z.string().optional(),
				first: z.number(),
				last: z.number()
			})
		)
		.query(async ({ input }) => {
			const total = await prisma.sophomoreDetails.count();

			const { q, queryBy, first, last } = input;

			let data: SophomoreDetails[] = [];

			if (queryBy === 'FIRSTNAME') {
				data = await prisma.sophomoreDetails.findMany({
					where: {
						fullname: {
							contains: q
						}
					},
					skip: first,
					take: last
				});
			} else if (queryBy === 'NICKNAME') {
				data = await prisma.sophomoreDetails.findMany({
					where: {
						nickname: {
							contains: q
						}
					},
					skip: first,
					take: last
				});
			} else if (queryBy === 'STUDENT_ID') {
				data = await prisma.sophomoreDetails.findMany({
					where: {
						student_id: {
							equals: q
						}
					},
					skip: first,
					take: last
				});
			}

			return {
				count: total,
				data
			};
		})
});
