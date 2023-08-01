<script lang="ts">
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<th
	class={cn(
		"h-12 px-4 text-left align-middle text-muted-foreground [&:has([role=checkbox])]:pr-0 text-white font-Pridi text-[10px] font-extralight",
		className
	)}
	{...$$restProps}
>
	<slot />
</th>
