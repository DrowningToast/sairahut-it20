<script lang="ts">
	import { secretMode } from '$lib/store/secret';
	import { onDestroy, onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let ost: HTMLAudioElement | undefined = undefined;

	onMount(() => {
		secretMode.set(true);
		ost = new Audio('/sfx/Old_Friend.ogg');
		ost.loop = true;
		ost.volume = 0.7;
		ost.play();
	});

	onDestroy(() => {
		secretMode.set(false);
		if (ost) {
			ost.pause();
			ost.currentTime = 0;
		}
	});
</script>
