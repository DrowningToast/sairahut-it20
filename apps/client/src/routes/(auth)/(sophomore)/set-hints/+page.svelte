<script lang="ts">
	import { trpc } from '$lib/trpc';
	import { onMount, onDestroy } from 'svelte';
	import SRHButton from '$lib/components/svelte/SRHButton.svelte';
	import Input from '$lib/components/ui/input/Input.svelte';
	import { goto } from '$app/navigation';
	import { Eye, EyeOff, Loader2, Lock, Unlock } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { AlertDialog, AlertDialogTrigger } from '$components/ui/alert-dialog';
	import SrhButton from '$lib/components/svelte/SRHButton.svelte';
	import AlertDialogContent from '$components/ui/alert-dialog/AlertDialogContent.svelte';
	import AlertDialogHeader from '$components/ui/alert-dialog/AlertDialogHeader.svelte';
	import AlertDialogTitle from '$components/ui/alert-dialog/AlertDialogTitle.svelte';
	import AlertDialogDescription from '$components/ui/alert-dialog/AlertDialogDescription.svelte';
	import AlertDialogFooter from '$components/ui/alert-dialog/AlertDialogFooter.svelte';
	import AlertDialogCancel from '$components/ui/alert-dialog/AlertDialogCancel.svelte';
	import AlertDialogAction from '$components/ui/alert-dialog/AlertDialogAction.svelte';

	let isLoading = false;

	export let data: PageData;
	$: alreadySetHints = data.result.length !== 0;

	$: hidePassword = alreadySetHints;

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
		shown?: boolean;
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
			<div class="flex gap-x-2 items-center">
				{#if !hint?.shown}
					<EyeOff opacity={0.75} size={20} />
				{:else}
					<Eye opacity={0.75} size={20} />
				{/if}
				<p>{hint.displayName}</p>
			</div>
			<Input
				type={hidePassword ? 'password' : 'text'}
				isDisabled={alreadySetHints}
				class={`text-white bg-blue-400/25 $`}
				bind:value={hints[index].content}
			/>
		</div>
	{/each}
	<div class="flex justify-between mt-2">
		<!-- Inform the user about the icon's meaning -->

		<div class="w-full flex justify-center">
			{#if hidePassword}
				<AlertDialog>
					<AlertDialogTrigger><SrhButton>แสดงคำใบ้</SrhButton></AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>เจ้าแน่ใจนะ?</AlertDialogTitle>
							<AlertDialogDescription>
								คำใบ้ของภูตนั้นถือว่าเป็นความลับ และจะถูกเผยให้เหล่าจอมเวทย์เมื่อถึงเวลาเท่านั้น
								คำใบ้ที่กรอกไปนั้นไม่สามารถถูกแก้ไขได้<b
									>หากเจ้าต้องการตรวจสอบคำใบ้ของตนเองแล้วมีผู้อื่นมาเห็นเข้า ข้าจะไม่รับผิดชอบใดๆ
									ทั้งนั้น</b
								>
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel class="text-white bg-neutral-900">ฉันเปลี่ยนใจ</AlertDialogCancel>
							<AlertDialogAction class="text-red-400 bg-neutral-900/20"
								><button on:click={() => (hidePassword = false)}>ยืนยันแสดงคำใบ้</button
								></AlertDialogAction
							>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			{/if}
		</div>
	</div>
</div>
