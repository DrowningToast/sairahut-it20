import { z } from 'zod';
import { createRouter } from '../context';
import { protectedProcedure } from '../procedure';
import { AirtableController } from '$lib/airtable-api/controller';

export const sophomoreRouters = createRouter({
	getParticipantByStudentId: protectedProcedure
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
	submitThisOrThat: protectedProcedure
		.input(z.array(z.string()))
		.mutation(({ ctx }) => {
			return
		}),
	submitHints: protectedProcedure
		.input(z.array(z.string()))
		.mutation(({ ctx }) => {
			return
		})
});
