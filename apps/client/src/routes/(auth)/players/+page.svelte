<script lang="ts">
	import { Table, TableHead, TableRow, TableCell, TableBody, TableHeader } from '$components/ui/table';
	import { trpc } from '$lib/trpc';
	import type { SophomoreDetails } from 'database';
	import { onMount } from 'svelte';

	let data: any;

	onMount(async () => {
		data = await trpc.sophomores.getAllSophomores.query({
			first: 0,
			last: 9,
			queryBy: 'STUDENT_ID',
			q: '65070171'
		});
		console.log(data)
	});
</script>

<div class="font-krub text-white drop-shadow-[0px_0px_10px_#FFAEBD]">
	<h1 class="text-2xl font-bold">บัญชีจอมเวทย์</h1>
	<p class="text-base">รายชื่อจอมเวทย์ฝึกหัดทุกท่าน</p>
</div>
<hr class="border-1 my-5">

<Table>
	<TableHeader>
		<TableRow>
			<TableHead>รหัสนักศึกษา</TableHead>
			<TableHead>ชื่อ-นามสกุล</TableHead>
			<TableHead>ชื่อเล่น</TableHead>
			<TableHead>สาขา</TableHead>
		</TableRow>
	</TableHeader>
	<TableBody>
		{#if data}
			{#each data.data as d}
				<TableRow>
					<TableCell>{d.student_id}</TableCell>
					<TableCell>{d.fullname}</TableCell>
					<TableCell>{d.nickname}</TableCell>
					<TableCell>{d.branch}</TableCell>
				</TableRow>
			{/each}
		{/if}
	</TableBody>
</Table>
