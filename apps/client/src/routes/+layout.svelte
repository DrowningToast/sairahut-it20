<script>
	import { browser } from '$app/environment';
	import { userType } from '$lib/store/userType';
	import '../app.postcss';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	// @ts-ignore
	import { pwaInfo } from 'virtual:pwa-info';
	import { inject } from '@vercel/analytics';
	import { dev } from '$app/environment';

	inject({ mode: dev ? 'development' : 'production' });

	$: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '';

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});
</script>

<svelte:head>
	{@html webManifestLink}
	<!-- Google Tag Manager -->
	<!-- Google Tag Manager -->
	<!-- Google Tag Manager -->
	<!-- Google Tag Manager -->
	<!-- Google Tag Manager -->
	<script>
		(function (w, d, s, l, i) {
			w[l] = w[l] || [];
			w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
			var f = d.getElementsByTagName(s)[0],
				j = d.createElement(s),
				dl = l != 'dataLayer' ? '&l=' + l : '';
			j.async = true;
			j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
			f.parentNode.insertBefore(j, f);
		})(window, document, 'script', 'dataLayer', 'GTM-PSLZWX5G');
	</script>
	<!-- End Google Tag Manager -->

	<!-- Google tag (gtag.js) -->
	<!-- Google tag (gtag.js) -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-ERKJH95ZY2"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());

		gtag('config', 'G-ERKJH95ZY2');
	</script>
</svelte:head>

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
