<script lang="ts">
	import { page } from '$app/stores';
	import { trpc } from '$lib/trpc';
	import { onMount } from 'svelte';
	import SRHButton from '../../../lib/components/svelte/SRHButton.svelte';
	import Input from '../../../lib/components/ui/input/Input.svelte';

	const initHints = async () => {
		const hintSlugs = await trpc.sophomores.getHintSlugs.query();
		hints = hintSlugs.map((hint) => {
			return {
				...hint,
				content: undefined
			};
		});
	};

	interface Hint {
		displayName: string;
		slug: string;
		content: undefined | string;
	}
	let hints: Hint[] = [];

	onMount(async () => {
		await initHints();
	});

	$: readyToSubmit =
		hints.filter((hint) => {
			return !!hint.content;
		}).length >= 10;

	const onSubmit = () => {
		// onsubmit
		// isAlreadySubmit = true;
	};
</script>

<div class=" drop-shadow-[0px_0px_7.5px_#FFAEBD] leading-10 text-white font-krub">
	<h1 class="text-2xl font-bold">คำใบ้ คำใจ คำใดๆ ที่สื่อถึงแก</h1>
	<p class=" font-thin leading-6 mt-4">คำใบ้ที่กวนๆ เหมาะสำหรับคณะที่กวนใจ (จะแสดงให้น้องเห็น)</p>
</div>

<div class="text-white flex flex-col gap-y-7 font-extralight font-krub mt-3">
	{#each hints as hint, index}
		<div class="flex flex-col gap-y-2">
			<p>{hint.displayName}</p>
			<Input class=" text-white bg-blue-400/25" bind:value={hints[index].content} />
		</div>
	{/each}
	<div class="flex justify-between mt-2">
		<!-- <div class="w-full flex justify-start">
			<SrhButton class="w-10/12" on:click={onReset}>รีเซ็ต</SrhButton>
		</div> -->
		<div class="w-full flex justify-end">
			<SRHButton class="w-7/12 mx-auto" on:click={onSubmit} disabled={!readyToSubmit}
				>บันทึก</SRHButton
			>
		</div>
	</div>
</div>
