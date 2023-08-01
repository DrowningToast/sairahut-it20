<script lang="ts">
	import { page } from '$app/stores';
	import { trpc } from '$lib/trpc';
	import { onMount, onDestroy } from 'svelte';
	import SRHButton from '$lib/components/svelte/SRHButton.svelte';
	import Input from '$lib/components/ui/input/Input.svelte';
	import { goto } from '$app/navigation';
	import { Loader2 } from 'lucide-svelte';
	import ConfirmDialog from '$components/svelte/ConfirmDialog.svelte';
	import DialogFooter from '$components/ui/dialog/DialogFooter.svelte';
	import DialogHeader from '$components/ui/dialog/DialogHeader.svelte';
	import type { PageData } from './$types';
	import type { Hints } from 'database';

	let isLoading = false;

	export let data: PageData;
	$: alreadySetHints = data.result.length !== 0;

	const initHints = async () => {
		const hintSlugId = [
			'appearance',
			'height',
			'personality',
			'sex',
			'food',
			'hobby',
			'quote',
			'place',
			'fashion',
			'name_hint'
		];

		const hintSlugs = await trpc.sophomores.getHintSlugs.query();

		hints = hintSlugId.map((hint) => {
			const result = hintSlugs.find((value) => value.slug === hint);

			return {
				slug: hint,
				displayName: result?.displayName as string,
				content: undefined
			};
		});
	};

	interface Hint {
		displayName: string;
		slug: string;
		content: undefined | string;
	}
	let hints: Hint[] = [];

	onMount(async () => {
		if (data.result.length === 0) {
			await initHints();
		} else {
			hints = data.result;
		}
	});

	$: readyToSubmit =
		hints.filter((hint) => {
			return !!hint.content;
		}).length >= 10;

	const onSubmit = async () => {
		isLoading = true;

		try {
			const payload = hints.map((value) => ({
				...value,
				content: value.content as string
			}));
			await trpc.sophomores.submitHints.mutate(payload);
			goto('/this-or-that');
		} catch (err) {
			console.error(err);
		} finally {
			isLoading = false;
		}
	};

	onDestroy(() => {
		isLoading = false;
	});
</script>

{#if isLoading}
	<div
		class="w-screen h-screen fixed bg-black top-0 left-0 bg-opacity-70 grid place-items-center z-50"
	>
		<Loader2 class="animate-spin text-white w-20 h-20" />
	</div>
{/if}

<div class=" drop-shadow-[0px_0px_7.5px_#FFAEBD] leading-10 text-white font-krub">
	<h1 class="text-2xl font-bold">คำใบ้ คำใจ คำใดๆ ที่สื่อถึงแก</h1>
	<p class=" font-thin leading-6 mt-4">คำใบ้ที่กวนๆ เหมาะสำหรับคณะที่กวนใจ (จะแสดงให้น้องเห็น)</p>
</div>

<div class="text-white flex flex-col gap-y-7 font-extralight font-krub mt-3">
	{#each hints as hint, index}
		<div class="flex flex-col gap-y-2">
			<p>{hint.displayName}</p>
			<Input
				isDisabled={alreadySetHints}
				class=" text-white bg-blue-400/25"
				bind:value={hints[index].content}
			/>
		</div>
	{/each}
	<div class="flex justify-between mt-2">
		<!-- <div class="w-full flex justify-start">
			<SrhButton class="w-10/12" on:click={onReset}>รีเซ็ต</SrhButton>
		</div> -->
		<div class="w-full flex justify-center">
			<ConfirmDialog {isLoading} disabled={!readyToSubmit || alreadySetHints} triggerText="ยืนยัน">
				<DialogHeader class="text-xl">แน่ใจนะ?</DialogHeader>
				<p class="text-sm">
					คำใบ้ของพี่ๆ นั้นจะถูกแสดงให้รุ่นน้องเมื่อน้องได้เล่นเกมไปจนถึงจุดๆ นึง น้องๆ
					อาจจะไม่ได้เห็นคำใบ้ทุกคำจนกระทั้งตอนจบ
					เพราะฉะนั้นแน่ใจแล้วใช่ไหมว่าจะใช้คำใบ้พวกนี้กับรุ่นนี้
				</p>
				<DialogFooter>
					<SRHButton
						class="w-7/12 mx-auto"
						on:click={onSubmit}
						disabled={!readyToSubmit}
						{isLoading}>บันทึก</SRHButton
					>
				</DialogFooter>
			</ConfirmDialog>
		</div>
	</div>
</div>