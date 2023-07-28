<script lang="ts">
	import { trpc } from '$lib/trpc';

	const submitData = async (id: string) => {
		const data = await trpc.freshmens.submitScannedQR.query(id);
		console.log(data);
	};
</script>

<button on:click={() => submitData('clkmn62f4000008l27sw5guot')}
	>This button is placeholder for when qr is scanned</button
>
