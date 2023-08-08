<script lang="ts">
	import { page } from '$app/stores';
	import CardButtonMenu from '$components/svelte/CardButtonMenu.svelte';
	import LogoutButton from '$components/svelte/LogoutButton.svelte';
	import SrhButton from '$components/svelte/SRHButton.svelte';
	import { Separator } from '$components/ui/separator';
	import { signOut } from '@auth/sveltekit/client';
	import type { PageData } from './$types';
	import { AlertDialog, AlertDialogTrigger } from '$components/ui/alert-dialog';
	import AlertDialogContent from '$components/ui/alert-dialog/AlertDialogContent.svelte';
	import AlertDialogHeader from '$components/ui/alert-dialog/AlertDialogHeader.svelte';
	import AlertDialogTitle from '$components/ui/alert-dialog/AlertDialogTitle.svelte';
	import AlertDialogDescription from '$components/ui/alert-dialog/AlertDialogDescription.svelte';
	import AlertDialogFooter from '$components/ui/alert-dialog/AlertDialogFooter.svelte';
	import AlertDialogCancel from '$components/ui/alert-dialog/AlertDialogCancel.svelte';
	import AlertDialogAction from '$components/ui/alert-dialog/AlertDialogAction.svelte';

	const { session, homePageState, user, playerType } = $page.data as PageData;

	let isQrCodeActive = new Date() >= homePageState.qrCode.activateDate;
	let isHintActive = new Date().getTime() >= homePageState.hints.activateDate.getTime();
	let isPasswordActive = new Date() >= homePageState.passcode.activateDate;
	let isProfileActive = new Date() >= homePageState.profile.activateDate;

	const sophomorePair = {
		'img' : '../Titania.png',
		'family' : 'Fairy'
	}
</script>

<div>
	<div>
		<p class="text-lg font-Pridi text-white text-center">
			ยินดีต้อนรับ {session?.user?.name?.split(' ')[0]} เข้าสู่โลกเวทย์มนตร์
		</p>
	</div>
	<div class="relative flex gap-y-2 justify-between items-center px-2 mt-4">
		<a href="/calendar">
			<button
				class="bg-neutral-900 text-accent font-Pridi px-5 py-2 rounded-full border border-accent-alt"
				><p class="drop-shadow-[0px_0px_4px_#FFD130]">ปฏิทินบอกเหตุ</p></button
			>
		</a>
		<p class="font-Pridi text-gray-200 text-sm">
			ตอนนี้คุณมีอยู่ {user.balance}
			{playerType === 'FRESHMEN' ? 'Spirit Shards' : 'Humanity'}
		</p>
	</div>
	<div class="mx-2 mt-5">
		{#if playerType === 'FRESHMEN'}
			<div class="flex justify-center gap-x-2 items-center py-5 bg-cover bg-[url('../bg_seirei.png')]">
				<div>
					<img src={sophomorePair.img} alt="">
				</div>
				<div class="font-krub text-base font-normal">
					<p class="text-[#F7B962] drop-shadow-[0px_0px_2px_#FFF5C0]">ภูติของท่านกำลังรอคอยอยู่</p>
					<p class="text-white drop-shadow-[0px_0px_4px_#FFF5C0]">เผ่า : {sophomorePair.family}</p>
				</div>
			</div>
		{:else}
			<a href="/view-pair">
				<SrhButton class="w-full">ดูจอมเวทย์ของท่าน</SrhButton>
			</a>
		{/if}
	</div>
	<div class="grid grid-cols-2 grid-rows-2 gap-x-3 gap-y-14 mt-5">
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
			isActived={false}
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
	<Separator class="mt-12 bg-accent" />

	<div class="flex flex-col gap-y-2 mt-4">
		<h5 class="text-accent text-lg font-semibold mb-4 text-center">เมนูอื่นๆ</h5>
		<div class="flex justify-center mt-4">
			<a class="w-full" href="/players"
				><SrhButton class="w-full">รายชื่อนักเวทย์และภูตทั้งหมด</SrhButton></a
			>
		</div>
		<div class="flex justify-center mt-4">
			<AlertDialog>
				<AlertDialogTrigger><SrhButton>ออกจากระบบ</SrhButton></AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>เจ้าแน่ใจนะ?</AlertDialogTitle>
						<AlertDialogDescription>
							หากเจ้าออกจากระบบเจ้าจะต้องทำการ Sign in อีกครั้งหนึ่งจึงจะกลับเข้ามาในนี้ได้ <b
								>โดยการออกระบบนั้นรายชื่อของเจ้าจะยังคงอยู่ในกิจกรรมและได้รับการจับคู่สายรหัส</b
							>
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel class="text-white bg-neutral-900">ฉันเปลี่ยนใจ</AlertDialogCancel>
						<AlertDialogAction class="relative px-0"
							><LogoutButton>ยืนยันออกจากระบบ</LogoutButton></AlertDialogAction
						>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	</div>
</div>
