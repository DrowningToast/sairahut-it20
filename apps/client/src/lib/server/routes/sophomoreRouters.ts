import { z } from 'zod';
import { createRouter } from '../context';
import { publicProcedure } from '../procedure';
import { sophomoreParticipant } from '$lib/airtable-api';

export const sophomoreRouters = createRouter({
    getParticipantByStudentId: publicProcedure
        .input(
            z.object({
                studentId: z.number()
            })
        ).query(async ({ input: { studentId } }) => {
            const query = await sophomoreParticipant.select({
                filterByFormula: `student_id = ${studentId}`
            }).all()

            let data = null;

            query.forEach(value => {
                data = {
                    studentId: value.get('student_id'),
                    firstname: value.get('firstname'),
                    surname: value.get('surname'),
                    nickname: value.get('nickname'),
                    branch: value.get('branch'),
                }
            })

            return data
        })
})