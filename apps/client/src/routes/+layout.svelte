<script lang="ts">
	import { browser } from '$app/environment';
	import { userType } from '$lib/store/userType';
	import '../app.postcss';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	// @ts-ignore
	import { pwaInfo } from 'virtual:pwa-info';
	import { inject } from '@vercel/analytics';
	import { dev } from '$app/environment';
	import Analytics from '$components/svelte/Analytics.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { date } from 'zod';

	inject({ mode: dev ? 'development' : 'production' });

	$: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '';

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});

	let timer: NodeJS.Timeout | null = null;
	let timeToSaturday = 1692424800000 / 1000;
	let current = timeToSaturday - Date.now() / 1000;
	console.log(Date.now());
	$: seconds = 0;
	$: minutes = 0;
	$: hours = 0;

	onMount(() => {
		timer = setInterval(() => {
			current--;

			if (current <= 0) {
				return;
			}

			minutes = Math.floor(current / 60);
			seconds = Math.floor(current % 60);

			hours = Math.floor(minutes / 60);
			minutes = Math.floor(minutes % 60);
			// minutes = Number((current / 60).toFixed(0));
			// seconds = Number((current % 60).toFixed(0));

			// hours = Number((minutes / 60).toFixed(0));
			// minutes = Number((minutes % 60).toFixed(0));
		}, 1000);
	});

	onDestroy(() => {
		if (timer) {
			clearInterval(timer);
		}
	});
</script>

<svelte:head>
	{@html webManifestLink}
</svelte:head>

<Analytics />

<!-- Google Tag Manager (noscript) -->
<noscript
	><iframe
		src="https://www.googletagmanager.com/ns.html?id=GTM-PSLZWX5G"
		height="0"
		width="0"
		style="display:none;visibility:hidden"
	/></noscript
>
<!-- End Google Tag Manager (noscript) -->

<div
	class={`bg-gradient-to-b ${
		$userType === 'SOPHOMORE' ? 'from-primary' : 'from-primary-alt'
	} to-black hidden md:block min-h-screen relative`}
>
	<div
		class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-accent-alt border border-accent p-5 rounded-xl"
	>
		<h1 class="text-center font-Pridi text-3xl font-medium mb-5">ประกาศจากกระทรวงเวทมนตร์</h1>
		<h1 class=" font-Pridi text-xl font-normal">เรียน : ผู้มาเยือนโลกแห่งเวทมนตร์ทุกท่าน</h1>
		<div class="ml-3 mt-3 font-light">
			<p class="indent-6">
				เนื่องจากการจุติของจอมมาร
				ทำให้ผู้ที่มาเยือนโลกใบนี้ด้วยอุปกรณ์เวทมนตร์ชนิดดังต่อไปนี้ไม่สามารถเข้าสู่โลกเวทมนตร์ได้
			</p>
			<ul class="list-disc ml-10">
				<li>คอมพิวเตอร์</li>
				<li>Laptop</li>
				<li>Tablet</li>
			</ul>
			<p class="indent-6 mt-2">
				ทางสภาเวทมนต์จึงขอแนะนำให้ผู้มาเยือนทุกท่าน
				มาเยือนโลกใบนี้อีกครั้งด้วยอุปกรณ์เวทมนต์ชนิดโทรศัพท์พกพา
			</p>
		</div>
	</div>
</div>

<QueryClientProvider client={queryClient}
	><div class="w-screen min-h-screen flex flex-col font-noto md:hidden">
		<!-- <Header /> -->

		<main>
			<slot />
		</main>

		<!-- <LandingFooter /> -->
	</div>
</QueryClientProvider>
