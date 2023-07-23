<script lang="ts">
	import { page } from '$app/stores';
	import DynamicLoginButton from '$components/svelte/DynamicLoginButton.svelte';
	import LandingFooter from '$components/svelte/LandingFooter.svelte';
	import LoginButton from '$components/svelte/LoginButton.svelte';
	import LogoutButton from '$components/svelte/LogoutButton.svelte';
	import Button from '$components/ui/button/Button.svelte';
	import { AuthController } from '$lib/auth/AuthController';
	import { trpc } from '$lib/trpc/client';

	const loadData = async () => {
		console.log('bruh moment');
		await trpc($page).greeting.query();
	};

	const { isSignedIn } = AuthController($page);

	$: console.log($page.data.session);
</script>

<div class="min-h-screen flex flex-col bg-gradient-to-b from-primary to-black">
	<div class="px-3 py-16 md:px-16 md:py-24 flex flex-col gap-y-4">
		<div class="text-center relative">
			<img src="./konnok.png" alt="" class=" absolute bottom-1 -right-0">
			<h1 class="text-5xl font-krub font-bold text-accent drop-shadow-[0px_0px_10px_#FFD130]">Sairahut IT20</h1>
			<p class="text-sm text-accent drop-shadow-[0px_0px_10px_#FFD130] font-Pridi">กิจกรรมสานสัมพันธ์รุ่นคณะเทคโนโลยีสารสนเทศ</p>
			<img src="./konnok.png" alt="" class=" absolute bottom-1 -left-0 transform -scale-x-100">
		</div>
		<div class="text-center mt-5 relative top-96">
			<div class="border-accent-alt border rounded-full px-16 py-1 bg-gray-900 inline-block z-10 absolute inset-x-5 top-0 transform -translate-y-1/2">
				<h4 class="font-Pridi text-accent drop-shadow-[0px_0px_3px_#FFD130]">อะไรคือกิจกรรมสายรหัส</h4>
			</div>
			<p class="text-white text-sm border-accent-alt border py-8 px-3 font-thin font-Pridi whitespace-pre">กิจกรรมสายรหัสครั้งที่ 8 จัดขึ้นเพื่อสร้างความสัมพันธ์อันดี
ระหว่างรุ่นพี่ และรุ่นน้องมุ่งเน้นให้นักศึกษาได้รู้จักกันให้มากขึ้น
ช่วยเหลือซึ่งกันและกัน โดยจะเริ่มวันที่
xx สิงหาคม พ.ศ. 2566 จนถึง xx สิงหาคม พ.ศ. 2566
ที่ @คณะเทคโนโลยีสารสนเทศ สจล.</p>
<DynamicLoginButton />
		</div>
	</div>

	<LandingFooter />
</div>
