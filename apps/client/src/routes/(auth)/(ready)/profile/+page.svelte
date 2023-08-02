<script lang="ts">
	import { page } from '$app/stores';
	import SrhButton from '$components/svelte/SRHButton.svelte';
	import { validate_each_argument } from 'svelte/internal';
	import type { PageServerData } from './$types';

	const user = $page.data as PageServerData;

	const data = [
		{ title: 'ชื่อจริง', value: user.first_name ?? user.fullname?.split(' ')[0] },
		{ title: 'นามสกุล', value: user.last_name ?? user.fullname?.split(' ')[1] },
		{ title: 'ชื่อเล่น', value: user.nickname },
		{ title: 'สาขา', value: user.branch }
	];

	const facebook = { title: 'Facebook Profile', value: user.facebook_link ?? '-' };
	const instagram = { title: 'Instagram Profile', value: user.instagram_link ?? '-' };
</script>

<h1 class="text-center text-3xl font-krub font-bold text-white drop-shadow-[0px_0px_10px_#FFD130]">
	บัตรประจำตัว
</h1>

<div
	class="border border-solid border-accent-alt px-4 py-6 rounded-3xl bg-gradient-to-b from-[#f58cb71a] to-[#ffffff05] mx-6 mt-1"
>
	<div class="flex flex-col gap-y-3 border border-solid border-accent-alt pt-10 pb-24 px-5">
		{#each data as item}
			<div class="flex flex-col gap-y-1">
				<p class="text-sm font-krub font-thin text-white">{item.title}</p>
				<p
					class="text-sm font-krub font-thin text-white border-[0.5px] border-solid border-accent-alt px-3 py-2 rounded-xl"
				>
					{item.value}
				</p>
			</div>
		{/each}
		{#if facebook}
			<div class="flex flex-col gap-y-1">
				<p class="text-sm font-krub font-thin text-white">{facebook.title}</p>
				<a
					target="_blank"
					href={facebook.value}
					class="underline text-sm font-krub font-thin text-white border-[0.5px] border-solid border-accent-alt px-3 py-2 rounded-xl"
				>
					Link
				</a>
			</div>
		{/if}
		{#if instagram}
			<div class="flex flex-col gap-y-1">
				<p class="text-sm font-krub font-thin text-white">{instagram.title}</p>
				<a
					href={instagram.value}
					class="underline text-sm font-krub font-thin text-white border-[0.5px] border-solid border-accent-alt px-3 py-2 rounded-xl"
				>
					Link
				</a>
			</div>
		{/if}
	</div>
</div>
<!-- <div class="flex justify-center mt-3">
	<SrhButton class="">EDIT</SrhButton>
</div> -->
