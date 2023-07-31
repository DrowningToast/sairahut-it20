<script lang="ts">
	import { goto } from '$app/navigation';
	import Dropdown from '$components/svelte/Dropdown.svelte';
	import FormErrorText from '$components/svelte/FormErrorText.svelte';
	import SrhButton from '$components/svelte/SRHButton.svelte';
	import SrhHeading from '$components/svelte/SRHHeading.svelte';

	import Input from '$components/ui/input/Input.svelte';
	import { trpc } from '$lib/trpc';
	import { freshmenRegister, type FreshmenRegister } from '$lib/zod';
	import type { FreshmenDetails } from 'database';
	import type { SafeParseError, SafeParseSuccess, ZodError } from 'zod';

	const payload: Partial<FreshmenRegister> = {};

	$: readyToSubmit =
		freshmenRegister.safeParse(payload).success &&
		!!(payload.facebook_link || payload.instagram_link);

	$: isLoading = false;

	let formErrors: Partial<Record<keyof FreshmenRegister, string[] | undefined>> = {};
	$: {
		const parsed = freshmenRegister.safeParse(payload);
		if (!parsed.success) {
			formErrors = parsed.error.formErrors.fieldErrors;
		}
	}

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
	<form
		on:submit|preventDefault|stopPropagation={() => handleSubmit(freshmenRegister.parse(payload))}
		class="flex flex-col gap-y-4"
	>
		<div class="flex flex-col gap-y-1">
			<p>คำนำหน้า*</p>
			<!-- <Input class=" text-white bg-blue-400/25" bind:value={payload['title']} /> -->
			<Dropdown bind:value={payload['title']} required class="bg-blue-400/25">
				<option value="MR"> นาย </option>
				<option value="MRS"> นางสาว </option>
			</Dropdown>
			{#if formErrors.title}
				<FormErrorText>กรุณาระบุคำนำหน้าของท่าน</FormErrorText>
			{/if}
		</div>
		<div class="flex flex-col gap-y-1">
			<p>ชื่อ*</p>
			<Input required class=" text-white bg-blue-400/25" bind:value={payload['first_name']} />
			{#if formErrors.first_name}
				<FormErrorText>กรุณากรอกชื่อจริงของท่าน</FormErrorText>
			{/if}
		</div>
		<div class="flex flex-col gap-y-1">
			<p>นามสกุล*</p>
			<Input required class=" text-white bg-blue-400/25" bind:value={payload['last_name']} />
			{#if formErrors.last_name}
				<FormErrorText>กรุณากรอกชื่อจริงของท่าน</FormErrorText>
			{/if}
		</div>
		<div class="flex flex-col gap-y-1">
			<p>ชื่อเล่น*</p>
			<Input required class=" text-white bg-blue-400/25" bind:value={payload['nickname']} />
			{#if formErrors.nickname}
				<FormErrorText>กรุณากรอกชื่อเล่นของท่าน</FormErrorText>
			{/if}
		</div>
		<div class="flex flex-col gap-y-1">
			<p>สาขา*</p>
			<Dropdown bind:value={payload['branch']} required class="bg-blue-400/25">
				<option value="IT">IT</option>
				<option value="DSBA">DSBA</option>
				<option value="BIT">BIT</option>
				<option value="AIT">AIT</option>
			</Dropdown>
			{#if formErrors.branch}
				<FormErrorText>กรุณาเลือกสาขาการเรียนของท่าน</FormErrorText>
			{/if}
		</div>
		<div class="flex flex-col gap-y-1">
			<p>เบอร์โทรศัพท์ติดต่อ* (ข้อมูลนี้จะไม่ถูกเปิดเผย)</p>
			<Input type="tel" required class=" text-white bg-blue-400/25" bind:value={payload['phone']} />
			{#if formErrors.phone}
				<FormErrorText>กรุณากรอกเบอร์โทรศัพท์ 10 หลักของท่าน</FormErrorText>
			{/if}
		</div>
		<div class="mt-8 my-4 text-center flex flex-col gap-y-2">
			<h1 class="font-bold text-lg">ข้อมูลติดต่อสาธารณะ <br /> (ผู้เล่นคนอื่นจะเห็น)</h1>
			<p class="text-sm">ต้องกรอกอย่างน้อย 1 อย่าง</p>
		</div>
		<div class="flex flex-col gap-y-1">
			<p>Instagram Link</p>
			<Input type="url" class=" text-white bg-blue-400/25" bind:value={payload['instagram_link']} />
			{#if formErrors.instagram_link}
				<FormErrorText>กรุณากรอก URL โปรไฟล์ Instagram ของท่าน</FormErrorText>
			{/if}
		</div>
		<div class="flex flex-col gap-y-1">
			<p>Facebook Link</p>
			<Input type="url" class=" text-white bg-blue-400/25" bind:value={payload['facebook_link']} />
			{#if formErrors.facebook_link}
				<FormErrorText>กรุณากรอก URL โปรไฟล์ Facebook ของท่าน</FormErrorText>
			{/if}
		</div>
		<div class="flex justify-between mt-2">
			<div class="w-full flex justify-end">
				<SrhButton {isLoading} type="submit" disabled={!readyToSubmit} class="w-7/12 mx-auto"
					>ACCEPT</SrhButton
				>
			</div>
		</div>
	</form>
</div>
