<script lang="ts">
	import { goto } from '$app/navigation';
	import QuesThisOrThat from '$components/svelte/QuesThisOrThat.svelte';
	import SrhButton from '$components/svelte/SRHButton.svelte';
	import { Dialog, DialogTrigger } from '$components/ui/dialog';
	import DialogContent from '$components/ui/dialog/DialogContent.svelte';
	import DialogFooter from '$components/ui/dialog/DialogFooter.svelte';
	import DialogHeader from '$components/ui/dialog/DialogHeader.svelte';
	import { trpc } from '$lib/trpc';
	import ConfirmDialog from '$lib/components/svelte/ConfirmDialog.svelte';

	const selecteds = new Array(10).fill(null);
	const choices = [
		{ left: 'ต่างจังหวัด', right: 'กรุงเทพ & ปริมณฑล' },
		{ left: 'เล่นเกม', right: 'อ่านหนังสือ' },
		{ left: 'เอเชีย', right: 'ตะวันตก' },
		{ left: 'หนัง', right: 'ซีรีย์' },
		{ left: 'กีฬา', right: 'บอร์ดเกม' },
		{ left: 'ชาบู', right: 'หมูกระทะ' },
		{ left: 'สายเรียน', right: 'สายกิจกรรม' },
		{ left: 'งานกลุ่ม', right: 'งานเดี่ยว' },
		{ left: 'เฟสบุ๊ค', right: 'ไอจี' },
		{ left: 'กลางวัน', right: 'กลางคืน' },
		{ left: 'ไปเที่ยว', right: 'อยู่บ้าน' }
	];

	$: console.log(choices);

	$: readyToSubmit =
		selecteds.filter((selected) => {
			return !!selected;
		}).length == choices.length;

	let isLoading: boolean = false;

	const submitThisOrThat = async () => {
		try {
			isLoading = true;
			const res = await trpc.thisThat.submitThisOrThat.mutate(selecteds);
			if (res === 'OK') {
				goto('/home');
			}
		} catch (e) {
			alert('An error has occured');
			isLoading = false;
			console.log(e);
		}
	};
</script>

<div class=" drop-shadow-[0px_0px_7.5px_#FFAEBD] leading-10 text-white font-krub">
	<h1 class="text-5xl font-bold">This or That</h1>
	<p>อันนี้ หรือ อันนี้ดี</p>
</div>
<div class="text-white">
	<p class="font-bold font-krub">อะไรคือ This or That</p>
	<p class=" font-Pridi font-thin text-sm">
		ผู้เล่นกิจกรรมสายรหัสทุกคนจะต้องทำการกรอกความชอบ ของตนเองเพื่อใช้สำหรับ algorithm ของการจับคู่
		พี่และน้อง
	</p>
</div>
<div class="flex flex-col text-white relative gap-y-10 mt-10 overflow-visible">
	{#each choices as choice, index}
		<QuesThisOrThat
			leftText={choice.left}
			rightText={choice.right}
			bind:selected={selecteds[index]}
		/>
	{/each}
	<img
		src="../middle-thisthat.png"
		alt=""
		class="absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3/4"
	/>
</div>

<div class="text-center mt-12 text-accent flex flex-col gap-y-1 mb-2 font-Pridi font-extralight">
	<p>
		อย่าลืมแคปรูปนี้แล้วแท๊กลง IG: <a
			href="https://www.instagram.com/sairahut_itkmitl/"
			target="_blank">@sairahut_itkmitl</a
		>
	</p>
	<p>เมื่อกดบันทึกข้อมูลแล้ว จะไม่สามารถกลับมาแก้ได้อีก</p>
</div>

<ConfirmDialog {isLoading} disabled={!readyToSubmit} triggerText="ยืนยัน"
	><DialogHeader class="text-xl">แน่ใจนะ?</DialogHeader>
	<p class="text-sm">
		ตัวเลือกที่เจ้าได้เลือกมานั้นมีความสำคัญต่อสิ่งที่จะเกิดขึ้นในอนาคตมีหลายปี เจ้าแน่ใจจริงๆ
		นะว่านี่คือตัวตนของเจ้า
	</p>
	<DialogFooter>
		<SrhButton {isLoading} on:click={submitThisOrThat} disabled={!readyToSubmit} class="px-4"
			>ยืนยันคำตอบ</SrhButton
		>
	</DialogFooter></ConfirmDialog
>
