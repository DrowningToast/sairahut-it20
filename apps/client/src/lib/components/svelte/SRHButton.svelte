<script lang="ts">
	import { buttonVariants } from '$components/ui/button';

	let className: string | undefined | null = undefined;
	export { className as class };

	import Button from '$components/ui/button/Button.svelte';
	import { cn } from '$lib/utils';
</script>

<Button
	class={cn(buttonVariants({ className }), 'bg-neutral-900 drop-shadow-[0px_0px_3px_#FFFADD]')}
	{...$$restProps}
	on:click
	on:change
	on:keydown
	on:keyup
	on:mouseenter
	on:mouseleave
>
	<div class="flex items-center justify-center text-accent">
		<slot />
	</div>
</Button>
