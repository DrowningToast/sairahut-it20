<script lang="ts">
	import { trpc } from '$lib/trpc';
	import { generateRandomString } from '$lib/utils';
	import { RotateCcw } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { draw, fade, slide } from 'svelte/transition';

	let intervalId: NodeJS.Timer;
	$: secret = '';
	$: isLoading = true;
	$: passcodeViewModel = generateRandomString(6);

	const updatePasscodeViewState = () => {
		if (isLoading) {
			intervalId = setInterval(() => {
				passcodeViewModel = generateRandomString(6);
			}, 100);
		} else {
			clearInterval(intervalId);
		}
	};

	const handleLoadPasscode = async () => {
		isLoading = true;
		secret = '';
		updatePasscodeViewState();
		const res = await trpc.sophomores.getPasscode.query();
		secret = res.payload.content;
		passcodeViewModel = secret;
		isLoading = false;
		updatePasscodeViewState();
	};

	onMount(() => {
		handleLoadPasscode();
		updatePasscodeViewState();
	});
</script>

<div class="relative">
	<h1 class="text-center text-white font-Pridi font-thin text-4xl mt-1">รหัสลับของคุณคือ</h1>
	<div
		class="relative flex justify-center items-center mx-6 py-6 bg-[#29436C]/10 rounded-3xl border-[#29436C] drop-shadow-[0px_4px_4px_black] border-solid border mt-5"
	>
		<img src="./konnok.png" alt="" class=" absolute left-5 h-3/5 transform -scale-x-100" />
		{#if isLoading}
			<h1 class="text-gray-500 font-Pridi font-thin text-3xl">
				{passcodeViewModel}
			</h1>
		{:else}
			<h1 in:fade={{ duration: 200, delay: 100 }} class="text-accent font-Pridi font-thin text-3xl">
				{secret}
			</h1>
		{/if}

		<img src="./konnok.png" alt="" class=" absolute right-5 h-3/5 transform" />
	</div>
	<div
		class="flex flex-col gap-y-10 justify-center items-center text-center font-Pridi text-sm text-accent font-extralight mt-10"
	>
		<div>
			<p>คำอธิบายการเล่น</p>
			<p class="px-2">
				จงให้น้องกรอกรหัสผ่านของเหล่าภูต โดยเมื่อเหล่าจอมเวทย์สะสมรหัสของภูต จะได้รับ Bells
				เพื่อไปแลกคำใบ้ของภูตตนเอง
			</p>
			<br />
			<p class="px-2">น้องนั้นจะสามารถนำ Bells ไปแลกคำใบ้ภูตของตนเองได้</p>
			<br />
			<p class="">เมื่อรหัสถูกใช้แล้วจะต้องรีเซ็ตใหม่ทุกรอบ</p>
		</div>
		<a
			href="/take-passcode-history"
			class="text-accent text-xs font-Pridi font-extralight decoration-solid bg-[#29436c2b] px-3 py-2 border-2 border-[#29436C] rounded-md mt-5"
			>ดูประวัติการกรอกรหัส</a
		>
	</div>
</div>
<div class=" w-full flex flex-col items-center">
	<button on:click={handleLoadPasscode} class="drop-shadow-[0px_0px_10px_#FFD130] mt-5">
		<RotateCcw size={36} color="white" strokeWidth={1.5} />
	</button>
	<img src="./konnok-footer.png" alt="" class=" my-2" />
</div>
