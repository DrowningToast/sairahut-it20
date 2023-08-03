<script lang="ts">
	import SrhButton from './SRHButton.svelte';
	import { Dialog, DialogTrigger } from '$components/ui/dialog';
	import DialogContent from '$components/ui/dialog/DialogContent.svelte';

	export let isLoading = false;
	export let disabled = false;
	export let triggerText = 'Step one';
</script>

<Dialog>
	<DialogTrigger
		><SrhButton class="relative px-12" type="button" {disabled} {isLoading}>{triggerText}</SrhButton
		></DialogTrigger
	>

	<DialogContent class="absolute top-16 inset-x-10 w-auto">
		<slot />
	</DialogContent>
</Dialog>
