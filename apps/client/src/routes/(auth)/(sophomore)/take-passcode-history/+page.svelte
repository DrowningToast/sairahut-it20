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
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { determineYear } from '$lib/utils';

	interface Log {
		year: number;
		nickname: string;
		branch: string;
	}

	const pageData = $page.data as PageData;

	const data: Log[] =
		pageData.history.map((log) => {
			return {
				branch: log.usedBy!.branch,
				nickname: log.usedBy!.nickname,
				year: determineYear(log.usedBy!.student_id)
			};
		}) ?? [];
</script>

<div class="relative">
	<div class="white-title">
		<h1 class="font-bold text-2xl">ประวัติการให้รหัส</h1>
		<p class="mt-2">รวมประวัติการให้รหัสลับล่าสุดของท่าน</p>
	</div>
	<a href="/passcode-gen" class="absolute -top-1 right-0"
		><SRHButton class="text-xs">BACK</SRHButton></a
	>
	<!-- <a href="/enter-passcode" class="absolute -top-1 right-0"><SRHButton class="text-xs">BACK</SRHButton></a> -->
</div>
<hr class="border border-white my-3" />
<Table class="font-krub">
	<TableHeader>
		<TableRow>
			<TableHead class="text-white">รุ่น</TableHead>
			<TableHead class="text-white">ชื่อเล่น</TableHead>
			<TableHead class="text-white">สาขา</TableHead>
		</TableRow>
	</TableHeader>
	<TableBody>
		{#each data as item}
			<TableRow class="text-white">
				<TableCell>{item.year}</TableCell>
				<TableCell>{item.nickname}</TableCell>
				<TableCell>{item.branch}</TableCell>
			</TableRow>
		{/each}
	</TableBody>
</Table>
