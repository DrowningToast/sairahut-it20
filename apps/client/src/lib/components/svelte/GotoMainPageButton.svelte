<script>
	export const redirect = '/home';

	import Button from '$components/ui/button/Button.svelte';
	import { DoorOpen } from 'lucide-svelte';
</script>

<a href={redirect}
	><Button
		><div class="flex items-center gap-x-1">
			<div class="w-8 grid place-items-center">
				<DoorOpen />
			</div>
			Enter the website
		</div></Button
	></a
>
