<script lang="ts">
	import { View } from 'lucide-svelte';
	import { onMount } from 'svelte';

	interface SophomorePair {
		img?: string;
		family?: string;
	}
	export let sophomorePair: SophomorePair;

	export let isOpen: boolean = false;

	onMount(() => {
		isOpen = localStorage.getItem('isOpen') === 'true';
	});
</script>

{#if sophomorePair.img && sophomorePair.family}
	<div
		class="flex justify-center gap-x-2 items-center py-5 bg-cover bg-[url('../bg_seirei.png')] relative"
	>
		<div class={!isOpen ? 'blur-md' : ''}>
			<img src={sophomorePair.img} alt="" />
		</div>
		<div class={`font-krub text-base font-normal ${!isOpen ? 'blur-md' : ''}`}>
			<slot />
		</div>
		<div class={!isOpen ? 'block' : 'hidden'}>
			<div
				class="flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
			>
				<button
					on:click={() => {
						localStorage.setItem('isOpen', 'true');
						isOpen = true;
					}}><View size={72} color="#AF9E6E" strokeWidth={1} /></button
				>
				<p class="text-yellow-100 drop-shadow-[0px_0px_4px_#FFD130] text-xs">ดูภูติของท่าน</p>
			</div>
		</div>
	</div>
{/if}
