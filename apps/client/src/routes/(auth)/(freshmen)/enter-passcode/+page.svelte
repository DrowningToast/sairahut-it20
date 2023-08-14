<script lang="ts">
	import Alert from '$components/ui/alert/Alert.svelte';
	import AlertDescription from '$components/ui/alert/AlertDescription.svelte';
	import AlertTitle from '$components/ui/alert/AlertTitle.svelte';
	import SRHButton from '$lib/components/svelte/SRHButton.svelte';
	import { trpc } from '$lib/trpc';
	import { z } from 'zod';
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	interface IFound {
		nickname: string;
		fullname: string;
		gen: number;
		isExpired: boolean;
		hasScanned: boolean;
		faction: string;
	}

	const pageData = $page.data as PageData;

	let readyToSubmit: boolean;
	let found: IFound | undefined;
	let passcodeRes;
	let passcode = '';
	let isDisabled = false;

	let resinLeft = pageData.resinLeft ?? 0;
	$: resinLeft;

	$: passcode = passcode.toUpperCase();
	$: readyToSubmit = z.string().length(6).safeParse(passcode).success;
	$: found = undefined;
	$: passcodeRes = undefined;
	$: success = false;
	$: isLoading = false;
	$: isDisabled = !!(!readyToSubmit || found?.hasScanned || found?.isExpired || resinLeft < 5);

	let shardsEarned = 1;
	$: shardsEarned;

	const submitPasscode = async () => {
		if (passcode === '') {
			found = undefined;
			passcodeRes = undefined;
			success = false;
			isLoading = false;
			return;
		}

		isLoading = true;

		const res = await trpc.freshmens.getPasscodeInfo.query(passcode);

		if (!res.success) {
			isLoading = false;
			passcode = '';
			return alert('Invalid passcode');
		}

		found = res?.payload as IFound;

		isLoading = false;
	};

	const handleSubmit = async () => {
		isLoading = true;

		const res = await trpc.freshmens.submitPasscode.mutate(passcode);
		if (!res.success) {
			found = undefined;
			return alert('An error has occured, please try again.');
		}

		const newResinLeft = (await trpc.resin.getMyQuota.query()) ?? 0;

		success = true;
		passcodeRes = res.payload;
		isLoading = false;
		resinLeft = newResinLeft;
		passcode = '';
		shardsEarned = res.payload.shards;

		// play sfx
		const rewardSFX = new Audio();
		rewardSFX.src = '/sfx/RewardSFX.ogg';
		rewardSFX.play();

		setTimeout(() => {
			passcode = '';
			found = undefined;
			success = false;
			shardsEarned = 1;
		}, 5000);
	};
</script>

{#if found && !success}
	<div class="fixed inset-0 grid place-items-center z-20">
		<div class="absolute inset-0 bg-gray-50/25" />
		<div class="bg-neutral-900 mx-12 p-8 flex flex-col gap-y-2 z-10 rounded-lg">
			<h1 class="text-accent text-lg font-semibold">รหัสถูกต้อง!</h1>
			<p class="text-accent whitespace-pre-wrap text-left">
				ภูตตัวนี้นั้นมีชื่อว่า {found.nickname} รุ่นที่ {found.gen}
			</p>
			<p class="text-accent text-center my-2">
				({found.fullname}
				{found.faction})
			</p>

			<p class="text-accent text-left">
				และดูเหมือนว่า{found.hasScanned
					? ' เจ้าเคยล้วงความลับของภูตตัวนี้ไปแล้ว'
					: found.isExpired
					? 'โดนคนอื่นล้วงความลับออกไปแล้ว ถ้าเป็นไปได้ ลองให้ภูตกด Refresh Passcode ดูดีไหม?'
					: ' เจ้านั้นยังไม่เคยล้วงความลับ!'}
			</p>
			<div class="mt-12 flex flex-col gap-y-4">
				<SRHButton
					on:click={() => {
						if (!found) return;
						handleSubmit();
					}}
					disabled={found.hasScanned || found.isExpired}
					{isLoading}>ล้วงความลับ!</SRHButton
				>
				<SRHButton
					{isLoading}
					on:click={() => {
						found = undefined;
						isLoading = false;
					}}>ยกเลิก</SRHButton
				>
			</div>
		</div>
	</div>
{/if}

{#if success}
	<Alert class="bg-neutral-900/25 text-accent border-accent mb-6">
		<AlertTitle>สำเร็จ!</AlertTitle>
		<AlertDescription
			>คุณได้ล้วงความลับของภูต <span class="font-semibold">{found?.nickname}</span> เรียบร้อยแล้ว!
			เจ้าได้ 5 Bells กับ {shardsEarned} Spirit Shards</AlertDescription
		>
	</Alert>
{/if}

<div class="flex flex-col items-center">
	<h1 class="font-Pridi text-4xl font-thin text-white text-center">ใส่รหัสลับ</h1>
	<span
		class="text-accent text-xs font-Pridi font-extralight decoration-solid bg-[#29436c2b] px-6 py-2 border-[1px] border-accent rounded-md mt-5"
	>
		{resinLeft} Resin left
	</span>
	<input
		minlength="6"
		maxlength="6"
		type="text"
		bind:value={passcode}
		class={`w-11/12 border-b bg-transparent outline-none text-center text-5xl mt-6 font-Pridi font-thin ${
			readyToSubmit ? 'text-accent' : 'text-[#A8A29E]'
		}`}
	/>
	<div class="flex flex-col gap-y-4 py-8">
		<p class="text-center font-Pridi text-sm text-white font-thin">
			ปัจจุบันคุณมี Resin ทั้งหมด {resinLeft} โดยคุณสามารถนำ Resin ไปแปลงเป็น Bells ผ่านการกรอกรหัสผ่านจากภูตเพื่อนำไปซื้อคำใบ้ได้
			โดยคุณจะได้เพิ่มวันละ 40 Resin
		</p>
		<p class="text-center font-Pridi text-sm text-white font-thin">
			เมื่อได้รับรหัสจากภูตแล้ว เจ้าจะได้ Bells และ Spirit Shards
			โดยตำนานเล่าขานกันว่าผู้ได้ครอบครอง Bells เมื่อสะสมมากพอ จะสามารถฟังความลับของจักรวาลได้
		</p>
		<p class="text-center font-Pridi text-sm text-white font-thin">
			โดยที่หากได้รับรู้ถึงความลับของเผ่าภูตเดียวกันกับภูตของจอมเวทย์ ตัวเจ้าจะได้ Spirit Shards
			มากกว่าปกติ
		</p>
		<p class="text-center font-Pridi text-sm text-white font-thin">
			จอมเวทย์จะไม่สามารถกรอกรหัสของเหล่าภูตที่เคยกรอกรหัสไปแล้วซ้ำได้
		</p>
	</div>
	<a
		href="/give-passcode-history"
		class="text-accent text-xs font-Pridi font-extralight decoration-solid bg-[#29436c2b] px-3 py-2 border-2 border-[#462F47] rounded-md mt-5"
		>ดูประวัติการกรอกรหัส</a
	>

	<SRHButton {isLoading} disabled={isDisabled} class="mt-10" on:click={submitPasscode}
		>ล้วงความลับ</SRHButton
	>
	<img src="./konnok-footer.png" alt="" class=" mt-10" />
</div>
