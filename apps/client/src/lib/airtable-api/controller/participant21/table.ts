import { base } from '$lib/airtable-api/base';

export const freshmenParticipant = base.table(
	process.env.NODE_ENV === 'production' ? '21 - participants' : '21 - participants - dev'
);
