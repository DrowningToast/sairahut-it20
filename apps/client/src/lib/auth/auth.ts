import { AUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { SvelteKitAuth } from '@auth/sveltekit';
import { client } from 'database/db';
import Google from '@auth/core/providers/google';
import { AirtableController } from '$lib/airtable-api/controller';
import { determineYear } from '$lib/middlewares/firstTimeMiddleware';

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
		signIn: async ({ user, account, profile }) => {
			const checkKMITLDomain = profile?.email?.includes('@kmitl.ac.th');

			// The user doesn't have an email will result in error
			if (!profile?.email) {
				return false;
			}

			const checkUnregis = checkForRegistration(profile?.email);

			return !!checkKMITLDomain && checkUnregis;
		}
	},
	pages: {
		error: '/unauthorized',
		signIn: '/home'
	}
});
