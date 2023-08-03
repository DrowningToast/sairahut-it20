import { AUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { SvelteKitAuth } from '@auth/sveltekit';
import { client } from 'database/db';
import Google from '@auth/core/providers/google';
import { AirtableController } from '$lib/airtable-api/controller';
import { determineYear } from '$lib/utils';

/**
 *
 * If the user hasn't registered, sign the user out
 *
 * @param email
 * @returns
 */
const checkForRegistration = async (email: string) => {
	const gen = determineYear(email);

	if (gen === 20) {
		const res = await AirtableController.participantIT20.getParticipantByStudentId(
			email.replace('@kmitl.ac.th', '')
		);
		return !!res;
	} else if (gen < 20) {
		const res = await AirtableController.participantSenior.getParticipantByStudentId(
			email.replace('@kmitl.ac.th', '')
		);
		return !!res;
	}

	return true;
};

export const AuthHook = SvelteKitAuth({
	providers: [
		//@ts-ignore
		Google({
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET
		})
	],
	adapter: PrismaAdapter(client),
	secret: AUTH_SECRET,
	callbacks: {
		signIn: async ({ profile }) => {
			// The user doesn't have an email will result in error
			if (!profile?.email) {
				return false;
			}

			console.log(profile);

			const checkKMITLDomain = profile?.email?.includes('@kmitl.ac.th');
			// check that user is School of IT Student
			const checkITStudent = profile?.email?.slice(2, 4) === '07';

			const checkUnregis = await checkForRegistration(profile?.email);

			console.log('yed hee');
			console.log(!!checkKMITLDomain && checkITStudent && checkUnregis);

			return !!checkKMITLDomain && checkITStudent && checkUnregis;
		}
	},
	pages: {
		error: '/unauthorized',
		signIn: '/home'
	}
});
