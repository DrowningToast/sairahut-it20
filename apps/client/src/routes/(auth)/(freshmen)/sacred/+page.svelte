<script lang="ts">
	import { ambientSound, secretMode } from '$lib/store/secret';
	import { onDestroy, onMount } from 'svelte';
	import type { PageData } from './$types';
	import SrhHeading from '$components/svelte/SRHHeading.svelte';
	import { Separator } from '$components/ui/separator';

	export let data: PageData;
	let ost: HTMLAudioElement | undefined = undefined;

	const logs = data.logs;

	onMount(() => {
		secretMode.set(true);
	});

	onDestroy(() => {
		secretMode.set(false);
		if ($ambientSound) {
			$ambientSound.pause();
			$ambientSound.currentTime = 0;
		}
	});
</script>

<SrhHeading class="text-accent text-center w-full text-4xl font-bold shadow-2xl font-krub">
	{data.reached ? 'ความลับของเจ้าคือ' : 'เจ้ายังไม่พร้อม'}
</SrhHeading>

{#if data.reached}
	<SrhHeading class="text-center text-sm">
		จากภูตที่เจ้าล่ามานั้น {data.detectPair
			? 'ข้าเห็นภูตประจำตัวเจ้าอยู่'
			: 'ข้าไม่เจอภูตประจำตัวเจ้าเลย'}
	</SrhHeading>
{/if}

<img src="./konnok-footer.png" alt="" />

<div class="text-white flex flex-col gap-y-2">
	<h2 class="text-lg font-krub">ภูตเป้าหมาย: {data.user?.faction?.name}</h2>
	<h1 class="text-2xl font-Pridi">
		รายชื่อภูตที่ตามล่าได้ ({data.logs.length} / {data.threshold})
	</h1>
	<p class="text-white font-light mt-2">
		จงไปล้วงความลับของภูตเหล่านั้นมาและสังเวยให้ข้า แล้วข้าจะให้รางวัลแก่เจ้า
	</p>
	<Separator class="my-4" />

	<div class="flex flex-col gap-y-2 mt-6">
		{#each logs as log, i}
			<p class="text-accent text-center">
				({i + 1}) <span class="font-semibold">{log.owner.nickname}</span> ({log.owner.fullname})
			</p>
		{/each}
	</div>
</div>
