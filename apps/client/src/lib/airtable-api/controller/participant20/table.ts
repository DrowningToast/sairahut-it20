import { base } from '$lib/airtable-api/base';

export const sophomoreParticipant = base.table(
	process.env.NODE_ENV === 'production' ? '20 - participant' : '20 - participant - dev'
);
