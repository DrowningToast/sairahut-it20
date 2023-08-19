<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import QrScanner from 'qr-scanner';
	let qrScanner: QrScanner;
	let videoElement: HTMLVideoElement;

	const setScanner = () => {
		qrScanner = new QrScanner(
			videoElement,
			async ({ data }) => {
				qrScanner.stop();
				console.log('fuck you 1');
				await handleScan(data);
				qrScanner.start();
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
		qrScanner?.stop();
		qrScanner?.destroy();
	};

	export let handleScan: (input: string) => Promise<any | void> = async (input) => {};

	onMount(() => {
		setScanner();
	});

	onDestroy(() => {
		destroyScanner();
	});
</script>

<div class="relative w-full bg-neutral-900/25 p-8 rounded-3xl aspect-square">
	<video class="object-cover rounded-xl w-full h-full" bind:this={videoElement}>
		<track kind="captions" />
	</video>
</div>
