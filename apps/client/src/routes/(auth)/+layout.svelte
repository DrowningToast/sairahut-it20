<script>
	import LandingFooter from '$components/svelte/LandingFooter.svelte';
	import Navbar from '$components/svelte/Navbar.svelte';
</script>

<div class="bg-gradient-to-b from-primary to-black hidden md:block min-h-screen relative">
	<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-accent-alt border border-accent p-5 rounded-xl">
		<h1 class=" font-Pridi text-2xl font-medium">เรียน : ท่านผู้เดินทางไปยังโลกเวทย์มนต์</h1>
		<div class="ml-3 mt-3 font-light">
			<p class="indent-6">เนื่องด้วยประตูสู่โลกเวทย์มนต์ของเรานั้น ไม่สามารถเข้าไปด้วยหน้าจอคอมพิวเตอร์ หรือLaptopของท่านได้</p>
			<p class="indent-6 mt-2">ทางเราจึงขอแนะนำให้ท่าน เข้าสู่ประตูของเราด้วยอุปกรณ์ดังต่อไปนี้ :</p>
			<ul class="ml-14 list-disc">
				<li>Smartphone</li>
				<li>Tablet</li>
			</ul>
		</div>
	</div>
</div>

<div class="min-h-screen overflow-x-hidden flex flex-col bg-gradient-to-b from-primary-alt to-black md:hidden">
	<Navbar />
	<div class="flex flex-col mx-6 my-10 gap-y-3">
		<slot />
	</div>
	<LandingFooter />
</div>
