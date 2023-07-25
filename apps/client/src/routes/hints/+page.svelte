<script lang="ts">
	import { trpc } from '$lib/trpc';
	import { ThisOrThat } from 'database';

	const hints: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

	const submitData = async () => {
		await trpc.sophomores.submitHints.mutate(hints);
	};
</script>

<h1>Placeholder Hints</h1>

<button on:click={submitData}>Submit</button>
