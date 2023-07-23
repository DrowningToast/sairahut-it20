<script lang="ts">
	import { page } from '$app/stores';
	import DynamicLoginButton from '$components/svelte/DynamicLoginButton.svelte';
	import LandingFooter from '$components/svelte/LandingFooter.svelte';
	import { AuthController } from '$lib/auth/AuthController';

	const loadData = async () => {};

	const { isSignedIn } = AuthController($page);

	$: console.log($page.data.session);
</script>

<div class="min-h-screen flex flex-col">
	<div class="px-8 py-16 md:px-16 md:py-24 flex flex-col gap-y-4">
		<h1 class="text-5xl font-semibold">IT Sairahut</h1>
		<p>
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore corrupti, dolorum neque nulla
			voluptas a veniam quisquam illum et, consequatur repudiandae, libero saepe dolores ad? Commodi
			earum dignissimos incidunt minima?
		</p>
		<button on:click={loadData}> test </button>
		<DynamicLoginButton />
	</div>

	<LandingFooter />
</div>
