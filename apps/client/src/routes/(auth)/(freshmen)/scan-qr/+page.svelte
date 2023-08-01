<script lang="ts">
	// https://github.com/t0ngk/sairahut/blob/main/src/routes/scanner/%2Bpage.svelte

	import { trpc } from '$lib/trpc';

	import { onMount } from 'svelte';
	import QrScanner from 'qr-scanner';

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
				console.log(data);
				// submitData(data);

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
		return () => destroyScanner();
	});
</script>

<div class="flex flex-col justify-center items-center gap-8">
	<p class="text-sm font-Pridi text-accent font-extralight mt-8">SCANNING...</p>
	<div class="relative w-full bg-neutral-900/25 p-8 rounded-3xl aspect-square">
		<video class="object-cover rounded-xl w-full h-full" bind:this={videoElement}>
			<track kind="captions" />
		</video>
	</div>
	<p class="text-sm font-Pridi text-accent font-extralight mt-5">
		ตามหา QR Code เพื่อรับ Spirit Shards
	</p>
</div>

<style>
	.corner {
		background: linear-gradient(to right, white 4px, transparent 4px) 0 0,
			linear-gradient(to right, white 4px, transparent 4px) 0 100%,
			linear-gradient(to left, white 4px, transparent 4px) 100% 0,
			linear-gradient(to left, white 4px, transparent 4px) 100% 100%,
			linear-gradient(to bottom, white 4px, transparent 4px) 0 0,
			linear-gradient(to bottom, white 4px, transparent 4px) 100% 0,
			linear-gradient(to top, white 4px, transparent 4px) 0 100%,
			linear-gradient(to top, black 4px, transparent 4px) 100% 100%;

		background-repeat: no-repeat;
		background-size: 20px 20px;
	}
</style>
