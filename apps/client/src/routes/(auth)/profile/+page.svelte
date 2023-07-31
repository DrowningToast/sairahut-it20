<script lang="ts">
	import SRHButton from './../../../../lib/components/svelte/SRHButton.svelte';
    const data = [
        {title: "ชื่อจริง", value: "Aoi"},
        {title: "นามสกุล", value: "Sora"},
        {title: "ชื่อเล่น", value: "Aoi"},
        {title: "สาขา", value: "AV"},
        {title: "ช่องทางการติดต่อ", value: "ไม่บอกหรอกความลับ"},
    ]
</script>

<h1 class="text-center text-3xl font-krub font-bold text-white drop-shadow-[0px_0px_10px_#FFD130]">บัตรประจำตัว</h1>

<div class="border border-solid border-accent-alt px-4 py-6 rounded-3xl bg-gradient-to-b from-[#f58cb71a] to-[#ffffff05] mx-6 mt-1">
    <div class="flex flex-col gap-y-3 border border-solid border-accent-alt pt-10 pb-24 px-5">
        {#each data as item}
            <div class="flex flex-col gap-y-1">
                <p class="text-sm font-krub font-thin text-white">{item.title}</p>
                <p class="text-sm font-krub font-thin text-white border-[0.5px] border-solid border-accent-alt px-3 py-2 rounded-xl">{item.value}</p>
            </div>
        {/each}
    </div>
</div>
<div class="flex justify-center mt-3">
    <SRHButton class="">EDIT</SRHButton>
</div>


