<script>
	import LandingFooter from '$components/svelte/LandingFooter.svelte';
	import Navbar from '$components/svelte/Navbar.svelte';
</script>

<div class="bg-gradient-to-b from-primary to-black hidden md:block min-h-screen relative">
	<h1 class="text-center text-accent font-extralight font-Pridi text-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">มึงจะไปเล่นในโทรศัพท์<br>หรือจะให้กูร่ายเวทใส่หัวพ่อมึง</h1>
</div>

<div class="min-h-screen overflow-x-hidden flex flex-col bg-gradient-to-b from-primary-alt to-black md:hidden">
	<Navbar />
	<div class="flex flex-col mx-6 my-10 gap-y-3">
		<slot />
	</div>
	<LandingFooter />
</div>
