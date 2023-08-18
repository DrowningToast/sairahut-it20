<script lang="ts">
	import SRHButton from './../../../../lib/components/svelte/SRHButton.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import QrScaner from '../../../../lib/components/svelte/QrScaner.svelte';
	import SrhHeading from '../../../../lib/components/svelte/SRHHeading.svelte';

	interface ISophomoreTarget {
		student_id: string;
		firstname: string;
		lastname: string;
		nickname: string;
		img: `/factions/${string}.webp`;
	}

	export let data: PageData;

	$: guess_words = [
		{ word: 'PADFOOT', status: null },
		{ word: 'CHIVALRY', status: null },
		{ word: 'CRACKPOT', status: null }
	];

	// const sophomoreTarget = {
	// 	student_id: '65070185',
	// 	firstname: 'ฟินิกซ์',
	// 	lastname: 'นกอมตะ',
	// 	ninkname: 'นก',
	// 	img: '/factions/phoenix.webp',
	// 	family: 'Phoenix'
	// };

	let sophomoreTarget: undefined | ISophomoreTarget = undefined;

	let balance = data.user?.balance ?? 0;

	const words = data.verses.map((verse) => {
		return {
			handler: verse.handler,
			name: verse.name,
			cost: verse.cost
		};
	});

	$: answer = [null, null, null];

	$: isAllCorrect = false;

	const checkAnswer = () => {
		let correct: number = 0;
		const buffer = [...guess_words];
		buffer.map((word, index) => {
			if (word.word == answer[index]) {
				word.status = 'correct';
				correct++;
			}
			if (correct === 3) {
				isAllCorrect = true;
				console.log('correct');
				localStorage.setItem('pairStudentId', sophomoreTarget.student_id);
			}
		});
		guess_words = [...buffer];
		console.log(guess_words);
	};

	onMount(() => {
		if (localStorage.getItem('pairStudentId') === sophomoreTarget.student_id) {
			const buffer = [...guess_words];
			buffer.map((word, index) => {
				word.status = 'correct';
			});
			guess_words = [...buffer];
			isAllCorrect = true;
		}
	});
</script>

{#if sophomoreTarget}
	<div class="flex flex-col w-full gap-y-7">
		<div class="flex flex-col items-center text-white font-krub drop-shadow-[0px_0px_10px_#FFAEBD]">
			<h1 class="font-bold text-2xl">รหัสภูต</h1>
			<p class="font-extralight">เป็นอักขระที่น่าพิศวงจริงๆ</p>
		</div>

		<div class="w-full flex flex-col items-center gap-y-5 px-5">
			{#each guess_words as word, index}
				{#if word.status != 'correct'}
					<select
						class="bg-transparent border-[#AB9F7E] border-2 outline-none w-full text-center py-3 rounded-2xl text-white font-Pridi text-2xl"
						on:change={(e) => {
							//  const value = e?.target?.value! as string
							// answer[index] = value;
							console.log(answer);
						}}
					>
						<option value={undefined} class="text-black text-base flex">{'???'}</option>
						{#each words as w}
							{#if !answer.includes(w) || answer[index] === w}
								<option value={w} class="text-black text-base flex">{w}</option>
							{/if}
						{/each}
					</select>
				{:else}
					<div
						class="bg-[#472D1C] border-2 border-[#AB9F7E] w-full text-center py-3 drop-shadow-[0px_0px_5px_#FFEE96] rounded-2xl"
					>
						<p class="text-white font-Pridi text-2xl drop-shadow-[0px_0px_7.5px_#FFF5C0]">
							{word.word}
						</p>
					</div>
				{/if}
			{/each}
		</div>

		<div class="flex flex-col items-center gap-y-5">
			<p class="text-white text-sm font-Pridi">Spirit Shards Left: 99999</p>
			<div class="flex">
				<SRHButton
					on:click={() => {
						checkAnswer();
					}}>ตรวจสอบรหัสภูต</SRHButton
				>
			</div>
		</div>

		<div class="w-full h-full flex flex-col items-center justify-center">
			<div
				class="w-full overflow-visible flex justify-center gap-x-10 items-center py-4 bg-cover object-cover relative h-36 pt-9"
			>
				<img src="./bg-seirei2.png" class="absolute inset-0 mx-auto" alt="background cover" />
				<div class={`grid place-items-center`}>
					<img class="w-20 h-20" src={sophomoreTarget?.img} alt="" />
				</div>
				<div class={`font-krub text-base font-normal text-white drop-shadow-[0px_0px_5px_#FFF5C0]`}>
					<p>เผ่า: {sophomoreTarget?.family}</p>
					<p>ชื่อ: {isAllCorrect ? sophomoreTarget?.firstname : '???'}</p>
					<p>นามสกุล: {isAllCorrect ? sophomoreTarget?.lastname : '???'}</p>
					<p>ชื่อเล่น: {isAllCorrect ? sophomoreTarget?.ninkname : '???'}</p>
				</div>
			</div>
		</div>

		<h1 class="text-[#FFF8D4] text-center font-krub drop-shadow-[0px_0px_2px_#FFF8D4]">
			เหล่าจอมเวทย์ กำลังตามหาท่านอยู่
		</h1>

		<div class="relative text-center mt-5">
			<div
				class="border-accent-alt border rounded-full px-16 py-1 bg-gray-900 inline-block z-10 absolute inset-x-5 top-0 transform -translate-y-1/2"
			>
				<h4 class="font-Pridi text-[#F7B962] drop-shadow-[0px_0px_5px_#FFEC8A]">HOW TO PLAY</h4>
			</div>
			<div class="border-accent-alt border py-10 px-3">
				<p class="text-white text-sm font-thin font-Pridi">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, deserunt! Officia saepe
					necessitatibus eveniet architecto expedita, porro rem adipisci illo.
				</p>
				<img src="../close.png" alt="" />
			</div>
		</div>
	</div>
{:else}
	<SrhHeading class="text-center">VVV Idoit here</SrhHeading>
	<QrScaner />
{/if}
