<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import SrhButton from '$components/svelte/SRHButton.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { trpc } from '$lib/trpc';

	const pageData = $page.data as PageData;

	interface IHint {
		content: string;
		slug: {
			slug: string;
			displayName: string;
		};
	}

	$: isLoading = false;
	$: readyToBuy = bells >= price;

	const handleBuyHint = () => async () => {
		isLoading = true;
		try {
			if (!readyToBuy) return;
			// buy the hint
			await trpc.freshmens.buyHint.query();

			// refresh this page data
			await fetchPageData();

			isLoading = false;
		} catch (e) {
			alert('An error has occureed, please try again later');
		}
	};

	const fetchPageData = async () => {
		const freshmen = await trpc.freshmens.getMyInfo.query();
		const _hints = await trpc.freshmens.getRevealedHints.query();
		const _price = await trpc.freshmens.getNextHintPrice.query();

		bells = freshmen?.passcodePoints as number;
		hints = _hints;
		price = _price;
	};

	let bells = pageData.points;
	$: bells;
	let price = pageData.price ?? Infinity;
	$: price;
	let hints: IHint[] = pageData.hints ?? [];

	console.log(hints);
</script>

<div class="font-krub text-white drop-shadow-[0px_0px_10px_#FFAEBD]">
	<h1 class="text-2xl font-bold">คำใบ้จากเหล่าภูต</h1>
	<p class="text-base">คำใบ้พวกนี้ จะนำพาเราไปเจอใครกันนะ</p>
	<p class="mt-4 mb-2 text-lg text-accent text-right">คุณกำลังมีอยู่ {bells} bells</p>
	<h2 class="text-4xl text-center my-6">{hints?.length}/10</h2>
</div>
<div class="flex flex-col gap-y-4 mt-3">
	{#each hints as hint}
		<div class="">
			<h5 class="mb-1 text-white">{hint.slug.displayName}</h5>
			<div
				class="bg-[#F58CB7]/25 rounded-2xl w-full py-2 px-3 shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]"
			>
				<p class="text-base text-white font-krub">{hint.content}</p>
			</div>
		</div>
	{/each}
	{#if hints.length < 10}
		<SrhButton on:click={handleBuyHint()} disabled={!readyToBuy} {isLoading} class="relative my-4">
			<div class="absolute inset-0 backdrop-blur-sm grid place-items-center">
				<p>ซื้อคำใบ้ในราคา {price} bells</p>
			</div>
			<p>ไม่มีอะไรทำหรอ หรือว่าอยากรู้อยากเห็น</p>
		</SrhButton>
	{/if}
</div>
