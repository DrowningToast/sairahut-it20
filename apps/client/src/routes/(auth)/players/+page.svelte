<script lang="ts">
	import { page } from '$app/stores';
	import Dropdown from '$components/svelte/Dropdown.svelte';
	import SrhButton from '$components/svelte/SRHButton.svelte';
	import Input from '$components/ui/input/Input.svelte';
	import Label from '$components/ui/label/Label.svelte';
	import RadioGroup from '$components/ui/radio-group/RadioGroup.svelte';
	import RadioGroupItem from '$components/ui/radio-group/RadioGroupItem.svelte';
	import Separator from '$components/ui/separator/Separator.svelte';
	import Skeleton from '$components/ui/skeleton/Skeleton.svelte';
	import {
		Table,
		TableHead,
		TableRow,
		TableCell,
		TableBody,
		TableHeader
	} from '$components/ui/table';
	import { trpc } from '$lib/trpc';
	import { determineYear, shuffle } from '$lib/utils';
	import { createQuery } from '@tanstack/svelte-query';
	import { FacebookIcon, InstagramIcon, Shuffle } from 'lucide-svelte';
	import { z } from 'zod';
	import type { PageData } from './$types';

	const PAGINATION_SIZE = 600;
	let queryBy: 'STUDENT_ID' | 'FIRSTNAME' | 'NICKNAME';
	let queryTarget: 'FRESH' | 'SOP';
	let targetPointTitle: 'Spirit Shards' | 'Points' | 'Humanity' = 'Points';

	$: bindedQueryBy = 'NICKNAME' as typeof queryBy;
	$: queryBy = 'NICKNAME';
	$: bindedQueryString = '' as string | undefined;
	$: queryString = '' as string | undefined;
	$: queryTarget = 'SOP' as typeof queryTarget;
	let filterByFaction: undefined | string;
	$: filterByFaction = undefined;

	$: {
		switch (queryTarget) {
			case 'FRESH':
				targetPointTitle = 'Spirit Shards';
				break;
			case 'SOP':
				targetPointTitle = 'Humanity';
				break;
			default:
				break;
		}
	}

	const handleSearch = () => () => {
		queryBy = bindedQueryBy;
		queryString = bindedQueryString;
		queryTarget = queryTarget;
		$searchQuery.refetch();
	};

	// avoid using this directly, and use searchQuery instead, it caches
	const search = async () => {
		let data: any[] = [];

		const [a, b] = await Promise.all([
			// fetch fresh
			new Promise<void>(async (resolve, reject) => {
				if (queryTarget === 'FRESH') {
					const res = await trpc.freshmens.getAllFreshmens.query({
						first: 0,
						last: PAGINATION_SIZE,
						queryBy,
						q: queryString
					});

					data = [...data, ...res.data];
				}
				resolve();
			}),
			// fetch sop
			new Promise<void>(async (resolve, reject) => {
				if (queryTarget === 'SOP') {
					const res = await trpc.sophomores.getAllSophomores.query({
						first: 0,
						last: PAGINATION_SIZE,
						queryBy,
						q: queryString,
						faction: filterByFaction
					});

					data = [...data, ...res.data];
				}
				resolve();
			})
		]);

		if (queryTarget === 'FRESH') {
			data.sort((a, b) => a.user.balance - b.user.balance).reverse();
		} else {
			data = shuffle(data);
		}

		return data;
	};

	$: searchQuery = createQuery({
		queryKey: ['fetch-user-list', queryBy, queryTarget, filterByFaction],
		queryFn: search,
		staleTime: Infinity,
		cacheTime: 60 * 60 * 2 * 1000,
		refetchOnMount: false,
		refetchOnReconnect: true,
		refetchOnWindowFocus: false
	});

	$: {
		if (queryString === '') {
			queryString = undefined;
		}
	}

	const data = $page.data as PageData;
</script>

<div class="font-krub text-white drop-shadow-[0px_0px_10px_#FFAEBD] flex gap-y-2 flex-col">
	<h1 class="text-2xl font-bold">บัญชีลึกลับ</h1>
	<p class="text-base">บัญชีรวบรวมรายชื่อจอมเวทย์ฝึกหัดทุกท่านและของเหล่าภูตมากมาย</p>
</div>

<RadioGroup class="flex gap-x-2 ml-auto mt-8 text-accent" bind:value={queryTarget}>
	<div class="flex items-center space-x-2">
		<RadioGroupItem value="SOP" id="SOP" />
		<Label for="SOP">เหล่าภูต</Label>
	</div>
	<div class="flex items-center space-x-2">
		<RadioGroupItem value="FRESH" id="FRESH" />
		<Label for="FRESH">เหล่าจอมเวทย์</Label>
	</div>
</RadioGroup>

<RadioGroup class="flex gap-x-2 ml-auto text-accent mt-2" bind:value={bindedQueryBy}>
	<div class="flex items-center space-x-2">
		<RadioGroupItem value="NICKNAME" id="NICKNAME" />
		<Label for="NICKNAME">ชื่อเล่น</Label>
	</div>
	<div class="flex items-center space-x-2">
		<RadioGroupItem value="FIRSTNAME" id="FIRSTNAME" />
		<Label for="FIRSTNAME">ชื่อจริง</Label>
	</div>
	<div class=" flex items-center space-x-2">
		<RadioGroupItem class="fill-yellow-500" value="STUDENT_ID" id="STUDENT_ID" />
		<Label for="STUDENT_ID">รหัสนักศึกษา</Label>
	</div>
</RadioGroup>

<div class="mt-2">
	{#if data.factions && queryTarget === 'SOP'}
		<p class=" text-right text-sm text-accent font-semibold">เลือกเผ่า</p>
		<Dropdown
			class="text-white mt-1 outline-2 outline-white bg-neutral-900/25"
			bind:value={filterByFaction}
		>
			{#each data.factions as faction}
				<option class="text-white" value={faction.handler}>{faction.name}</option>
			{/each}
		</Dropdown>
	{/if}
</div>

<div class="grid grid-cols-12 gap-x-2 mt-2">
	<Input
		placeholder="ค้นหา"
		class="col-span-8 text-white bg-blue-400/25"
		bind:value={bindedQueryString}
	/>
	<SrhButton
		isLoading={$searchQuery.isLoading}
		on:click={handleSearch()}
		class="col-span-4 bg-neutral-900 text-accent p-0 text-center">ค้นหา</SrhButton
	>
</div>
<Separator class="mt-5 mb-1" />

<Table>
	{#if $searchQuery.data?.length === 0 && !$searchQuery.isLoading}
		<div class="text-center text-white text-xl w-full grid place-items-center">
			<p>ดูเหมือนว่าบัญชีของข้าจะไม่เจออะไรเลย...</p>
		</div>
	{:else}
		<TableHeader>
			<TableRow class="gap-x-6">
				<TableHead>รุ่น</TableHead>
				<TableHead>ชื่อเล่น</TableHead>
				<TableHead>ชื่อจริง</TableHead>
				<TableHead>{queryTarget === 'SOP' ? 'ภูต' : targetPointTitle}</TableHead>
				<TableHead>Contact</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody class="text-white text-sm">
			{#if $searchQuery.data && !$searchQuery.isLoading}
				{#each $searchQuery.data as d}
					<TableRow class="gap-x-1 h-6">
						<TableCell>{determineYear(d.student_id)}</TableCell>
						<TableCell>{d.nickname}</TableCell>
						<TableCell>
							{d.fullname?.split(' ')[0] ?? `${d.first_name}`}</TableCell
						>
						<TableCell>{queryTarget === 'SOP' ? d.user.faction.name : d.user.balance}</TableCell>
						<TableCell class="flex flex-row gap-1">
							{#if z.string().url().safeParse(d.facebook_link).success}
								<a href={d.facebook_link} target="_blank" rel="noreferrer">
									<FacebookIcon />
								</a>
							{/if}
							{#if z.string().url().safeParse(d.instagram_link).success}
								<a href={d.instagram_link} target="_blank" rel="noreferrer">
									<InstagramIcon />
								</a>
							{/if}
						</TableCell>
					</TableRow>
				{/each}
			{:else if $searchQuery.isLoading}
				{#each new Array(10).fill(null) as _}
					<TableRow class="gap-x-2 h-6">
						<TableCell>
							<Skeleton class="h-6" />
						</TableCell>
						<TableCell>
							<Skeleton class="h-6" />
						</TableCell>
						<TableCell>
							<Skeleton class="h-6" />
						</TableCell>
						<TableCell>
							<Skeleton class="h-6" />
						</TableCell>
						<TableCell>
							<Skeleton class="h-6" />
						</TableCell>
					</TableRow>
				{/each}
			{/if}
		</TableBody>
	{/if}
</Table>

<div class="mt-8 py-4 flex justify-center gap-x-4" />
