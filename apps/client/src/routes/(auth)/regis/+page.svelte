<script lang="ts">
	import { goto } from '$app/navigation';
	import ConfirmDialog from '$components/svelte/ConfirmDialog.svelte';
	import Dropdown from '$components/svelte/Dropdown.svelte';
	import SrhButton from '$components/svelte/SRHButton.svelte';
	import SrhHeading from '$components/svelte/SRHHeading.svelte';
	import DialogFooter from '$components/ui/dialog/DialogFooter.svelte';
	import DialogHeader from '$components/ui/dialog/DialogHeader.svelte';

	import Input from '$components/ui/input/Input.svelte';
	import { trpc } from '$lib/trpc';
	import { freshmenRegister, type FreshmenRegister } from '$lib/zod';

	const payload: Partial<FreshmenRegister> = {};

	$: readyToSubmit =
		freshmenRegister.safeParse(payload).success &&
		!!(payload.facebook_link || payload.instagram_link);

	$: isLoading = false;

	const handleSubmit = async (payload: FreshmenRegister) => {
		isLoading = true;

		try {
			await trpc.freshmens.regis.mutate(payload);
			goto('/home');
		} catch (e) {
			isLoading = false;
			alert('ได้มีข้อผิดพลาดเกิดขึ้นกรุณาลองใหม่ หากยังไม่สามารถแก้ไขได้กรุณาติดต่อสตาฟ');
		}
	};
</script>

<div class="text-white flex flex-col gap-y-7 font-extralight font-krub mt-3 relative">
	<SrhHeading>ลงทะเบียน</SrhHeading>
	<div class="flex flex-col gap-y-4">
		<div class="flex flex-col gap-y-1">
			<p>คำนำหน้า*</p>
			<Dropdown bind:value={payload['title']} required class="bg-blue-400/25">
				<option value="MR"> นาย </option>
				<option value="MRS"> นางสาว </option>
			</Dropdown>
		</div>
		<div class="flex flex-col gap-y-1">
			<p>ชื่อ*</p>
			<Input required class=" text-white bg-blue-400/25" bind:value={payload['first_name']} />
		</div>
		<div class="flex flex-col gap-y-1">
			<p>นามสกุล*</p>
			<Input required class=" text-white bg-blue-400/25" bind:value={payload['last_name']} />
		</div>
		<div class="flex flex-col gap-y-1">
			<p>ชื่อเล่น*</p>
			<Input required class=" text-white bg-blue-400/25" bind:value={payload['nickname']} />
		</div>
		<div class="flex flex-col gap-y-1">
			<p>สาขา*</p>
			<Dropdown bind:value={payload['branch']} required class="bg-blue-400/25">
				<option value="IT">IT</option>
				<option value="DSBA">DSBA</option>
				<option value="BIT">BIT</option>
				<option value="AIT">AIT</option>
			</Dropdown>
		</div>
		<div class="flex flex-col gap-y-1">
			<p>เบอร์โทรศัพท์ติดต่อ* (ข้อมูลนี้จะไม่ถูกเปิดเผย)</p>
			<Input type="tel" required class=" text-white bg-blue-400/25" bind:value={payload['phone']} />
		</div>
		<div class="mt-8 my-4 text-center flex flex-col gap-y-2">
			<h1 class="font-bold text-lg">ข้อมูลติดต่อสาธารณะ <br /> (ผู้เล่นคนอื่นจะเห็น)</h1>
			<p class="text-sm">ต้องกรอกอย่างน้อย 1 อย่าง</p>
		</div>
		<div class="flex flex-col gap-y-1">
			<p>Instagram Link</p>
			<Input type="url" class=" text-white bg-blue-400/25" bind:value={payload['instagram_link']} />
		</div>
		<div class="flex flex-col gap-y-1">
			<p>Facebook Link</p>
			<Input type="url" class=" text-white bg-blue-400/25" bind:value={payload['facebook_link']} />
		</div>
		<div class="my-4 flex flex-col gap-y-2">
			<SrhHeading class="text-lg">เงื่อไขการให้บริการ</SrhHeading>
			<p class="text-accent">
				หากท่านได้กดปุ่ม ACCEPT ท่านได้ทราบและยินยอมให้เรา (ผู้พัฒนาและทีมจัดกิจกรรม)
				เก็บข้อมูลส่วนตัวของท่านได้เป็นระยะเวลาทั้งหมด 1 ปีนับจากวันจบกิจกรรม
				และท่านได้ทราบและยินยอมว่า
				ข้อมูลส่วนตัวของท่านบางส่วนจะถูกเปิดเผยต่อผู้เล่นอื่นระหว่างกิจกรรม
			</p>
		</div>
		<div class="flex justify-between mt-2">
			<div class="w-full flex justify-center">
				<ConfirmDialog {isLoading} disabled={!readyToSubmit} triggerText="ยืนยัน"
					><DialogHeader class="text-xl">แน่ใจนะ?</DialogHeader>
					<p class="text-sm">
						หลังจากทำการลงทะเบียนแล้ว จะไม่สามารถกลับเข้ามาแก้ไขข้อมูลส่วนตัวได้อีก
						หากน้องไม่แน่ใจว่าน้องได้กรอบข้อมูลถูกต้องและครบ พี่แนะนำให้กลับไปเช็คอีกครั้งหนึ่ง
					</p>
					<DialogFooter>
						<SrhButton
							{isLoading}
							on:click={() => handleSubmit(freshmenRegister.parse(payload))}
							disabled={!readyToSubmit}
							class="px-4">ยืนยันคำตอบ</SrhButton
						>
					</DialogFooter></ConfirmDialog
				>
			</div>
		</div>
	</div>
</div>
