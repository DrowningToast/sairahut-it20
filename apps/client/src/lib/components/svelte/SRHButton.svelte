<script lang="ts">
	import { buttonVariants } from '$components/ui/button';

	export const isLoading: boolean = false;
	export let disabled: boolean = false;

	let className: string | undefined | null = undefined;
	export { className as class };
	import Button from '$components/ui/button/Button.svelte';
	import { cn } from '$lib/utils';
	import { Loader } from 'lucide-svelte';
</script>

<Button
	class={cn(
		buttonVariants({ className }),
		'bg-neutral-900 drop-shadow-[0px_0px_5px_#FFFADD] active:bg-neutral-900 focus:bg-neutral-900 '
	)}
	{...$$restProps}
	disabled={disabled || isLoading}
	on:click
	on:change
	on:keydown
	on:keyup
	on:mouseenter
	on:mouseleave
>
	<div class="flex items-center justify-center text-accent">
		{#if isLoading}
			<Loader />
		{:else}
			<slot />
		{/if}
	</div>
</Button>
