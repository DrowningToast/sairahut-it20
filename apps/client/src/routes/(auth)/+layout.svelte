<script>
	import LandingFooter from '$components/svelte/LandingFooter.svelte';
	import Navbar from '$components/svelte/Navbar.svelte';
</script>

<div class="min-h-screen overflow-x-hidden flex flex-col bg-gradient-to-b from-primary-alt to-black">
	<Navbar />
	<div class="flex flex-col mx-6 my-10 gap-y-3">
		<slot />
	</div>
	<LandingFooter />
</div>
