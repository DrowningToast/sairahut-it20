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
			console.log(ctx);
			const response = await AirtableController.participantIT20.getParticipantByStudentId(
				studentId + ''
			);
			return response;
		}),
	getDatabaseParticipantByEmail: protectedProcedure
		.input(z.object({
			email: z.string()
		}))
		.query(async ({ input: { email } }) => {
			const query = await prisma.user.findUnique({
				where: {
					email
				},
				select: {
					sophomoreDetails: true,
				}
			})
			return query;
		}),
	submitThisOrThat: protectedProcedure
		.input(z.array(z.string()))
		.mutation(async ({ ctx, input }) => {
			await prisma.user.update({
				data: {
					sophomoreDetails: {
						update: {
							thisOrThat: input as any,
							thisOrThatReady: true
						}
					}
				},
				where: {
					email: ctx.user?.email as string
				}
			})

			return 'OK'
		}),
	submitHints: protectedProcedure
		.input(z.array(z.string()))
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
			]

			const { user } = ctx;
			const sophomoreDetailsId = user?.sophomoreDetailsId as string
			const processData = input.map((value, index) => ({
				sophomoreId: sophomoreDetailsId,
				content: value,
				hintSlugId: hintSlugId[index]
			}))

			const hints = await prisma.hints.createMany({
				data: processData
			})

			await prisma.sophomoreDetails.update({
				data: {
					hintsReady: true
				},
				where: {
					id: sophomoreDetailsId
				}
			})

			console.log(hints)

			return 'OK'
		}),

});
