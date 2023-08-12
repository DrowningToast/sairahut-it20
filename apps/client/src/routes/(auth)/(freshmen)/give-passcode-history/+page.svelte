<script lang="ts">
	import SRHButton from '../../../../lib/components/svelte/SRHButton.svelte';
	import SRHHeading from '../../../../lib/components/svelte/SRHHeading.svelte';
	import {
		Table,
		TableHead,
		TableRow,
		TableCell,
		TableBody,
		TableHeader
	} from '$components/ui/table';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { determineYear } from '$lib/utils';

	interface Log {
		year: number;
		nickname: string;
		branch: string;
		family: string | undeifned;
	}

	let data: Log[] = [
		{
			year: 20,
			nickname: 'อาร์ม',
			branch: 'IT',
			family: 'Black Dragon Horse'
		},
		{
			year: 20,
			nickname: 'สไป๊',
			branch: 'IT',
			family: 'Phoenix'
		}
	];

	onMount(() => {
		const pageData = $page.data as PageData;
		data = pageData.history.map((log) => {
			return {
				branch: log.owner.branch,
				family: log.owner.user.faction?.name,
				nickname: log.owner.nickname,
				year: determineYear(log.owner.student_id)
			};
		});
	});
</script>

<a href="/enter-passcode" class="underline underline-offset-2 text-blue-500">กลับ</a>

<div class="relative">
	<div class="white-title">
		<h1 class="font-bold text-2xl">ประวัติการกรอกรหัส</h1>
		<p class="mt-2">รวมประวัติการกรอกรหัสลับล่าสุดของท่าน</p>
	</div>
	<!-- <a href="/enter-passcode" class="absolute -top-1 right-0"
		><SRHButton class="text-xs">BACK</SRHButton></a
	> -->
</div>
<hr class="border border-white my-3" />
<Table class="font-krub">
	<TableHeader>
		<TableRow>
			<TableHead class="text-white">รุ่น</TableHead>
			<TableHead class="text-white">ชื่อเล่น</TableHead>
			<TableHead class="text-white">สาขา</TableHead>
			<TableHead class="text-white">เผ่า</TableHead>
		</TableRow>
	</TableHeader>
	<TableBody>
		{#each data as item}
			<TableRow class="text-white">
				<TableCell>{item.year}</TableCell>
				<TableCell>{item.nickname}</TableCell>
				<TableCell>{item.branch}</TableCell>
				<TableCell>{item.family ?? '???'}</TableCell>
			</TableRow>
		{/each}
	</TableBody>
</Table>
