<script lang="ts">
	// https://github.com/t0ngk/sairahut/blob/main/src/routes/scanner/%2Bpage.svelte

	import { trpc } from '$lib/trpc';

	import { onMount } from 'svelte';
	import QrScanner from 'qr-scanner';
	import { page } from '$app/stores';
	import { AuthController } from '$lib/auth/AuthController';

	let videoElement: HTMLVideoElement;
	let qrScanner: QrScanner;

	const submitData = async (id: string) => {
		const data = await trpc.freshmens.submitScannedQR.query(id);

		console.log(data);

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

<video class="rounded" bind:this={videoElement}>
	<track kind="captions" />
</video>
