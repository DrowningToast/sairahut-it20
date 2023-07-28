<script lang="ts">
	export let selected: 'LEFT' | 'RIGHT' | null = null;
	export let leftText: string;
	export let rightText: string;
</script>

<div class="grid grid-cols-2 gap-x-16 place-items-center w-full font-noto">
	<div class="relative">
		<button on:click={() => (selected = 'LEFT')} class="relative">
			{leftText}
			<div class="absolute -inset-8">
				{#if selected === 'LEFT'}
					<img
						src="/vector_thisthat.png"
						alt=""
						class="absolute inset-0 top-1/2 transform -translate-y-1/2"
					/>
				{/if}
			</div>
		</button>
	</div>
	<div class="relative">
		<button on:click={() => (selected = 'RIGHT')} class="relative">
			{rightText}
			<div class="absolute -inset-8">
				{#if selected === 'RIGHT'}
					<img
						src="/vector_thisthat.png"
						alt=""
						class="absolute inset-0 top-1/2 transform -translate-y-1/2"
					/>
				{/if}
			</div>
		</button>
	</div>
</div>
