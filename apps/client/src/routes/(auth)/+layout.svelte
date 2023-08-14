<script lang="ts">
	import LandingFooter from '$components/svelte/LandingFooter.svelte';
	import Navbar from '$components/svelte/Navbar.svelte';
	import type { LayoutServerData } from './$types';
	import { userType } from '$lib/store/userType';
	import { secretMode } from '$lib/store/secret';

	let data: LayoutServerData;
	export { data };

	$: userType.set(data.userType !== 'FRESHMEN' ? 'SOPHOMORE' : 'FRESH');
</script>

<div
	class={`min-h-screen overflow-x-hidden flex flex-col bg-gradient-to-b ${
		$secretMode ? 'from-red-800' : $userType === 'SOPHOMORE' ? 'from-primary' : 'from-primary-alt'
	} to-black md:hidden`}
>
	<Navbar />
	<div class="flex flex-col mx-6 my-10 gap-y-3">
		<slot />
	</div>
	<LandingFooter />
</div>
