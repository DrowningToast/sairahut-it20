<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import QrScanner from 'qr-scanner';
    let qrScanner: QrScanner;
    let videoElement: HTMLVideoElement;

	const setScanner = () => {
		qrScanner = new QrScanner(
			videoElement,
			async ({ data }) => {
				console.log("fuck you!")
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
