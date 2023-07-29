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
	class="bg-neutral-900 drop-shadow-[0px_0px_3px_#FFFADD]"
	><div class="flex items-center justify-center text-accent">
		<p class="">เข้าสู่ระบบด้วยบัญชีสถาบัน</p>
	</div>
</Button>
