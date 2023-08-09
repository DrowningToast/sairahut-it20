<script lang="ts">
	import { trpc } from '$lib/trpc';
	import { generateRandomString } from '$lib/utils';
	import { RotateCcw } from 'lucide-svelte';
	import { onMount } from 'svelte';

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
			console.log('plesae stop');
			clearInterval(intervalId);
		}
	};

	const handleLoadPasscode = async () => {
		isLoading = true;
		secret = '';
		const res = await trpc.sophomores.get;
		isLoading = false;
		updatePasscodeViewState();
	};

	onMount(() => {
		updatePasscodeViewState();
	});
</script>

<div class="relative">
	<h1 class="text-center text-white font-Pridi font-thin text-4xl mt-1">รหัสลับของคุณคือ</h1>
	<div
		class="relative flex justify-center items-center mx-6 py-6 bg-[#29436C]/10 rounded-3xl border-[#29436C] drop-shadow-[0px_4px_4px_black] border-solid border mt-5"
	>
		<img src="./konnok.png" alt="" class=" absolute left-5 h-3/5 transform -scale-x-100" />
		<h1 class="text-accent font-Pridi font-thin text-3xl">{passcodeViewModel}</h1>
		<img src="./konnok.png" alt="" class=" absolute right-5 h-3/5 transform" />
	</div>
	<div
		class="flex flex-col gap-y-10 justify-center items-center text-center font-Pridi text-sm text-accent font-extralight mt-10"
	>
		<div>
			<p>คำอธิบายการเล่น</p>
			<p class="px-2">
				จงให้น้องกรอกรหัสผ่านของเหล่าภูต โดยเมื่อเหล่าจอมเวทย์สะสมรหัสของภูต จะได้รับ Ember
				เพื่อไปแลกคำใบ้ของภูตตนเอง
			</p>
			<br />
			<p class="">เมื่อรหัสถูกใช้แล้วจะต้องรีเซ็ตใหม่ทุกรอบ</p>
		</div>
	</div>
</div>
<div
	class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full flex flex-col items-center"
>
	<button on:click={handleLoadPasscode} class="drop-shadow-[0px_0px_10px_#FFD130] mt-5">
		<RotateCcw size={36} color="white" strokeWidth={1.5} />
	</button>
	<img src="./konnok-footer.png" alt="" class=" my-2" />
	<div class="text-center text-accent px-5 font-Pridi font-thin">
		<p>คำอธิบาย</p>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel ducimus error repudiandae rem
			quod quaerat quisquam animi cumque ad excepturi!
		</p>
	</div>
</div>
