<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';
	import { ChevronDown, ChevronDownIcon } from 'lucide-svelte';

	let className: string | undefined | null = undefined;
	export let isDisabled: boolean = false;
	export let value: HTMLInputAttributes['value'] = undefined;
	export { className as class };
	export let placeholder = '';
</script>

<div class="relative">
	<select
		class={cn(
			'flex h-10 w-full rounded-2xl border border-none bg-transparent px-3 pr-6 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-white focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 appearance-none',
			className
		)}
		{placeholder}
		bind:value
		disabled={isDisabled}
		on:blur
		on:change
		on:click
		on:focus
		on:keydown
		on:keypress
		on:keyup
		on:mouseover
		on:mouseenter
		on:mouseleave
		on:paste
		on:input
		{...$$restProps}
	>
		<option selected value={undefined} />
		<slot />
	</select>
	<ChevronDown
		color="white"
		class="pointer-events-none absolute w-6 h-6 right-2 top-1/2 transform -translate-y-1/2"
	/>
</div>
