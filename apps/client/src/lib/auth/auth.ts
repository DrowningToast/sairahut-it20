import { AUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { SvelteKitAuth } from '@auth/sveltekit';
import { client } from 'database/db';
import Google from '@auth/core/providers/google';

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
			return !!checkKMITLDomain;
		}
	},
	pages: {
		error: '/unauthorized',
		signIn: '/home'
	}
});
