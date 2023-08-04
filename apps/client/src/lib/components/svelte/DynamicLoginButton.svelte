<script>
	/**
	 * Where to redirect when user successfully signs in
	 */
	export const onSuccessRedirect = '/home';

	import { createQuery } from '@tanstack/svelte-query';
	import GotoMainPageButton from './GotoMainPageButton.svelte';
	import LoginButton from './LoginButton.svelte';
	import { trpc } from '$lib/trpc';

	const getUser = async () => {
		const user = await trpc.auth.getUser.query();
		return user;
	};

	$: userQuery = createQuery({
		queryKey: ['userInfo', 'asd'],
		queryFn: getUser,
		enabled: true
	});

	$: isSignedIn = !!$userQuery?.data?.ctx;
</script>

{#if !isSignedIn}
	<LoginButton redirect={onSuccessRedirect} />
{:else}
	<GotoMainPageButton redirect={onSuccessRedirect} />
{/if}
