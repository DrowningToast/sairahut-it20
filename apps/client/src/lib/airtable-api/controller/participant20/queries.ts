import { sophomoreParticipant } from './table';

export const getParticipantByStudentId = async (studentId: string) => {
	const query = await sophomoreParticipant
		.select({
			filterByFormula: `student_id = ${studentId}`
		})
		.all();

	if (query.length === 0) return null;

	if (query[0].get('participate') !== 'ต้องการเล่นสายรหัสต่อ') {
		return null;
	}

	const data = {
		title: query[0].get('title') as 'นาย' | 'นางสาว',
		studentId: query[0].get('student_id') as string,
		firstname: query[0].get('firstname') as string,
		surname: query[0].get('surname') as string,
		nickname: query[0].get('nickname') as string,
		branch: query[0].get('branch'),
		facebook_link: query[0].get('facebook_link') as string,
		instragram_link: query[0].get('instagram_link') as string | undefined,
		many_fresh: query[0].get('many_fresh') as boolean,
		participate: query[0].get('participate') === 'ต้องการเล่นสายรหัสต่อ',
		phone: query[0].get('phone') as string,
		airtableId: query[0].getId(),
		hints: query[0].get('hints') as string | undefined,
		wontcome: query[0].get('wontcome') as boolean
	};

	return data;
};