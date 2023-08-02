<script>
	import { browser } from '$app/environment';
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
	><div class="w-screen min-h-screen flex flex-col font-noto">
		<!-- <Header /> -->

		<main>
			<slot />
		</main>

		<!-- <LandingFooter /> -->
	</div>
</QueryClientProvider>
