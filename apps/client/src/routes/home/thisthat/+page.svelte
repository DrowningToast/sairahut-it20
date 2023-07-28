<script>
	import SrhButton from '$components/svelte/SRHButton.svelte';
	import QuesThisOrThat from './../../../lib/components/svelte/QuesThisOrThat.svelte';

	$: selecteds = new Array(10).fill(null);
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

	$: readyToSubmit =
		selecteds.filter((selected) => {
			return !!selected;
		}).length >= 10;
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
	{#each choices as choice, index (choice)}
		<QuesThisOrThat
			leftText={choice.left}
			rightText={choice.right}
			bind:selected={selecteds[index]}
		/>
	{/each}
</div>

<div class=" text-center mt-16 text-accent-3">
	<p>อย่าลืมแคปรูปนี้แล้วแท๊กลง IG: @sairahut_itkmitl</p>
</div>
<SrhButton disabled={!readyToSubmit} class="px-4">ยืนยันคำตอบ</SrhButton>
