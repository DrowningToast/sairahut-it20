import { z } from 'zod';
import { createRouter } from '../context';
import { oldProcedure } from '../procedure';
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
		.input(z.array(z.string()).min(10).max(10))
		.mutation(async ({ ctx, input }) => {
			const hintSlugId = [
				'appearance',
				'height',
				'personality',
				'sex',
				'food',
				'hobby',
				'quote',
				'place',
				'fashion',
				'name_hint'
			];

			const { user } = ctx;
			const sophomoreDetailsId = user?.sophomoreDetailsId as string;
			const studentId = user?.email?.replace('@kmitl.ac.th', '') as string

			const processData = input.map((value, index) => ({
				sophomoreId: sophomoreDetailsId,
				content: value,
				hintSlugId: hintSlugId[index]
			}));

			const res = await AirtableController.participantIT20.insertHintsByStudentId(parseInt(studentId), processData)

			if (!res.success) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					cause: res.message
				});
			}

			await databaseController.hints.submitHintSlugs(sophomoreDetailsId, processData);
		}),
	getHintSlugs: oldProcedure.query(async ({ ctx }) => {
		return await databaseController.hints.getHintSlugs();
	})
});
