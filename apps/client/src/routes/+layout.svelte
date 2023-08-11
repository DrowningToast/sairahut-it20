<script>
	// import Header from './Header.svelte';
	// import './styles.css';
	import '../app.postcss';
</script>

<svelte:head>
	<title>Sairahut IT KMITL | สายรหัสคณะเทคโนโลยีสารสนเทศ</title>
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="https://sairahut.it20.dev" />
	<meta property="twitter:url" content="https://sairahut.it20.dev" />
	<meta name="twitter:title" content="Sairahut IT KMITL | สายรหัสคณะเทคโนโลยีสารสนเทศ" />
	<meta
		name="twitter:description"
		content="เรื่องราวการผจญภัยระหว่างจอมเวทย์ฝึกหัดกับภูตวิเศษ กับการปราบจอมมาร"
	/>
	<meta name="twitter:image" content="hero.webp" />
</svelte:head>

<div
	class={`bg-gradient-to-b ${
		$userType === 'SOPHOMORE' ? 'from-primary' : 'from-primary-alt'
	} to-black hidden md:block min-h-screen relative`}
>
	<div
		class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-accent-alt border border-accent p-5 rounded-xl"
	>
		<h1 class="text-center font-Pridi text-3xl font-medium mb-5">ประกาศจากกระทรวงเวทมนตร์</h1>
		<h1 class=" font-Pridi text-xl font-normal">เรียน : ผู้มาเยือนโลกแห่งเวทมนตร์ทุกท่าน</h1>
		<div class="ml-3 mt-3 font-light">
			<p class="indent-6">
				เนื่องจากการจุติของจอมมาร
				ทำให้ผู้ที่มาเยือนโลกใบนี้ด้วยอุปกรณ์เวทมนตร์ชนิดดังต่อไปนี้ไม่สามารถเข้าสู่โลกเวทมนตร์ได้
			</p>
			<ul class="list-disc ml-10">
				<li>คอมพิวเตอร์</li>
				<li>Laptop</li>
				<li>Tablet</li>
			</ul>
			<p class="indent-6 mt-2">
				ทางสภาเวทมนต์จึงขอแนะนำให้ผู้มาเยือนทุกท่าน
				มาเยือนโลกใบนี้อีกครั้งด้วยอุปกรณ์เวทมนต์ชนิดโทรศัพท์พกพา
			</p>
		</div>
	</div>
</div>

<div
	class="font-krub min-h-screen overflow-x-hidden flex flex-col bg-gradient-to-b from-blue-800 to-black md:hidden"
>
	<!-- <Navbar /> -->
	<div class="flex flex-col mx-6 my-10 gap-y-3">
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
			<img src="./close.png" alt="" class="max-w-full" />
			<div class="text-center text-white">
				<p>ประกาศด่วน!!!</p>
				<p>เนื่องจากการคุกคามของจอมมารที่เพิ่มมากขึ้น</p>
				<p>ทางเราจึงขอปิดกั้นเส้นทางเข้าสู่โลกใบนี้ชั่วคราว</p>
				<p>แล้วเราจะกลับมาเปิดเส้นทางนี้อีกครั้ง!</p>
			</div>
		</div>
	</div>
	<!-- <LandingFooter /> -->
</div>
