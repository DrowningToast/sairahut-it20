<script>
	import Button from '$components/ui/button/Button.svelte';
	import { signOut } from '@auth/sveltekit/client';
	import { LogOut } from 'lucide-svelte';

	export const redirect = '/';
</script>

<Button
	class="px-2 py-2 inline-block justify-center gap-x-2 w-auto"
	on:click={() => signOut({ callbackUrl: redirect })}
	><div class="flex items-center gap-x-1">
		<div class="w-8 grid place-items-center">
			<LogOut />
		</div>
		Signout
	</div></Button
>
