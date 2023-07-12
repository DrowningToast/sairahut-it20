<script>
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import { KeyRound } from 'lucide-svelte';
	import Button from '$components/ui/button/Button.svelte';

	export const redirect = '/home';
</script>

<Button
	on:click={() =>
		signIn('google', {
			callbackUrl: redirect
		})}
	><div class="flex items-center gap-x-1">
		<div class="w-8 grid place-items-center"><KeyRound /></div>
		Sign in with Google
	</div>
</Button>
