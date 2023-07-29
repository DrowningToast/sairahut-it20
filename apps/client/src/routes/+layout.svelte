<script>
	import { browser } from '$app/environment';
	import Header from '$components/svelte/Header.svelte';
	import LandingFooter from '$components/svelte/LandingFooter.svelte';
	import '../app.postcss';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});
</script>

<QueryClientProvider client={queryClient}
	><div
		class="w-screen min-h-screen flex flex-col font-noto bg-gradient-to-b from-primary to-black"
	>
		<!-- <Header /> -->

		<main>
			<slot />
		</main>

		<!-- <LandingFooter /> -->
	</div>
</QueryClientProvider>
