<script lang="ts">
	import { goto } from '$app/navigation';
	import { trpc } from '$lib/trpc';
	import { ThisOrThat } from 'database';

	const thisOrThat: ThisOrThat[] = [
		ThisOrThat.LEFT,
		ThisOrThat.RIGHT,
		ThisOrThat.LEFT,
		ThisOrThat.RIGHT,
		ThisOrThat.LEFT,
		ThisOrThat.RIGHT,
		ThisOrThat.LEFT,
		ThisOrThat.RIGHT,
		ThisOrThat.LEFT,
		ThisOrThat.RIGHT
	];

	const submitData = async () => {
		await trpc.sophomores.submitThisOrThat.mutate(thisOrThat);
		goto('/home')
	};
</script>

<h1>This is a placeholder for this or that page</h1>

<button on:click={submitData}>Submit</button>
