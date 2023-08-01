<script lang="ts">
	import { cn } from '$lib/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<td class={cn('px-1 py-4 align-middle [&:has([role=checkbox])]:pr-0', className)} {...$$restProps}>
	<slot />
</td>
