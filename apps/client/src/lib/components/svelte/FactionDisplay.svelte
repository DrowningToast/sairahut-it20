<script lang="ts">
	interface SophomorePair {
		img?: string;
		family?: string;
	}
	export let sophomorePair: SophomorePair;
</script>

{#if sophomorePair.img && sophomorePair.family}
	<div
		class="flex justify-center gap-x-2 items-center pb-4 pt-6 bg-cover bg-[url('../bg_seirei.png')]"
	>
		<div class="w-20 h-20">
			<img src={sophomorePair.img} alt="" />
		</div>
		<div class="font-krub text-base font-normal">
			<slot />
		</div>
	</div>
{/if}
