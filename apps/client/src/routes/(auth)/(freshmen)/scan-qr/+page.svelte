<script lang="ts">
	interface FoundTarget {
		fullname: string;
		nickname: string;
		gen: number;
		quota: number;
		secret: string;
		already: boolean;
	}

	import { trpc } from '$lib/trpc';

	import { onDestroy, onMount } from 'svelte';
	import QrScanner from 'qr-scanner';
	import SrhButton from '$components/svelte/SRHButton.svelte';
	import { determineYear, slientSound } from '$lib/utils';
	import Alert from '$components/ui/alert/Alert.svelte';
	import AlertTitle from '$components/ui/alert/AlertTitle.svelte';
	import AlertDescription from '$components/ui/alert/AlertDescription.svelte';

	let videoElement: HTMLVideoElement;
	let qrScanner: QrScanner;
	let found: FoundTarget | undefined;

	$: found = undefined;
	$: isLoading = false;
	$: success = false;

	const handleScan = async (secret: string) => {
		qrScanner.stop();
		found = undefined;

		const res = await trpc.freshmens.getQRInfo.query(secret);

		if (!res?.owner?.fullname) {
			qrScanner.start();
			return alert('Invalid QR Code');
		}

		found = {
			fullname: res?.owner!.fullname!,
			nickname: res?.owner!.nickname!,
			gen: determineYear(res?.owner!.student_id!),
			quota: res?.quota!,
			secret: res?.secret!,
			already: res?.already
		};
	};

	const handleSubmit = async (secret: string) => {
		isLoading = true;

		try {
			const data = await trpc.freshmens.submitScannedQR.query(secret);

			success = true;
			qrScanner.start();

			// play sfx
			const rewardSFX = new Audio();
			rewardSFX.autoplay = true;
			rewardSFX.src = slientSound;
			rewardSFX.src = '/sfx/RewardSFX.ogg';

			setTimeout(() => {
				found = undefined;
				success = false;
			}, 5000);
		} catch (e) {
			alert('An error has occured while trying to submit');
			found = undefined;
			isLoading = false;
		}
	};

	const setScanner = () => {
		qrScanner = new QrScanner(
			videoElement,
			async ({ data }) => {
				handleScan(data);
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

{#if found && !success}
	<div class="fixed inset-0 grid place-items-center z-20">
		<div class="absolute inset-0 bg-gray-50/25" />
		<div class="bg-neutral-900 mx-12 p-8 flex flex-col gap-y-2 z-10 rounded-lg">
			<h1 class="text-accent text-lg font-semibold">เจอภูตแล้ว!</h1>
			<p class="text-accent whitespace-pre-wrap text-left">
				ภูตตัวนี้นั้นมีชื่อว่า {found.nickname} รุ่นที่ {found.gen}
			</p>
			<p class="text-accent text-center">
				({found.fullname})
			</p>
			<p class="text-accent text-left">
				และดูเหมือนว่าเจ้านั้น{found.already
					? 'เคยจับได้แล้ว!'
					: found.quota >= 1
					? 'จะยังไม่ได้จับ!'
					: 'มาช้าเกินไปจนถูกคนอื่นจับไปแล้ว... ถ้าเป็นไปได้ลองให้เค้า refresh QR Code ดูได้ไหม?'}
			</p>
			<div class="mt-12 flex flex-col gap-y-4">
				<SrhButton
					on:click={() => {
						if (!found?.secret) return;
						handleSubmit(found?.secret);
						qrScanner.start();
					}}
					disabled={found.quota < 1 || found.already}
					{isLoading}>จับเลย!</SrhButton
				>
				<SrhButton
					{isLoading}
					on:click={() => {
						qrScanner.start();
						found = undefined;
					}}>ยกเลิก</SrhButton
				>
			</div>
		</div>
	</div>
{/if}

{#if success && found?.nickname}
	<Alert class="bg-neutral-900/25 text-accent border-accent">
		<AlertTitle>สำเร็จ!</AlertTitle>
		<AlertDescription>คุณได้จับภูต {found?.nickname} เรียบร้อยแล้ว!</AlertDescription>
	</Alert>
{/if}

<div class="flex flex-col justify-center items-center gap-8">
	<p class="text-sm font-Pridi text-accent font-extralight mt-8">SCANNING...</p>
	<div class="relative w-full bg-neutral-900/25 p-8 rounded-3xl aspect-square">
		<video class="object-cover rounded-xl w-full h-full" bind:this={videoElement}>
			<track kind="captions" />
		</video>
	</div>
	<p class="text-sm font-Pridi text-accent font-extralight mt-5">
		ตามหา QR Code จากเหล่าภูตเพื่อรับ Spirit Shards
	</p>
</div>
