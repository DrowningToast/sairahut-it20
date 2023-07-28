import { z } from 'zod';
import { createRouter } from '../context';
import { protectedProcedure } from '../procedure';
import { AirtableController } from '$lib/airtable-api/controller';
import { prisma } from '$lib/serverUtils';

export const sophomoreRouters = createRouter({
	getAirtableParticipantByStudentId: protectedProcedure
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
	getDatabaseParticipantByEmail: protectedProcedure
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
	submitHints: protectedProcedure
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
			const processData = input.map((value, index) => ({
				sophomoreId: sophomoreDetailsId,
				content: value,
				hintSlugId: hintSlugId[index]
			}));

			const hints = await prisma.hints.createMany({
				data: processData
			});

			await prisma.sophomoreDetails.update({
				data: {
					hintsReady: true
				},
				where: {
					id: sophomoreDetailsId
				}
			});

			return 'OK';
		})
});
