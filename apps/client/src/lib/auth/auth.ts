import { AUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { SvelteKitAuth } from '@auth/sveltekit';
import { client } from 'database/db';
import Google from '@auth/core/providers/google';
import { AirtableController } from '$lib/airtable-api/controller';
import { determineYear, shuffle } from '$lib/utils';
import { prisma } from '$lib/serverUtils';

/**
 * If the sophomore doesn't have their magic verse, create one
 * @param param0
 */
export const checkMagicVerse = async (email: string) => {
	// check if the user is a sophomore and if participating
	const user = await prisma.user.findUnique({
		where: {
			email
		},
		select: {
			email: true,
			sophomoreDetails: {
				select: {
					verses: true
				}
			},
			id: true,
			type: true
		}
	});

	if (user?.type === 'SOPHOMORE' && !user.sophomoreDetails?.verses.length) {
		// get all the magic verses
		const verses = await prisma.magicVerses.findMany({
			where: {
				wildcard: false
			}
		});

		// randomize 3 of them (no duplicate)
		const shuffled = shuffle(verses);
		const first = shuffled[0]!;
		const second = shuffled[1]!;
		const third = shuffled[2]!;

		// if the user sophomore, proceed to check for magic verses
		const sop = await prisma.sophomoreDetails.update({
			where: {
				userId: user.id
			},
			data: {
				verses: {
					connect: [first, second, third]
				}
			}
		});
	}
};

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
			clientSecret: GOOGLE_CLIENT_SECRET,
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code'
				}
			}
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

			const checkKMITLDomain = profile?.email?.includes('@kmitl.ac.th');
			// check that user is School of IT Student
			const checkITStudent = profile?.email?.slice(2, 4) === '07';

			const checkUnregis = await checkForRegistration(profile?.email);

			await checkMagicVerse(profile!.email!);

			return !!checkKMITLDomain && checkITStudent && checkUnregis;
		}
	},
	cookies: {
		pkceCodeVerifier: {
			name: 'next-auth.pkce.code_verifier',
			options: {
				httpOnly: true,
				sameSite: 'none',
				path: '/',
				secure: true
			}
		},
		csrfToken: {
			name: 'next-auth.csrf-token',
			options: {
				httpOnly: true,
				sameSite: 'none',
				path: '/',
				secure: true
			}
		}
	},
	pages: {
		error: '/unauthorized',
		signIn: '/home'
	}
});
