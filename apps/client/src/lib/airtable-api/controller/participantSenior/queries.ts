import { seniorParticipant } from "./table";

export const getParticipantByStudentId = async (studentId: string) => {
	const query = await seniorParticipant
		.select({
			filterByFormula: `student_id = ${studentId}`
		})
		.all();

	if (query.length === 0) return null;

	const data = {
		title: query[0].get('title') as 'นาย' | 'นางสาว',
		studentId: query[0].get('student_id') as string,
		firstname: query[0].get('name') as string,
		surname: query[0].get('surname') as string,
		nickname: query[0].get('nickname') as string,
		branch: query[0].get('branch'),
		facebook_link: query[0].get('facebook') as string,
		instragram_link: query[0].get('instagram') as string,
		many_fresh: query[0].get('many_fresh') as boolean,
		phone: query[0].get('phone') as string,
		airtableId: query[0].getId(),
		hints: query[0].get('hints') as string
	};

	return data;
};