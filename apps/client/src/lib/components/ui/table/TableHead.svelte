<script lang="ts">
	import { cn } from '$lib/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<th
	class={cn(
		'h-auto py-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
		className
	)}
	{...$$restProps}
>
	<slot />
</th>
