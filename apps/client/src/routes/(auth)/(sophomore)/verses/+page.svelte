<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const words = ['PADFOOT', 'CHIVALRY', 'CRACKPOT'];

	const sophomorePair = {
		firstname: "ฟินิกซ์",
		lastname: "นกอมตะ",
		ninkname: "นก",
		img: "/factions/phoenix.webp",
		family: "Phoenix"
	}
</script>

<div class="flex flex-col w-full gap-y-7">
	<div class="flex flex-col items-center text-white font-krub drop-shadow-[0px_0px_10px_#FFAEBD]">
		<h1 class="font-bold text-2xl">รหัสภูต</h1>
		<p class="font-extralight">เป็นอักขระที่น่าพิศวงจริงๆ</p>
	</div>

	<div class="w-full flex flex-col items-center gap-y-5 px-5">
		{#each words as word}
			<div
				class="bg-[#472D1C] border-2 border-[#AB9F7E] w-full text-center py-3 drop-shadow-[0px_0px_5px_#FFEE96] rounded-2xl"
			>
				<p class="text-white font-Pridi text-2xl drop-shadow-[0px_0px_7.5px_#FFF5C0]">{word}</p>
			</div>
		{/each}
	</div>

	<div class="w-full h-full flex flex-col items-center justify-center">
		<div
			class="w-full overflow-visible flex justify-center gap-x-10 items-center py-4 bg-cover object-cover relative h-36 pt-9"
		>
			<img src="./bg-seirei2.png" class="absolute inset-0 mx-auto" alt="background cover" />
			<div class={`grid place-items-center`}>
				<img class="w-20 h-20" src={sophomorePair.img} alt="" />
			</div>
			<div class={`font-krub text-base font-normal text-white drop-shadow-[0px_0px_5px_#FFF5C0]`}>
				<p>เผ่า: {sophomorePair.family}</p>
				<p>ชื่อ: {sophomorePair.firstname}</p>
				<p>นามสกุล: {sophomorePair.lastname}</p>
				<p>ชื่อเล่น: {sophomorePair.ninkname}</p>
			</div>
		</div>
	</div>

	<h1 class="text-[#FFF8D4] text-center font-krub drop-shadow-[0px_0px_2px_#FFF8D4]">เหล่าจอมเวทย์ กำลังตามหาท่านอยู่</h1>

	<div class="relative text-center mt-5">
		<div
			class="border-accent-alt border rounded-full px-16 py-1 bg-gray-900 inline-block z-10 absolute inset-x-5 top-0 transform -translate-y-1/2"
		>
			<h4 class="font-Pridi text-[#F7B962] drop-shadow-[0px_0px_5px_#FFEC8A]">
				HOW TO PLAY
			</h4>
		</div>
		<div class="border-accent-alt border py-10 px-3">
			<p class="text-white text-sm font-thin font-Pridi">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, deserunt! Officia saepe necessitatibus eveniet architecto expedita, porro rem adipisci illo.
			</p>
			<img src="../close.png" alt="">
		</div>
	</div>
</div>
