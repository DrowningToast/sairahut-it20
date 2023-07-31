<script>
	/**
	 * Where to redirect when user successfully signs in
	 */
	export const onSuccessRedirect = '/home';

	import { page } from '$app/stores';
	import { AuthController } from '$lib/auth/AuthController';
	import GotoMainPageButton from './GotoMainPageButton.svelte';
	import LoginButton from './LoginButton.svelte';

	const { isSignedIn } = AuthController($page);
	console.log(isSignedIn);
</script>

{#if !isSignedIn}
	<LoginButton redirect={onSuccessRedirect} />
{:else}
	<GotoMainPageButton redirect={onSuccessRedirect} />
{/if}
