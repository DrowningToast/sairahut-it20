import { z } from 'zod';
import { createRouter } from '../context';
import { oldProcedure, protectedProcedure } from '../procedure';
import { AirtableController } from '$lib/airtable-api/controller';
import { prisma } from '$lib/serverUtils';
import { databaseController } from '../controllers';
import { TRPCError } from '@trpc/server';

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
		.input(z.array(z.object({
			content: z.string(),
			slug: z.string(),
			displayName: z.string()
		})).min(10).max(10))
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
			const { q, queryBy, first, last } = input;

			if (queryBy === 'FIRSTNAME') {
				return await prisma.sophomoreDetails.findMany({
					where: {
						fullname: {
							contains: q,
						}
					},
					skip: first,
					take: last,
				})
			} else if (queryBy === 'NICKNAME') {
				return await prisma.sophomoreDetails.findMany({
					where: {
						nickname: {
							contains: q,
						}
					},
					skip: first,
					take: last,
				})
			} else if (queryBy === 'STUDENT_ID') {
				return await prisma.sophomoreDetails.findMany({
					where: {
						student_id: {
							equals: q
						}
					},
					skip: first,
					take: last,
				})
			}
		})
});
