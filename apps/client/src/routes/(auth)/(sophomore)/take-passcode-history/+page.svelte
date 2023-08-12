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

    const data = [
        {
            year: '20',
            nickname: 'อาร์ม',
            barnch: 'IT',
        },
        {
            year: '20',
            nickname: 'สไป๊',
            barnch: 'IT',
        }
    ]
</script>


<div class="relative">
    <div class="white-title">
        <h1 class="font-bold text-2xl">ประวัติการให้รหัส</h1>
        <p class="mt-2">รวมประวัติการให้รหัสลับล่าสุดของท่าน</p>
    </div>
    <a href="/enter-passcode" class="absolute -top-1 right-0"><SRHButton class="text-xs">BACK</SRHButton></a>
    <!-- <a href="/enter-passcode" class="absolute -top-1 right-0"><SRHButton class="text-xs">BACK</SRHButton></a> -->
</div>
<hr class="border border-white my-3">
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
                <TableCell>{item.barnch}</TableCell>
            </TableRow>
        {/each}
    </TableBody>
</Table>

