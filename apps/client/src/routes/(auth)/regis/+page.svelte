<script lang="ts">
	import { goto } from '$app/navigation';
	import Dropdown from '$components/svelte/Dropdown.svelte';
	import FormErrorText from '$components/svelte/FormErrorText.svelte';
	import SrhButton from '$components/svelte/SRHButton.svelte';
	import SrhHeading from '$components/svelte/SRHHeading.svelte';
	import { Dialog, DialogTrigger } from '$components/ui/dialog';
	import DialogContent from '$components/ui/dialog/DialogContent.svelte';
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

		console.log('lmao');

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
		<div class="flex justify-between mt-2">
			<div class="w-full flex justify-center">
				<Dialog>
					<SrhButton type="button" disabled={!readyToSubmit}
						><DialogTrigger>ลงทะเบียน</DialogTrigger></SrhButton
					>
					<DialogContent class="absolute top-16 inset-x-10 w-auto">
						<DialogHeader>แน่ใจนะ?</DialogHeader>
						หากยืนยันข้อมูลในหน้านี้ จะไม่สามารถแก้ไขข้อมูลส่วนตัวได้อีก หากไม่แน่ใจ น้องๆ ควรตรวจทานอีกทีหนึ่ง
						<DialogFooter>
							<SrhButton
								on:click={() => handleSubmit(freshmenRegister.parse(payload))}
								{isLoading}
								type="submit"
								disabled={!readyToSubmit}
								class="w-7/12 mx-auto">ACCEPT</SrhButton
							>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	</div>
</div>
