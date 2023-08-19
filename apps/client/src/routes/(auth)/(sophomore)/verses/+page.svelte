<script lang="ts">
	import ConfirmDialog from '$components/svelte/ConfirmDialog.svelte';
	import SrhButton from '$components/svelte/SRHButton.svelte';
	import Input from '$components/ui/input/Input.svelte';
	import { Loader, RotateCcw } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { trpc } from '$lib/trpc';
	import { onMount } from 'svelte';
	import SrhHeading from '$components/svelte/SRHHeading.svelte';
	import { page } from '$app/stores';

	//@ts-ignore
	import QrCode from 'svelte-qrcode';

	let data = $page.data as PageData;

	const words = data.magicVerses?.verses.map((verse) => verse.name);
	// [data.magicVerses?.verses[0], 'CHIVALRY', 'CRACKPOT'];

	$: isLoading = true;
	$: secret = 'ABCDEF';
	let sfx: undefined | HTMLAudioElement;

	const initQr = async () => {
		sfx = undefined;
		isLoading = true;
		const res = await trpc.sophomores.getMagicVerseID.query();

		secret = res.content;
		isLoading = false;
	};

	onMount(() => {
		sfx = new Audio('/sfx/Murmur_small.mp3');
		sfx.volume = 0.2;
		sfx.play();

		initQr();
	});

	let showSecret = false;
	$: showSecret;

	console.log($page.data);
	console.log(data.idInfo);

	const sophomorePair = {
		firstname: data.idInfo.sophomoreDetails.fullname,
		ninkname: data.idInfo.sophomoreDetails.nickname,
		img: `/factions/${data.user?.faction?.handler}.webp`,
		family: data.user?.faction?.name
	};

	$: confirmPrompt = '';
	$: disableEnableSecretButton = confirmPrompt !== data.user?.email;
</script>

<!-- {#if !showSecret} -->
<!-- SHOW THE QR CODE TO THE FRESHMEN -->
<div class="flex flex-col justify-center items-center w-full gap-y-8">
	<SrhHeading>ภูตและคาถา</SrhHeading>
	<div class="w-4/5 h-full grid place-items-center aspect-square bg-white rounded-lg">
		{#if !isLoading}
			{#if secret.length > 0}
				<QrCode value={secret} class="code" />
			{:else}
				<QrCode value="Type your text" class="code" />
			{/if}
		{:else}
			<Loader color="black" size="64px" />
		{/if}
	</div>
	<button class="w-9 h-9 drop-shadow-[0px_0px_10px_#FFD130]" on:click={initQr}>
		{#if !isLoading}
			<RotateCcw size={36} color="white" strokeWidth={1.5} />
		{/if}
	</button>
</div>
<div class="relative text-center my-8">
	<div
		class="border-accent-alt border rounded-full px-16 py-1 bg-gray-900 inline-block z-10 absolute inset-x-5 top-0 transform -translate-y-1/2"
	>
		<h4 class="font-Pridi text-[#F7B962] drop-shadow-[0px_0px_5px_#FFEC8A]">HOW TO PLAY</h4>
	</div>
	<div class="border-accent-alt border pt-12 pb-4 px-8 flex flex-col gap-y-2">
		<p class="text-white text-sm font-thin font-Pridi">
			เหล่าจอมเวทย์จะเดินไปหาภูตที่จอมเวทย์คิดว่าเป็นภูตของตนเอง จากนั้นจะทำแสกน QR Code
			เพื่อทำการเริ่มคลายมนตร์ของจอมมาร โดยเหล่าจอมเวทย์จะต้องทำการร่ายทั้ง 3
			คาถาในลำดับให้ถูกต้องเพื่อคลายมนตร์และตรวจสอบว่าพี่นั้นเป็นภูตรหัสของตนเองหรือไม่
		</p>
		<img src="../close.png" alt="" />
	</div>
</div>
{#if !showSecret}
	<ConfirmDialog triggerText="ให้พี่กดเพื่อดูคาถาของตนเอง">
		<form class="gap-y-2 flex flex-col text-sm">
			<h1 class="text-red-500 font-bold text-2xl">แน่ใจนะ?</h1>
			<p>
				สิ่งที่คุณกำลังจะทำต่อไปนี้ คุณกำลังจะเปิดดูว่าเวทมนตร์คาถาของตัวเองโดยน้องๆ
				จะมีหน้าที่เดาคาถาของเราว่ามันคืออะไร โดยน้องจะต้องจ่ายด้วย Spirit Shards (แต้ม) ที่น้องมี <span
					class="font-bold text-red-500"
					>โดยหน้าเฉลยคาถาของพี่นั้นห้ามน้องหรือพี่คนอื่นเห็นโดยเด็ดขาด</span
				>
				โดยหากพี่ต้องการจะดูว่าคาถาของน้องคืออะไร กรุณามั่นใจก่อนว่าไม่มีกำลังยืนอยู๋ข้างหลังคุณและเมื่อได้ดูแล้ว
				<span class="font-bold text-red-500">กรุณาจำไว้ห้ามลืม</span> โดยตำแหน่งและลำดับของคาถานั้นห้ามสลับ
				น้องจึงจะตอบถูก
			</p>
			<p class="mt-4">
				หากคุณต้องการดูข้อมูลของคุณจริงๆ กรุณากรอกอีเมลของคุณเพื่อเป็นการยืนยัน
				หากไม่สามารถดูได้ให้ติดต่อผู้พัฒนาระบบให้เร็วที่สุด
			</p>
			<br />
			<div class="flex flex-col gap-y-4">
				<Input class="text-white bg-neutral-900/80 rounded-sm" bind:value={confirmPrompt} />
				<SrhButton
					on:click={() => {
						showSecret = true;
						confirmPrompt = '';
					}}
					disabled={disableEnableSecretButton}>ยืนยัน</SrhButton
				>
			</div>
		</form>
	</ConfirmDialog>
{:else}
	<div class="flex flex-col w-full gap-y-7">
		<div class="flex flex-col items-center text-white font-krub drop-shadow-[0px_0px_10px_#FFAEBD]">
			<h1 class="font-bold text-2xl">รหัสภูต</h1>
			<p class="font-extralight">เป็นอักขระที่น่าพิศวงจริงๆ</p>
		</div>

		<div class="w-full flex flex-col items-center gap-y-5 px-5">
			{#if words?.length}
				{#each words as word}
					<div
						class="bg-[#472D1C] border-2 border-[#AB9F7E] w-full text-center py-3 drop-shadow-[0px_0px_5px_#FFEE96] rounded-2xl"
					>
						<p class="text-white font-Pridi text-2xl drop-shadow-[0px_0px_7.5px_#FFF5C0]">{word}</p>
					</div>
				{/each}
			{/if}
		</div>

		<div class="w-full h-full flex flex-col items-center justify-center">
			<div
				class="w-full overflow-visible flex justify-center gap-x-10 items-center py-4 bg-cover object-cover relative h-36 pt-4"
			>
				<img src="./bg-seirei2.png" class="absolute inset-0 mx-auto" alt="background cover" />
				<div class={`grid place-items-center`}>
					<img class="w-20 h-20" src={sophomorePair.img} alt="" />
				</div>
				<div class={`font-krub text-base font-normal text-white drop-shadow-[0px_0px_5px_#FFF5C0]`}>
					<p>เผ่า: {sophomorePair.family}</p>
					<p>ชื่อ: {sophomorePair.firstname}</p>
					<p>ชื่อเล่น: {sophomorePair.ninkname}</p>
				</div>
			</div>
		</div>

		<h1 class="text-[#FFF8D4] text-center font-krub drop-shadow-[0px_0px_2px_#FFF8D4]">
			เหล่าจอมเวทย์ กำลังตามหาท่านอยู่
		</h1>

		<SrhButton on:click={() => (showSecret = false)}>กดตรงนี้เพื่อซ่อนคาถาตนเอง</SrhButton>
	</div>
{/if}
