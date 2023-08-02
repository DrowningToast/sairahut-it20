<script lang="ts">
	import Button from '$components/ui/button/Button.svelte';
	import { cn } from '$lib/utils';
	import { signOut } from '@auth/sveltekit/client';
	import { LogOut } from 'lucide-svelte';

	let className: string = '';

	export { className as class };
	export const redirect = '/';
</script>

<Button
	class={cn(' bg-white relative w-full overflow-hidden', className)}
	on:click={() => signOut({ callbackUrl: redirect })}
	><div
		class="flex items-center justify-center text-accent bg-neutral-900/20 inset-0 absolute text-red-400"
	>
		ออกจากระบบ
	</div></Button
>
