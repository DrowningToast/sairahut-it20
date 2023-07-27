import { z } from 'zod';
import { createRouter } from '../context';
import { protectedProcedure } from '../procedure';
import { AirtableController } from '$lib/airtable-api/controller';
import { prisma } from '$lib/serverUtils';
import { ThisOrThat } from 'database';

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
							thisOrThat: input as any
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
			const { user } = ctx;

			const processData = input.map((value) => ({
				sophomoreId: user?.sophomoreDetailsId as string,
				content: value,
				hintSlugId: ''
			}))

			
			const data = await prisma.hints.createMany()
		}),

});
