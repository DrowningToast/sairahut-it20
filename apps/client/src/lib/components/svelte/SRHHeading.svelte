<script lang="ts">
	import { cn } from '$lib/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<h1
	class={cn(
		'text-3xl font-krub font-bold text-accent drop-shadow-[0px_0px_10px_#FFD130]',
		className
	)}
>
	<slot />
</h1>
