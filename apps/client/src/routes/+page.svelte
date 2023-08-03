<script lang="ts">
	import { page } from '$app/stores';
	import DynamicLoginButton from '$components/svelte/DynamicLoginButton.svelte';
	import LandingFooter from '$components/svelte/LandingFooter.svelte';
	import SrhHeading from '$components/svelte/SRHHeading.svelte';
	import { AuthController } from '$lib/auth/AuthController';
</script>

<svelte:head>
	<title>Sairahut IT KMITL | สายรหัสคณะเทคโนโลยีสารสนเทศ</title>
		<meta name="twitter:card" content="summary_large_image">
		<meta property="twitter:domain" content="sairahut.iservkmitl.tech">
		<meta property="twitter:url" content="https://sairahut.iservkmitl.tech%22%3E/">
		<meta name="twitter:title" content="Sairahut IT KMITL | สายรหัสคณะเทคโนโลยีสารสนเทศ">
		<meta name="twitter:description" content="เรื่องราวการผจญภัยระหว่างจอมเวทย์ฝึกหัดกับภูตวิเศษ กับการปราบจอมมาร">
		<meta name="twitter:image" content="hero.png">

</svelte:head>

<div class="bg-gradient-to-b from-primary to-black hidden md:block min-h-screen relative">
	<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-accent-alt border border-accent p-5 rounded-xl">
		<h1 class=" font-Pridi text-2xl font-medium">เรียน : ท่านผู้เดินทางไปยังโลกเวทย์มนต์</h1>
		<div class="ml-3 mt-3 font-light">
			<p class="indent-6">เนื่องด้วยประตูสู่โลกเวทย์มนต์ของเรานั้น ไม่สามารถเข้าไปด้วยหน้าจอคอมพิวเตอร์ หรือLaptopของท่านได้</p>
			<p class="indent-6 mt-2">ทางเราจึงขอแนะนำให้ท่าน เข้าสู่ประตูของเราด้วยสมาร์ทโฟนของท่าน</p>
		</div>
	</div>
</div>

<div class="bg-gradient-to-b from-primary to-black overflow-x-hidden relative md:hidden">
	<img
		src="./hero.png"
		class="absolute w-full inset-x-0 overflow-x-visible w-auto object-cover"
		alt=""
	/>
	<div class="px-3 py-16 md:px-16 md:py-24 flex flex-col gap-y-4">
		<div class="text-center relative">
			<img src="./konnok.png" alt="" class="scale-90 h-full absolute bottom-1 -right-2" />
			<SrhHeading>Sairahut IT20</SrhHeading>
			<p class="text-sm text-accent drop-shadow-[0px_0px_10px_#FFD130] font-Pridi">
				กิจกรรมสานสัมพันธ์รุ่นคณะเทคโนโลยีสารสนเทศ
			</p>
			<img
				src="./konnok.png"
				alt=""
				class=" h-full scale-90 absolute bottom-1 -left-2 transform -scale-x-100"
			/>
		</div>
		<div class=" relative overflow-x-visible w-auto h-72">
			<img src="./star.png" class="absolute top-0 left-0 transform -scale-x-100" alt="" />
			<img src="./star.png" class="absolute bottom-0 right-0 transform -scale-x-100" alt="" />
			<img src="./star.png" class="absolute bottom-3 right-6 transform" alt="" />
		</div>
		<div class="text-center mt-5">
			<div class="relative">
				<div
					class="border-accent-alt border rounded-full px-16 py-1 bg-gray-900 inline-block z-10 absolute inset-x-5 top-0 transform -translate-y-1/2"
				>
					<h4 class="font-Pridi text-[#F7B962] drop-shadow-[0px_0px_5px_#FFEC8A]">
						อะไรคือกิจกรรมสายรหัส
					</h4>
				</div>
				<p class="text-white text-sm border-accent-alt border py-10 px-3 font-thin font-Pridi">
					กิจกรรมสายรหัสครั้งที่ 8 จัดขึ้นเพื่อสร้างความสัมพันธ์อันดี ระหว่างรุ่นพี่
					และรุ่นน้องมุ่งเน้นให้นักศึกษาได้รู้จักกันให้มากขึ้น ช่วยเหลือซึ่งกันและกัน
					โดยจะเริ่มวันที่ 7 สิงหาคม พ.ศ. 2566 จนถึง 19 สิงหาคม พ.ศ. 2566 ที่ @คณะเทคโนโลยีสารสนเทศ
					สจล.
				</p>
			</div>
			<div class="relative">
				<div
					class="border-accent-alt border rounded-full px-16 py-1 bg-gray-900 inline-block z-10 absolute inset-x-5 top-0 transform -translate-y-1/2"
				>
					<h4 class="font-Pridi text-[#F7B962] drop-shadow-[0px_0px_5px_#FFEC8A]">
						ใครสามารถเข้าร่วมได้บ้าง
					</h4>
				</div>
				<p class="text-white text-sm border-accent-alt border py-12 px-3 font-thin font-Pridi">
					นักศึกษาคณะเทคโนโลยีสารสนเทศ สจล. รุ่นที่ 20 และ 21
					จะสามารเข้าร่วมมาเป็นสายรหัสรุ่นพี่และเข้าร่วมกิจกรรมหลักได้ โดยรุ่นพี่
					รุ่นอื่นสามารถเข้าร่วมกิจกรรมในส่วนอื่นๆ ได้เหมือนกัน
				</p>
			</div>
			<div class="relative">
				<div
					class="border-accent-alt border rounded-full px-16 py-1 bg-gray-900 inline-block z-10 absolute inset-x-5 top-0 transform -translate-y-1/2"
				>
					<h4 class="font-Pridi text-[#F7B962] drop-shadow-[0px_0px_5px_#FFEC8A]">
						วิธีการเข้าร่วม (IT20 และ IT21)
					</h4>
				</div>
				<p class="text-white text-sm border-accent-alt border py-10 px-3 font-thin font-Pridi">
					นักศึกษาต้องกรอกข้อมูลส่วนตัวนิสัย ความชอบของตนเองหลังจากเข้าสู่ระบบแล้วจึง
					จะนับได้ว่าได้เข้าร่วมกิจกรรมโดนสมบูรณ์
				</p>
			</div>
			<img src="./konnok-footer.png" alt="" class="w-full my-2" />
			<DynamicLoginButton />
		</div>
	</div>

	<LandingFooter />
</div>
