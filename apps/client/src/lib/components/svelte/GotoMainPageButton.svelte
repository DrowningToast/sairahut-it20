<script>
	export const redirect = '/home';

	import Button from '$components/ui/button/Button.svelte';
	import { DoorOpen } from 'lucide-svelte';
</script>

<a href={redirect}
	><Button class="bg-neutral-900 drop-shadow-[0px_0px_3px_#FFFADD]"
		><div class="flex items-center justify-center text-accent">
			Enter the website
		</div></Button
	></a
>
