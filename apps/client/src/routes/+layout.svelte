<script>
	import { browser } from '$app/environment';
	import '../app.postcss';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	// @ts-ignore
	import { pwaInfo } from 'virtual:pwa-info';

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
</svelte:head>

<QueryClientProvider client={queryClient}
	><div class="w-screen min-h-screen flex flex-col font-noto">
		<!-- <Header /> -->

		<main>
			<slot />
		</main>

		<!-- <LandingFooter /> -->
	</div>
</QueryClientProvider>
