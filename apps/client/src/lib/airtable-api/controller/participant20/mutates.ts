import { TRPCError } from '@trpc/server';
import { getParticipantByStudentId } from './queries';
import { sophomoreParticipant } from './table';

interface IInsertHints {
	sophomoreId: string;
	content: string;
	hintSlugId: string;
}

export const insertHintsByStudentId = async (studentId: number, data: IInsertHints[]) => {
	console.log(
		process.env.NODE_ENV === 'production' ? '20 - participant' : '20 - participant - dev'
	);
	const sophomore = await getParticipantByStudentId(studentId + '');

	if (sophomore?.hints) {
		throw new TRPCError({
			code: 'BAD_REQUEST',
			message: `Student with student_id: ${studentId} already done hints.`
		});
	}

	const payload = data.map((value) => ({
		content: value.content,
		slug: value.hintSlugId
	}));

	console.log('3.6');

	await sophomoreParticipant.update([
		{
			fields: {
				hints: JSON.stringify(payload)
			},
			id: sophomore?.airtableId as string
		}
	]);

	console.log('3.7');

	return {
		success: true,
		message: 'OK'
	};
};
