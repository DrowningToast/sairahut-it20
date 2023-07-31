<script lang="ts">
	import SrhButton from './SRHButton.svelte';
	import { Dialog, DialogTrigger } from '$components/ui/dialog';
	import DialogContent from '$components/ui/dialog/DialogContent.svelte';

	export let isLoading = false;
	export let disabled = false;
	export let triggerText = 'Step one';
</script>

<Dialog>
	<SrhButton class="relative" type="button" {disabled} {isLoading}
		><DialogTrigger class="absolute inset-0">{triggerText}</DialogTrigger></SrhButton
	>
	<DialogContent class="absolute top-16 inset-x-10 w-auto">
		<slot />
	</DialogContent>
</Dialog>
