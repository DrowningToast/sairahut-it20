import { base } from '$lib/airtable-api/base';

export const seniorParticipant = base.table(
	process.env.NODE_ENV === 'production' ? 'senior - participants' : 'senior - participants - dev'
);
