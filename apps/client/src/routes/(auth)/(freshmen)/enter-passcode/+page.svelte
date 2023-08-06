<script lang="ts">
	import Alert from '$components/ui/alert/Alert.svelte';
	import AlertDescription from '$components/ui/alert/AlertDescription.svelte';
	import AlertTitle from '$components/ui/alert/AlertTitle.svelte';
	import SRHButton from '$lib/components/svelte/SRHButton.svelte';
	import { trpc } from '$lib/trpc';

	interface IFoundTarget {
		passcode: string;
		nickname: string;
		fullname: string;
		isUsed: boolean;
		gen: number;
	}

	interface ISubmitPasscode {
		hintRevealed: boolean;
		revealedHintsIn: number;
	}

	let found: IFoundTarget | undefined;
	let passcodeRes: ISubmitPasscode | undefined;
	let passcode = '';

	$: found = undefined;
	$: passcodeRes = undefined;
	$: success = false;
	$: isLoading = false;

	const submitPasscode = async () => {
		if (passcode === '') {
            found = undefined;
            passcodeRes = undefined;
            success = false;
            isLoading = false;
			return;
		}

		const res = await trpc.freshmens.getPasscodeByPasscodeId.query(passcode);

        if (!res.success) {
            return alert(res.payload)
        }

		found = res?.payload as IFoundTarget;
	};

	const handleSubmit = async () => {
		isLoading = true;

		const res = await trpc.freshmens.submitPasscode.mutate(passcode);
		success = true;

		passcodeRes = res.payload;

		isLoading = false;
	};
</script>

{#if found && !success}
	<div class="absolute inset-0 grid place-items-center z-20">
		<div class="absolute inset-0 bg-gray-50/25" />
		<div class="bg-neutral-900 mx-12 p-8 flex flex-col gap-y-2 z-10 rounded-lg">
			<h1 class="text-accent text-lg font-semibold">เจอภูตแล้ว!</h1>
			<p class="text-accent whitespace-pre-wrap text-left">
				ภูตตัวนี้นั้นมีชื่อว่า {found.nickname} รุ่นที่ {found.gen}
			</p>
			<p class="text-accent text-center">
				({found.fullname})
			</p>
			<p class="text-accent text-left">
				และดูเหมือนว่าเจ้านั้น{found.isUsed ? 'เคยจับได้แล้ว!' : 'จะยังไม่ได้จับ!'}
			</p>
			<div class="mt-12 flex flex-col gap-y-4">
				<SRHButton
					on:click={() => {
						if (!found?.passcode) return;
						handleSubmit();
					}}
					disabled={found.isUsed}
					{isLoading}>จับเลย!</SRHButton
				>
				<SRHButton
					{isLoading}
					on:click={() => {
						found = undefined;
					}}>ยกเลิก</SRHButton
				>
			</div>
		</div>
	</div>
{/if}

{#if success && passcodeRes}
	<Alert class="bg-neutral-900/25 text-accent border-accent">
		<AlertTitle>สำเร็จ!</AlertTitle>
		<AlertDescription>คุณได้จับภูต {found?.nickname} เรียบร้อยแล้ว!</AlertDescription>
		<AlertDescription
			>{passcodeRes.hintRevealed
				? 'คำใบ้ได้ถูกเปิดเพิ่มแล้้ว'
				: `คำใบ้จะเปิดในอีก ${passcodeRes.revealedHintsIn} ครั้ง หลังจากการใส่รหัส`}</AlertDescription
		>
	</Alert>
{/if}

<div class="flex flex-col items-center">
	<h1 class="font-Pridi text-4xl font-thin text-white text-center">ใส่รหัสลับ</h1>
	<input
		type="text"
		bind:value={passcode}
		class="w-11/12 border-b bg-transparent outline-none text-center text-5xl mt-6 font-Pridi font-thin text-[#A8A29E]"
	/>
	<p class="text-center font-Pridi text-sm whitespace-pre mt-16 text-white font-thin">
		เมื่อรหัสถูกใช้แล้วจะไม่สามารถใช้รหัสเดิมได้ คำอธิบายการเล่น Lorem ipsum dolor sit amet.
	</p>
	<SRHButton class="mt-32" on:click={submitPasscode}>SUBMIT</SRHButton>
	<img src="./konnok-footer.png" alt="" class=" mt-10" />
</div>
