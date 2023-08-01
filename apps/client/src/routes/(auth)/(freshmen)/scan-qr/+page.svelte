<script lang="ts">
	// https://github.com/t0ngk/sairahut/blob/main/src/routes/scanner/%2Bpage.svelte

	import { trpc } from '$lib/trpc';

	import { onMount } from 'svelte';
	import QrScanner from 'qr-scanner';
	import { page } from '$app/stores';
	import { AuthController } from '$lib/auth/AuthController';
	import SrhButton from '$components/svelte/SRHButton.svelte';

	let videoElement: HTMLVideoElement;
	let qrScanner: QrScanner;

	const submitData = async (id: string) => {
		const data = await trpc.freshmens.submitScannedQR.query(id);

		if (data.success === 0) {
			qrScanner.start();
		} else {
			qrScanner.stop();
		}
	};

	const setScanner = () => {
		qrScanner = new QrScanner(
			videoElement,
			async ({ data }) => {
				submitData(data);

				qrScanner.stop();
			},
			{
				highlightScanRegion: true,
				maxScansPerSecond: 1,
				onDecodeError() {}
			}
		);

		qrScanner.start();
	};

	const destroyScanner = () => {
		qrScanner.stop();
		qrScanner.destroy();
	};

	onMount(() => {
		setScanner();
	});
</script>

<div class="flex flex-col justify-center items-center gap-8">
	<p class="text-sm font-Pridi text-accent font-extralight mt-8">SCANNING...</p>
	<div class="relative w-full">
		<svg xmlns="http://www.w3.org/2000/svg" width="84" height="75" viewBox="0 0 84 75" fill="none" class="absolute top-0 left-0">
			<path d="M1 74.5L1 33.5C0.999993 19 5.86439 1.96762 34.5 1H83.7088" stroke="white" stroke-width="2"/>
		</svg>
		<svg xmlns="http://www.w3.org/2000/svg" width="84" height="75" viewBox="0 0 84 75" fill="none" class="absolute top-0 right-0">
			<path d="M82.7087 74.5L82.7087 33.5C82.7087 19 77.8443 1.96762 49.2087 1H-6.86646e-05" stroke="white" stroke-width="2"/>
		</svg>
		<svg xmlns="http://www.w3.org/2000/svg" width="84" height="75" viewBox="0 0 84 75" fill="none" class="absolute bottom-0 left-0">
			<path d="M1 0L1 41C0.999993 55.5 5.86439 72.5324 34.5 73.5H83.7088" stroke="white" stroke-width="2"/>
		</svg>
		<svg xmlns="http://www.w3.org/2000/svg" width="84" height="75" viewBox="0 0 84 75" fill="none" class="absolute bottom-0 right-0">
			<path d="M82.7087 0L82.7087 41C82.7087 55.5 77.8443 72.5324 49.2087 73.5H-6.86646e-05" stroke="white" stroke-width="2"/>
		</svg>
		<video class=" rounded-3xl my-5 w-full h-96 " bind:this={videoElement}>
			<track kind="captions" />
		</video>
	</div>
	<p class="text-sm font-Pridi text-accent font-extralight mt-5">แสกนQR code แล้วรับคำใบ้กันเลย!!</p>
	<SrhButton>กลับสู่หน้าหลัก</SrhButton>
</div>
