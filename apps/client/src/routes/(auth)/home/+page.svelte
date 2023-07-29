<script>
	import CardButtonMenu from './../../../lib/components/svelte/CardButtonMenu.svelte';
	import LogoutButton from '$components/svelte/LogoutButton.svelte';

	let isQrCodeActive = true;
	let isHintActive = false;
	let isPasswordActive = false;
	let isProfileActive = false;
</script>

<div>
	<div class=" relative">
		<p class="absolute right-0 text-white">Sprit Shards: 999</p>
	</div>
	<div class="grid grid-cols-2 grid-rows-2 gap-x-3 gap-y-14 mt-10">
		<CardButtonMenu isActived={isQrCodeActive} img_active={"../qrCode-active.png"} img_inactive={"../qrCode-inactive.png"} text={"สแกน QR code เพื่อรับSpirit Shards"} link={"#"}/>
		<CardButtonMenu isActived={isHintActive} img_active={"../hint-active.png"} img_inactive={"../hint-inactive.png"} text={"ดูคำใบ้ ตามหาภูติของตัวเอง!"} link={"#"}/>
		<CardButtonMenu isActived={isPasswordActive} img_active={"../password-active.png"} img_inactive={"../password-inactive.png"} text={"กรอกรหัสเพื่อรับคำใบ้"} link={"#"}/>
		<CardButtonMenu isActived={isProfileActive} img_active={"../profile-active.png"} img_inactive={"../profile-inactive.png"} text={"บัตรประจำตัว"} link={"#"}/>
	</div>
	<div class="flex justify-center mt-7">
		<LogoutButton />
	</div>
</div>

