import type { Branch } from 'database';
import { guestParticipant } from './table';

export const getGuestByStudentId = async (studentId: string) => {
	const query = await guestParticipant
		.select({
			filterByFormula: `student_id = ${studentId}`
		})
		.all();

	if (query.length === 0) return null;

	const data = {
		title: query[0].get('title') as 'MR' | 'MRS',
		studentId: query[0].get('student_id') as string,
		first_name: query[0].get('first_name') as string,
		last_name: query[0].get('last_name') as string,
		nickname: query[0].get('nickname') as string,
		branch: query[0].get('branch') as Branch,
		facebook_link: query[0].get('facebook') as string,
		instagram_link: query[0].get('instagram') as string
	};

	return data;
};
