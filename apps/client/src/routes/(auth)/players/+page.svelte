<script lang="ts">
	import { trpc } from '$lib/trpc';
	import type { SophomoreDetails } from 'database';
	import { onMount } from 'svelte';

	let data: any;

	onMount(async () => {
		data = await trpc.sophomores.getAllSophomores.query({
			first: 0,
			last: 9,
			queryBy: 'STUDENT_ID',
			q: '65070171'
		});
	});
</script>

{#if data}
	{#each data as d}
		<p class="text-white">{d.nickname}</p>
	{/each}
{/if}
