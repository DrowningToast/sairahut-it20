<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export let isDisabled: boolean = false;
	export let value: HTMLInputAttributes["value"] = undefined;
	export { className as class };
</script>

<input
	class={cn(
		"flex h-10 w-full rounded-2xl border border-none bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-white focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
		className
	)}
	disabled={isDisabled}
	bind:value
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
/>
