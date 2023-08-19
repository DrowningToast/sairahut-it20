import { AirtableController } from '$lib/airtable-api/controller';
import { determineYear } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const { user } = locals;

	let wontCome = false;
	const gen = determineYear(user!.email!);

	if (gen < 20) {
		const result = await AirtableController
			.participantSenior
			.getParticipantByStudentId(user?.sophomoreDetails?.student_id as string)
		wontCome = result?.wontcome as boolean
	} else if (gen === 20) {
		const result = await AirtableController
			.participantIT20
			.getParticipantByStudentId(user?.sophomoreDetails?.student_id as string)
		wontCome = result?.wontcome as boolean
	} else if (gen === 21) {
		const result = await AirtableController
			.participantIT21
			.getParticipantByStudentId(user?.freshmenDetails?.student_id as string)
		wontCome = result?.wontcome as boolean
	}

	return {
		...user,
		...user?.sophomoreDetails,
		...user?.freshmenDetails,
		...user?.faction,
		wontCome
	};
}) satisfies PageServerLoad;
