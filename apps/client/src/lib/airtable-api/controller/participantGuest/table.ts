import { base } from '$lib/airtable-api/base';

export const guestParticipant = base.table(
	process.env.NODE_ENV === 'production'
		? 'senior - not_registered'
		: 'senior - not_registered - dev'
);
