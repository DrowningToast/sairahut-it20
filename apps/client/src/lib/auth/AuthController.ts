import type { Page } from '@sveltejs/kit';

interface AuthControllerReturn {
	isSignedIn: boolean;
}

export const AuthController = (page: Page<Record<string, string>, string | null>) => {
	const session = page.data.session;

	const isSignedIn = !!session?.user?.email;
	const email = session?.user?.email;
	const name = session?.user?.name;
	const user = session?.user;

	console.log(isSignedIn);

	return { isSignedIn, email, name, user };
};
