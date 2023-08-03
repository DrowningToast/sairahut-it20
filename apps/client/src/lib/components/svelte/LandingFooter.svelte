<script>
	import Avatar from '$components/ui/avatar/Avatar.svelte';
	import AvatarFallback from '$components/ui/avatar/AvatarFallback.svelte';
	import AvatarImage from '$components/ui/avatar/AvatarImage.svelte';

	import { HoverCard, HoverCardTrigger } from '$components/ui/hover-card';
	import HoverCardContent from '$components/ui/hover-card/HoverCardContent.svelte';
	import { Heart } from 'lucide-svelte';
</script>

<footer class="mt-auto py-4 text-center bg-zinc-700">
	<HoverCard>
		<p class="text-yellow-200 inline">Made with ♥ by</p>
		<HoverCardTrigger
			href="https://www.facebook.com/ITxKMITL"
			target="_blank"
			rel="noreferrer noopener"
			class="text-blue-500 hover:underline underline-offset-4 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-black"
		>
			<p class="text-yellow-200 inline underline">IT Experience Imagineering Team</p>
		</HoverCardTrigger>
		<HoverCardContent class="w-auto">
			<div class="flex flex-col gap-y-1">
				<div class="flex justify-between gap-x-4">
					<Avatar>
						<AvatarImage
							src="https://scontent.fbkk13-1.fna.fbcdn.net/v/t39.30808-6/331976602_605726911380808_4104405803759724707_n.jpg?_nc_cat=108&cb=99be929b-59f725be&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeEjV2s4KLpfTHlIp07GtDQgNdOfPizOnWA1058-LM6dYPV0dAtMqf6oTC-yJTu8QXUYWBn7clWPAkz_BO22FAB0&_nc_ohc=y7pWezlQ3SsAX9OtMX4&_nc_ht=scontent.fbkk13-1.fna&oh=00_AfCPwLjbSPH2IyNXM6K01qDB9lExXwlLqUi88S0zRnJp6A&oe=64D00934"
						/>
						<AvatarFallback>SK</AvatarFallback>
					</Avatar>
					<div class="gap-y-1">
						<h4 class="text-sm font-semibold">IT Experience</h4>
						<p class="text-sm">IT Experience ชุมนุมสร้างเสริมประสบการณ์ชีวิต ไอทีลาดกระบัง</p>
						<div class="flex items-center pt-2">
							<span class="text-xs text-muted-foreground">We're currently recruiting!</span>
						</div>
					</div>
				</div>
			</div>
		</HoverCardContent>
	</HoverCard>
</footer>
