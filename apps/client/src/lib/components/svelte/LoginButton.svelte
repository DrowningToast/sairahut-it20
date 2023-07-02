<script>
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import { KeyRound } from 'lucide-svelte';
	import Button from '$components/ui/button/Button.svelte';
</script>

<Button
	class="px-2 py-2 inline-block justify-center gap-x-2 w-auto"
	on:click={() => signIn('google')}
	><div class="flex items-center gap-x-1">
		<div class="w-8 grid place-items-center"><KeyRound /></div>
		Sign in with Google
	</div>
</Button>
