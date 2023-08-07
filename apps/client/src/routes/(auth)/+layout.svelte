<script lang="ts">
	import LandingFooter from '$components/svelte/LandingFooter.svelte';
	import Navbar from '$components/svelte/Navbar.svelte';
	import type { LayoutServerData } from './$types';
	import { userType } from '$lib/store/userType';

	let data: LayoutServerData;
	export { data };

	$: userType.set(data.userType !== 'FRESHMEN' ? 'SOPHOMORE' : 'FRESH');
</script>

<<<<<<< HEAD
<div class="bg-gradient-to-b from-primary to-black hidden md:block min-h-screen relative">
	<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-accent-alt border border-accent p-5 rounded-xl">
		<h1 class="text-center font-Pridi text-3xl font-medium mb-5">ประกาศจากกระทรวงเวทมนตร์</h1>
		<h1 class=" font-Pridi text-xl font-normal">เรียน : ผู้มาเยือนโลกแห่งเวทมนตร์ทุกท่าน</h1>
		<div class="ml-3 mt-3 font-light">
			<p class="indent-6">เนื่องจากการจุติของจอมมาร ทำให้ผู้ที่มาเยือนโลกใบนี้ด้วยอุปกรณ์เวทมนตร์ชนิดดังต่อไปนี้ไม่สามารถเข้าสู่โลกเวทมนตร์ได้</p>
			<ul class="list-disc ml-10">
				<li>คอมพิวเตอร์</li>
				<li>Laptop</li>
				<li>Tablet</li>
				<li>อุปกรณ์อื่นๆที่มีจอแสดงผลขนาดใหญ่</li>
			</ul>
			<p class="indent-6 mt-2">ทางสภาเวทมนต์จึงขอแนะนำให้ผู้มาเยือนทุกท่าน มาเยือนโลกใบนี้อีกครั้งด้วยอุปกรณ์เวทมนต์ชนิดโทรศัพท์พกพา</p>
		</div>
	</div>
</div>

<div class="min-h-screen overflow-x-hidden flex flex-col bg-gradient-to-b from-primary-alt to-black md:hidden">
=======
<div
	class={`min-h-screen overflow-x-hidden flex flex-col bg-gradient-to-b ${
		$userType === 'SOPHOMORE' ? 'from-primary' : 'from-primary-alt'
	} to-black md:hidden`}
>
>>>>>>> main
	<Navbar />
	<div class="flex flex-col mx-6 my-10 gap-y-3">
		<slot />
	</div>
	<LandingFooter />
</div>
