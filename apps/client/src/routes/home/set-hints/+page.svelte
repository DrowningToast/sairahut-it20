<script lang="ts">
	import SRHButton from '../../../lib/components/svelte/SRHButton.svelte';
	import Input from '../../../lib/components/ui/input/Input.svelte';

	let skin: string,
		personal: string,
		height: string,
		sex: string,
		fav_food: string,
		hobby: string,
		fav_place: string,
		dress: string,
		name: string;

	let readyToSubmit: boolean = false;

	const onReset = () => {
		skin = personal = height = sex = fav_food = hobby = fav_place = dress = name = '';
	};

	const onSubmit = () => {
		// onsubmit
	};
</script>

<div class=" drop-shadow-[0px_0px_7.5px_#FFAEBD] leading-10 text-white font-krub">
	<h1 class="text-2xl font-bold">คำใบ้ คำใจ คำใดๆ ที่สื่อถึงแก</h1>
	<p class=" font-thin">คำใบ้ที่กวนๆ เหมาะสำหรับคณะที่กวนใจ</p>
</div>

<div class="text-white flex flex-col gap-y-7 font-extralight font-krub mt-3">
	<div class="flex flex-col gap-y-2">
		<p>รูปร่าง</p>
		<Input class=" text-white bg-blue-400/25" value={skin} isDisabled={readyToSubmit} />
	</div>
	<div class="flex flex-col gap-y-2">
		<p>นิสัย</p>
		<Input class=" text-white bg-blue-400/25 " value={personal} isDisabled={readyToSubmit} />
	</div>
	<div class="flex flex-col gap-y-2">
		<p>ส่วนสูง</p>
		<Input class=" text-white bg-blue-400/25 " value={height} isDisabled={readyToSubmit} />
	</div>
	<div class="flex flex-col gap-y-2">
		<p>เพศ</p>
		<Input class=" text-white bg-blue-400/25 " value={sex} isDisabled={readyToSubmit} />
	</div>
	<div class="flex flex-col gap-y-2">
		<p>ชอบกินอะไร</p>
		<Input class=" text-white bg-blue-400/25 " value={fav_food} isDisabled={readyToSubmit} />
	</div>
	<div class="flex flex-col gap-y-2">
		<p>งานอดิเรก</p>
		<Input class=" text-white bg-blue-400/25 " value={hobby} isDisabled={readyToSubmit} />
	</div>
	<div class="flex flex-col gap-y-2">
		<p>ชอบอยู่ที่ไหนในคณะ</p>
		<Input class=" text-white bg-blue-400/25 " value={fav_place} isDisabled={readyToSubmit} />
	</div>
	<div class="flex flex-col gap-y-2">
		<p>เป็นคนแต่งกายแบบไหนหยอ</p>
		<Input class=" text-white bg-blue-400/25 " value={dress} isDisabled={readyToSubmit} />
	</div>
	<div class="flex flex-col gap-y-2">
		<p>ใบ้เกี่ยวกับชื่อตัวเองหน่อย</p>
		<Input class=" text-white bg-blue-400/25 " value={name} isDisabled={readyToSubmit} />
	</div>
	<div class="flex justify-between mt-2">
		{#if !readyToSubmit}
			<div class="w-full flex justify-start">
				<SRHButton class="w-10/12" on:click={onReset} disable={readyToSubmit}>RESET</SRHButton>
			</div>
			<div class="w-full flex justify-end">
				<SRHButton class="w-10/12" on:click={onSubmit}>SAVE</SRHButton>
			</div>
		{:else}
			<div class="w-full flex justify-center">
				<p class="text-accent">You are already to submit.</p>
			</div>
		{/if}
	</div>
</div>
