<script>
	import LandingFooter from '$components/svelte/LandingFooter.svelte';
	import Header from '$components/svelte/Header.svelte';
</script>

<div class="min-h-screen overflow-x-hidden flex flex-col bg-gradient-to-b from-primary to-black">
	<Header />
	<div class="min-h-screen flex flex-col mx-5 my-10 gap-y-3">
		<slot />
	</div>
	<LandingFooter />
</div>
