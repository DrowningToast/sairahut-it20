<script lang="ts">
	import { page } from '$app/stores';
	import ConfirmDialog from '$components/svelte/ConfirmDialog.svelte';
	import Input from '$components/ui/input/Input.svelte';
	import type { PageServerData } from './$types';
	import SRHButton from './../../../../lib/components/svelte/SRHButton.svelte';
	import SRHHeading from './../../../../lib/components/svelte/SRHHeading.svelte';
	import { FacebookIcon, InstagramIcon } from 'lucide-svelte';
	import { z } from 'zod';
	// your script goes here
	const data = $page.data as unknown as PageServerData;
	const { email } = data;
	const pairs = data.pairs.map((pair) => ({
		...pair,
		hidden: true
	}));

	let confirmPrompt = '';
	$: confirmPrompt;
	let confirmReady = false;
	$: {
		confirmReady = email === confirmPrompt;
	}

	const confirmReveal = (index: number) => {
		pairs[index].hidden = false;
		confirmPrompt = '';
		confirmReady = false;
	};

	const handleConfirmReveal = (index: number) => () => confirmReveal(index);

	console.log(pairs);
</script>

<SRHHeading class="text-center">จอมเวทย์ของฉัน</SRHHeading>
<hr class="border border-white my-3" />
{#each pairs as pair, index}
	<div
		class="relative border border-[#AB9F7E] rounded-2xl overflow-hidden text-white font-krub flex flex-col gap-y-4 text-lg px-5 py-6 mt-5"
	>
		{#if pair.hidden}
			<!-- {#if false} -->
			<div class="absolute inset-0 bg-neutral-900/80 grid place-items-center backdrop-blur-lg">
				<!-- <div class="absolute inset-0 backdrop-blur-lg" />
		<SRHHeading>กดเพื่อเปิดดูน้อง</SRHHeading> -->
				<div>
					<ConfirmDialog triggerText="กดเพื่อเปิดดูน้อง">
						<form class="gap-y-2 flex flex-col">
							<h1 class="text-red-500 font-bold text-2xl">แน่ใจนะ?</h1>
							<p>
								สิ่งที่คุณกำลังจะทำต่อไปนี้ คุณกำลังจะเปิดดูว่าใครนั้นเป็นน้องของตนเอง
								คุณสามารถดูว่าน้องของตนเองเป็นใครนั้นกี่ครั้งก็ได้ แต่ว่า<bold
									class="font-extrabold">ข้อมูลต่อไปนี้นั้น ถือว่าเป็นความลับสำคัญ</bold
								> คุณแน่ใจนะว่าตอนนี้ไม่ได้มีใครยืนอยู่ด้านหลังคุณ
							</p>
							<br />
							<p>หากคุณต้องการดูข้อมูลของน้องจริงๆ กรุณากรอกอีเมลของคุณเพื่อเป็นการยืนยัน</p>
							<br />
							<div class="flex flex-col gap-y-4">
								<Input class="text-white bg-neutral-900/80 rounded-sm" bind:value={confirmPrompt} />
								<SRHButton on:click={handleConfirmReveal(index)} disabled={!confirmReady}
									>ยืนยัน</SRHButton
								>
							</div>
						</form>
					</ConfirmDialog>
				</div>
			</div>
		{/if}

		<div>
			<h1 class="text-lg font-semibold">
				{`${pair.freshmen.first_name} ${pair.freshmen.last_name}`}
			</h1>
			<h1 class="text-4xl font-bold">{pair.freshmen.nickname}</h1>
		</div>
		<div class="flex flex-row gap-2">
			{#if z.string().url().safeParse(pair.freshmen.facebook_link).success}
				<a href={pair.freshmen.facebook_link} target="_blank" rel="noreferrer">
					<FacebookIcon size={32} />
				</a>
			{/if}
			{#if z.string().url().safeParse(pair.freshmen.instagram_link).success}
				<a href={pair.freshmen.instagram_link} target="_blank" rel="noreferrer">
					<InstagramIcon size={32} />
				</a>
			{/if}
		</div>
	</div>
{/each}
<div class="flex w-full justify-center items-center mt-5">
	<a href="/home">
		<SRHButton class="px-16">กลับไปหน้าที่แล้ว</SRHButton>
	</a>
</div>
