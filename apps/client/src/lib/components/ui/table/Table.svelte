<script lang="ts">
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<div class="w-full overflow-auto border border-[#5B524C] rounded-xl px-5">
	<table
		class={cn("w-full caption-bottom text-sm", className)}
		{...$$restProps}
	>
		<slot />
	</table>
</div>
