<script lang="ts">
	import Textarea from '$components/ui/textarea/Textarea.svelte';

	export let secret = '';
</script>

{#if secret}
	<Textarea readonly bind:value={secret} />
{:else}
	<Textarea disabled value={'???'} />
{/if}
