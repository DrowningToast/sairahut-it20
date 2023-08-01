<script>
	import { trpc } from '$lib/trpc';
	import { Loader, Loader2, RotateCcw } from 'lucide-svelte';
	import { onMount } from 'svelte';
	//@ts-ignore
	import QrCode from 'svelte-qrcode';

	$: secret = '';
	$: isLoading = true;

	// let qrPath: string = '../mock_qr.png';
	const initQr = async () => {
		isLoading = true;
		const res = await trpc.sophomores.getQRString.query();
		secret = res.secret;
		isLoading = false;
	};

	onMount(() => {
		initQr();
	});
</script>

<div class="relative">
	<div class=" drop-shadow-[0px_0px_7.5px_#FFAEBD] text-white font-krub mt-3">
		<h1 class="text-2xl font-bold leading-3">QR คิวใจ</h1>
		<p class=" font-thin leading-6 mt-4">สำหรับคุณพรี่ ๆ เอาไปให้น้องสแกน</p>
	</div>
	<div class="flex flex-col justify-center items-center w-full mt-16 gap-y-10">
		<div class="w-4/5 h-full grid place-items-center aspect-square bg-neutral-900 rounded-lg">
			{#if !isLoading}
				<QrCode
					className="bg-neutral-900 p-4 rounded-md"
					value={secret}
					color="white"
					background="#171717d9"
				/>
			{:else}
				<Loader color="white" size="64px" />
			{/if}
		</div>
		<div class="text-accent font-Pridi font-thin text-center px-10">
			<h5 class="font-semibold">คำอธิบาย</h5>
			<p>จงแสดง QR code ให้เหล่านักเวทย์แสกน</p>
			<br />
			<p>
				โดยเมื่อหากเหล่าภูตโดนแสกนโดยเหล่านักเวทย์แล้ว จะได้รับ Humanity เป็นการตอบแทน
				เพิ่มพลังและวิญญาณของมนุษย์เข้าไปในตัวภูต
			</p>
			<br />
			<p>หากเหล่านักเวทย์แสกนแล้ว ภูตจะต้องกด Refresh เพื่อสร้าง QR Code ขึ้นมาใหม่</p>
			<p />
		</div>
		<button class="drop-shadow-[0px_0px_10px_#FFD130]" on:click={initQr}>
			{#if !isLoading}
				<RotateCcw size={36} color="white" strokeWidth={1.5} />
			{/if}
		</button>
	</div>
</div>
