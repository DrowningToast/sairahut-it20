<script lang="ts">
	import { page } from '$app/stores';
	import LoginButton from '$components/svelte/LoginButton.svelte';
	import { trpc } from '$lib/trpc/client';

	let greeting = 'press the button to load data';
	let loading = false;

	const loadData = async () => {
		console.log('bruh moment');
		loading = true;
		greeting = await trpc($page).greeting.query();
		loading = false;
	};
</script>

<a
	href="#load"
	role="button"
	class="secondary"
	aria-busy={loading}
	on:click|preventDefault={loadData}>Load</a
>
<p>{greeting}</p>

<LoginButton />
