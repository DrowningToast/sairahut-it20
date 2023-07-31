<script lang="ts">
	const hints = [
		{ hint: 'Text', activate: true },
		{ hint: 'Text', activate: true },
		{ hint: 'Text', activate: true },
		{ hint: 'Text', activate: false },
		{ hint: 'Text', activate: false },
		{ hint: 'Text', activate: false },
		{ hint: 'Text', activate: false },
		{ hint: 'Text', activate: false }
	];
</script>

<div class="font-krub text-white drop-shadow-[0px_0px_10px_#FFAEBD]">
	<h1 class="text-2xl font-bold">คำใบ้จากเหล่าภูติ</h1>
	<p class="text-base">คำใบ้พวกนี้ จะนำพาเราไปเจอใครกันนะ</p>
</div>
<div class="flex flex-col gap-y-4 mt-3">
	{#each hints as hint}
		{#if hint.activate}
			<div class="bg-[#F58CB7]/25 rounded-2xl w-full py-2 px-3 shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]">
				<p class="text-base text-white font-krub">{hint.hint}</p>
			</div>
            {:else}
			<div class="bg-[#4E1E31]/50 rounded-2xl w-full py-2 px-3 shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]">
				<p class="text-base text-white font-krub">... (ตรงนี้ยังไม่เปิดคำใบ้)</p>
			</div>
		{/if}
	{/each}
</div>
