<script lang="ts">
	import { trpc } from '$lib/trpc';

	import { onMount } from 'svelte';
	import QrScanner from 'qr-scanner';

	let videoElement: HTMLVideoElement;
	let isScanned = false;

	const submitData = async (id: string) => {
		const data = await trpc.freshmens.submitScannedQR.query(id);
		console.log(data);
	};

	const setScanner = () => {
		const qrScanner = new QrScanner(
			videoElement,
			async ({ data }) => {
				isScanned = true;

				submitData(data);

				qrScanner.stop();
			},
			{
				highlightScanRegion: true,
				onDecodeError() {}
			}
		);

		qrScanner.start();
	};

	onMount(() => {
		setScanner();
	});
</script>

<video class="rounded" bind:this={videoElement}>
	<track kind="captions" />
</video>
