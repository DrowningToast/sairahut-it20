<script>
	import Avatar from '$components/ui/avatar/Avatar.svelte';
	import AvatarFallback from '$components/ui/avatar/AvatarFallback.svelte';
	import AvatarImage from '$components/ui/avatar/AvatarImage.svelte';

	import { HoverCard, HoverCardTrigger } from '$components/ui/hover-card';
	import HoverCardContent from '$components/ui/hover-card/HoverCardContent.svelte';
	import { Heart } from 'lucide-svelte';
</script>

<footer class="mt-auto py-4 text-center">
	<HoverCard>
		Made with love by
		<HoverCardTrigger
			href="https://github.com/sveltejs"
			target="_blank"
			rel="noreferrer noopener"
			class="text-blue-500 hover:underline underline-offset-4 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-black"
		>
			Gus
		</HoverCardTrigger>
		<HoverCardContent class="w-auto">
			<div class="flex justify-between gap-x-4">
				<Avatar>
					<AvatarImage src="https://avatars.githubusercontent.com/u/58824744?v=4" />
					<AvatarFallback>SK</AvatarFallback>
				</Avatar>
				<div class="gap-y-1">
					<h4 class="text-sm font-semibold">Supratouch Suwatno</h4>
					<p class="text-sm">Full stack developer (React, Svelte).</p>
					<div class="flex items-center pt-2">
						<Heart class="mr-2 h-4 w-4 opacity-70" />{' '}
						<span class="text-xs text-muted-foreground">Available for hiring!</span>
					</div>
				</div>
			</div>
		</HoverCardContent>
	</HoverCard>
</footer>
