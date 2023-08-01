<script>
	import Button from '$components/ui/button/Button.svelte';
	import { signOut } from '@auth/sveltekit/client';
	import { LogOut } from 'lucide-svelte';

	export const redirect = '/';
</script>

<Button
	class="px-2 py-2 inline-block justify-center gap-x-2 w-auto bg-neutral-900 drop-shadow-[0px_0px_3px_#FFFADD]"
	on:click={() => signOut({ callbackUrl: redirect })}
	><div class="flex items-center justify-center text-accent">ออกจากระบบ</div></Button
>
