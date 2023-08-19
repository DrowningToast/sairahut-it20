<script lang="ts">
	import Dropdown from '$components/svelte/Dropdown.svelte';
	import SrhButton from '$components/svelte/SRHButton.svelte';
	import type { PageData } from './$types';
	import {
		requiremSounds,
		type AnswerResult,
		type CachedResults,
		type ISophomoreTarget
	} from '$lib/utils';
	import { z } from 'zod';
	import { trpc } from '$lib/trpc';

	export let data: PageData;
	export let sophomoreTarget: undefined | ISophomoreTarget;
	// Starter verses
	export let starterVerses: Array<undefined | null | string>;
	$: starterVerses;
	// Cached result from last time
	export let last: CachedResults | undefined;
	$: last;

	$: disabledSubmitVerses =
		answer.filter((a) => z.string().safeParse(a).success).length < 3 || costPrediction > balance;
	let balance = data.user?.balance ?? 0;
	$: balance;

	const verses = data.verses
		.map((verse) => {
			return {
				handler: verse.handler,
				name: verse.name,
				cost: verse.cost,
				wildcard: verse.wildcard
			};
		})
		.sort((a, b) => {
			if (a.wildcard && b.wildcard) {
				return 0;
			} else if (a.wildcard) {
				return 1;
			} else if (b.wildcard) {
				return -1;
			}
			return 0;
		});
	$: verses;

	$: console.log(last?.result.filter((v) => v));

	let costPrediction = 0;
	$: {
		// Predict cost
		costPrediction = Math.max(
			0,
			answer.reduce(
				(prev, curr, index) => (verses?.find((w) => w.handler === curr)?.cost ?? 0) + prev,
				0
			) - (last?.result.filter((v) => v).length ?? 0)
		);
	}

	// The answer the user is chsoing
	let answer: Array<null | string> = [null, null, null];
	$: answer = last?.verses
		? last?.verses.map((verse, index) => {
				if (last?.result[index]) return verse.handler;
				return null;
		  })
		: [null, null, null];

	$: isLoading = false;

	interface Result {
		verses: string[];
		result: boolean[];
		cost: number;
		isCorrect: boolean;
		correctPair: boolean | undefined;
	}

	let result: Result | undefined;
	console.log(sophomoreTarget);

	// check magic verses
	const checkAnswer = async () => {
		isLoading = true;

		if (!z.array(z.string()).safeParse(answer).success) {
			isLoading = false;
			return;
		}
		const res = await trpc.freshmens.submitMagicVerse.query({
			sophomoreId: sophomoreTarget?.id ?? '',
			answer: answer as string[]
		});

		result = {
			verses: answer as string[],
			cost: res.payload.cost,
			result: res.payload.result,
			isCorrect: res.payload.isCorrect,
			correctPair: res.payload.correctPair
		};

		balance = res.payload.balanceLeft;

		const res2 = await trpc.freshmens.getLatestMagicVerse.query({
			sophomoreId: sophomoreTarget?.id!
		});
		last = res2.payload.lastCast;

		isLoading = false;
	};
</script>

{#if result}
	<div class="fixed inset-0 grid place-items-center z-20">
		<div class="absolute inset-0 bg-gray-50/25" />
		<div class="bg-neutral-900 mx-12 p-8 flex flex-col gap-y-2 z-10 rounded-lg">
			<h1 class={`${result.isCorrect ? 'text-accent' : 'text-red-500'}  text-2xl font-semibold`}>
				{result.isCorrect ? 'คุณร่ายคาถาถูกต้อง' : 'คุณร่ายคาถาผิดพลาด'}
				!
			</h1>

			<p class="text-accent whitespace-pre-wrap text-left">
				คุณเสียไปทั้งหมด {result.cost} spirit shards!
			</p>
			<p class="text-white text-lg mt-4">คุณได้เลือกคาถาดังต่อไปนี้และได้ผลลัพธ์ออกมาว่า</p>
			<ul class="flex flex-col gap-y-1 mb-4">
				{#each result?.verses as verse, index}
					<span class={`${result.result[index] ? 'text-green-500' : 'text-red-500'} `}>
						{verse}{' '}
						{result.result[index] ? 'ถูกต้อง' : 'ไม่ถูก'}
					</span>
				{/each}
			</ul>

			{#if result.correctPair && result.isCorrect}
				<p class="text-lg text-accent">
					ขอแสดงความยินดีด้วย! คุณได้ตามหาภูตประจำตัวของคุณสำเร็จและได้คลายมนต์สะกดเป็นอันเรียบร้อย
					ขอบคุณที่มาเข้าร่วมกิจกรรมสายรหัสของเราในปีนี้ แล้วไว้เจอกันอีกปีหน้า!
				</p>
			{:else if !result.correctPair && result.isCorrect}
				<p class="text-lg text-white">
					แต่อย่างไรก็ตาม ดูเหมือนว่านี่จะไม่ใช่ภูตของเจ้า! จงค้นหาต่อไป
				</p>
			{/if}

			<div class="mt-12 flex flex-col gap-y-4">
				<SrhButton
					{isLoading}
					on:click={() => {
						result = undefined;
					}}>รับทราบ</SrhButton
				>
			</div>
		</div>
	</div>
{/if}

<div class="flex flex-col w-full gap-y-12">
	<div class="flex flex-col items-center text-white font-krub drop-shadow-[0px_0px_10px_#FFAEBD]">
		<h1 class="font-bold text-5xl">รหัสภูต</h1>
		<p class="font-extralight text-lg mt-4">เป็นอักขระที่น่าพิศวงจริงๆ</p>
	</div>
	<div class="w-full h-full flex flex-col items-center justify-center">
		<h1 class="my-1 text-[#FFF8D4] text-center font-krub drop-shadow-[0px_0px_2px_#FFF8D4]">
			ภูตตนนี้มีนามว่า...
		</h1>
		<div
			class="w-full overflow-visible flex justify-center px-10 gap-x-4 items-center py-4 pb-6 bg-cover object-cover relative h-36 pt-9"
		>
			<img src="./bg-seirei2.png" class="absolute inset-0 mx-auto" alt="background cover" />
			<div class={`grid place-items-center`}>
				<img class="w-20 h-20" src={sophomoreTarget?.img} alt="" />
			</div>
			<div class={`font-krub text-base font-normal text-white drop-shadow-[0px_0px_5px_#FFF5C0]`}>
				<p>เผ่า: {sophomoreTarget?.faction}</p>
				<p>ชื่อ: {sophomoreTarget?.firstname}</p>
				<p>นามสกุล: {sophomoreTarget?.lastname}</p>
				<p>ชื่อเล่น: {sophomoreTarget?.nickname}</p>
			</div>
		</div>
		<div class="w-full flex flex-col items-center gap-y-4 px-6 mt-4">
			{#if !starterVerses.length}
				<p class="text-white text-left w-full mt-4">เลือกบทคาถาที่จะร่าย</p>
			{:else}
				<p class="text-white text-left w-full my-4">
					เพราะโชคชะตาอะไรบางอย่างท่านรู้ว่ามี <span class="text-accent font-bold"
						>{starterVerses.map((s) => s?.toUpperCase()).join(' และ ')}</span
					>
					เป็นหนึ่งในคาถาที่จะต้องร่าย
				</p>
			{/if}

			{#each new Array(3) as _, index}
				{#if !last?.result[index]}
					<Dropdown
						containerClass={`w-full ${verses[index].wildcard} ${
							verses[index].wildcard ? 'bg-red-500' : 'text-white'
						}`}
						class={`bg-transparent border-[#AB9F7E] border-2 outline-none w-full text-center h-14 rounded-2xl drop-shadow-[0px_0px_5px_#FFFADD] font-Krub font-bold text-2xl px-4`}
						on:change={(e) => {
							// @ts-ignore
							if (e.target.value === 'undefined') {
								// @ts-ignore
								answer[index] = undefined;
								return;
							}
							// @ts-ignore
							const value = e.target.value;

							const audio = new Audio(requiremSounds[index]);
							audio.volume = 0.1;
							audio.play();
							answer[index] = value;
						}}
					>
						<!-- <option selected value={undefined} class="text-black text-base flex">???</option> -->

						{#each verses as w}
							{#if !answer.includes(w.handler) || answer[index] === w.handler}
								<option value={w.handler} class="text-black text-base flex"
									>{w.name.toUpperCase()}</option
								>
							{/if}
						{/each}
					</Dropdown>
				{:else}
					<div
						class="bg-[#472D1C] border-2 border-[#AB9F7E] w-full text-center py-3 drop-shadow-[0px_0px_5px_#FFEE96] rounded-2xl"
					>
						<p class="text-white font-Pridi text-2xl drop-shadow-[0px_0px_7.5px_#FFF5C0]">
							{last?.verses[index].name.toUpperCase()}
						</p>
					</div>
				{/if}
			{/each}
		</div>
	</div>

	<div class="flex flex-col items-center gap-y-5">
		<div class="text-center flex flex-col gap-y-2">
			<p class="text-white text-sm font-Pridi">คุณเหลืออยู่ทั้งหมด {balance} Spirit Shards</p>
			{#if costPrediction}
				<p class="text-white text-sm font-Pridi">
					เจ้าอาจจะต้องจ่ายสูงสุดถึง {costPrediction} Spirit Shards
				</p>
			{/if}
		</div>
		<div class="flex">
			<SrhButton
				{isLoading}
				disabled={disabledSubmitVerses}
				on:click={() => {
					confirm(
						`แน่ใจนะว่าเจ้าจะร่ายเวทย์นี้? เจ้าอาจจะเสียสูงสุด ${costPrediction} Spirit Shards!`
					);
					checkAnswer();
				}}>ร่ายคาถา</SrhButton
			>
		</div>
	</div>

	<div class="relative text-center mt-5">
		<div
			class="border-accent-alt border rounded-full px-16 py-1 bg-gray-900 inline-block z-10 absolute inset-x-5 top-0 transform -translate-y-1/2"
		>
			<h4 class="font-Pridi text-[#F7B962] drop-shadow-[0px_0px_5px_#FFEC8A]">HOW TO PLAY</h4>
		</div>
		<div class="border-accent-alt border py-10 px-3 flex flex-col gap-y-4">
			<p class="text-white text-sm font-thin font-Pridi">
				ตอนนี้นั้นเจ้าได้เจอภูต{sophomoreTarget?.nickname}!
				แต่ทว่าเจ้าไม่สามารถตรวจสอบได้เลยว่าภูตนี้เป็นภูตประจำตัวของเจ้าได้หรือไม่
				เพราะว่ากำลังโดนเวทมนตร์ของจอมมารควบคุมอยู่
			</p>
			<p class="text-white text-sm font-thin font-Pridi">
				การที่จะปลดเวทย์ของจอมมารนั้น จะต้องท่องคาถา 3 ตัวให้ถูกตัวและถูกลำดับ
				โดยการท่องคาถาแต่ละตัวจะใช้ 1 Spirit Shard แต่ว่าหากท่องถูกคาถา จะได้รับ Spirit Shard
				คืนกลับมา
			</p>
			<p class="text-white text-sm font-thin font-Pridi">
				เหล่าจอมเวทย์จะมีคาถาอยู่ด้วยกันรวมทั้งหมด 9 บทได้แก่ CRACKPOT BRAVE PADFOOT NERVE CHIVALRY
				GOBLET SWISH DEMENTOR และ EXPELLO ที่เป็นคาถาบทพิเศษที่หากคาถาที่เลือกอีก 2 ถูก คาถา EXPELLO
				จะถูกไปด้วยโดยอัตโนมัติแลกมากลับด้วยใช้ 10 Spirit Shards เสมอและไม่สามารถแลกได้คืนได้
			</p>
			<p class="text-white text-sm font-thin font-Pridi">
				หลังจากเจ้าได้ทำการท่องคาถาที่ถูกต้องทั้ง 3 แล้ว
				เจ้าจะทราบว่าภูตที่ยืนอยู่ข้างหน้าเจ้าเป็นภูตประจำตัวเจ้าหรือไม่!
			</p>
			<p class="text-white text-sm font-thin font-Pridi">
				เจ้าเชื่อเรื่องของโชคชะตาหรือไม่? การเดินทางของเจ้านั้นใกล้จะมาถึงจุดจบแล้ว
				ขอให้พวกเจ้าโชคดี!
			</p>
			<img src="../close.png" alt="" />
		</div>
	</div>
</div>
