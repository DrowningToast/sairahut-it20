<script>
	import Header from '$components/svelte/Header.svelte';
	import LandingFooter from '$components/svelte/LandingFooter.svelte';
	import '../app.postcss';
</script>

<div class="w-full min-h-screen flex flex-col font-noto bg-gradient-to-b from-primary to-black">
	<!-- <Header /> -->

	<main>
		<slot />
	</main>

	<!-- <LandingFooter /> -->
</div>
