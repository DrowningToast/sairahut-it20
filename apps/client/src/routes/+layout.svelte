<script>
	import Header from '$components/svelte/Header.svelte';
	import LandingFooter from '$components/svelte/LandingFooter.svelte';
	import '../app.postcss';
</script>

<div class="w-full min-h-screen flex flex-col">
	<Header />

	<main>
		<slot />
	</main>

	<LandingFooter />
</div>
