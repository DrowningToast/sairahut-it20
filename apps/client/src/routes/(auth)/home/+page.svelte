<script lang="ts">
	import { page } from '$app/stores';
	import CardButtonMenu from '$components/svelte/CardButtonMenu.svelte';
	import LogoutButton from '$components/svelte/LogoutButton.svelte';
	import type { PageData } from './$types';

	const { homePageState, session } = $page.data as PageData;

	let isQrCodeActive = new Date() >= homePageState.qrCode.activateDate;
	let isHintActive = new Date().getTime() >= homePageState.hints.activateDate.getTime();
	let isPasswordActive = new Date() >= homePageState.passcode.activateDate;
	let isProfileActive = new Date() >= homePageState.profile.activateDate;
</script>

<div>
	<div class=" relative">
		<p class="absolute right-0 text-white">Sprit Shards: 999</p>
	</div>
	<div class="grid grid-cols-2 grid-rows-2 gap-x-3 gap-y-14 mt-10">
		<CardButtonMenu
			isActived={isQrCodeActive}
			img_active={'../qrCode-active.png'}
			img_inactive={'../qrCode-inactive.png'}
			text={homePageState.qrCode.title}
			link={homePageState.qrCode.href}
		/>
		<CardButtonMenu
			isActived={isHintActive}
			img_active={'../hint-active.png'}
			img_inactive={'../hint-inactive.png'}
			text={homePageState.hints.title}
			link={homePageState.hints.href}
		/>
		<CardButtonMenu
			isActived={isPasswordActive}
			img_active={'../password-active.png'}
			img_inactive={'../password-inactive.png'}
			text={homePageState.passcode.title}
			link={homePageState.passcode.href}
		/>
		<CardButtonMenu
			isActived={isProfileActive}
			img_active={'../profile-active.png'}
			img_inactive={'../profile-inactive.png'}
			text={homePageState.profile.title}
			link={homePageState.profile.href}
		/>
	</div>
	<div class="flex justify-center mt-7">
		<LogoutButton />
	</div>
</div>
