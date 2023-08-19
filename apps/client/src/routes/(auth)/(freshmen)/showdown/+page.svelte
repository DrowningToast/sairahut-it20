<script lang="ts">
	import SRHButton from './../../../../lib/components/svelte/SRHButton.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import QrScaner from '../../../../lib/components/svelte/QrScaner.svelte';
	import SrhHeading from '../../../../lib/components/svelte/SRHHeading.svelte';
	import { trpc } from '$lib/trpc';
	import Dropdown from '$components/svelte/Dropdown.svelte';
	import Showdown from './showdown.svelte';
	import type { AnswerResult, CachedResults, ISophomoreTarget } from '$lib/utils';

	export let data: PageData;

	let sophomoreTarget: undefined | ISophomoreTarget = undefined;

	const handleScan = async (input: string) => {
		try {
			const res = await trpc.freshmens.submitShowdownQR.query({
				qrCodeContent: input
			});
			sophomoreTarget = {
				id: res.payload.target.sophomoreDetailsId,
				firstname: res.payload.target.sophomoreDetails.fullname.split(' ')[0],
				lastname: res.payload.target.sophomoreDetails.fullname.split(' ')[1],
				nickname: res.payload.target.sophomoreDetails.nickname,
				student_id:
					res.payload.target.sophomoreDetails.user.email?.replace('@kmitl.ac.th', '') ?? '',
				img: `/factions/${res.payload.target.sophomoreDetails.user?.faction?.handler}.webp`,
				faction: res.payload.target.sophomoreDetails?.user?.faction?.name ?? '???'
			};
			starterVerses = res.payload.starter.map((verse) => (verse ? verse.name : undefined));
			const res2 = await trpc.freshmens.getLatestMagicVerse.query({
				sophomoreId: sophomoreTarget.id!
			});
			last = res2.payload.lastCast;
		} catch (e) {
			console.log(e);
			alert('Invalid QR Code');
		}
	};

	// starter information or cached information
	let starterVerses: (null | undefined | string)[] = [];

	// cached result from last time
	let last: CachedResults | undefined;
</script>

{#if sophomoreTarget}
	<Showdown {last} {starterVerses} {data} {sophomoreTarget} />
{:else}
	<SrhHeading class="text-center mb-6">ค้นหาภูต</SrhHeading>
	<QrScaner {handleScan} />
{/if}
