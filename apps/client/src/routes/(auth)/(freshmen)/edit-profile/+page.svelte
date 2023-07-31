<script lang="ts">
    import SRHButton from './../../../../lib/components/svelte/SRHButton.svelte';
</script>

<h1 class="text-3xl font-krub font-bold text-white drop-shadow-[0px_0px_10px_#FFD130]">บัตรประจำตัว</h1>
<div class="text-white font-krub font-thin mt-6 flex flex-col gap-y-4">
    <div>
        <p class="text-sm">ชื่อจริง</p>
        <input type="text" class=" bg-[#F58CB7]/25 rounded-2xl w-full outline-none mt-2 py-2 px-3 shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]">
    </div>
    <div>
        <p class="text-sm">นามสกุล</p>
        <input type="text" class=" bg-[#F58CB7]/25 rounded-2xl w-full outline-none mt-2 py-2 px-3 shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]">
    </div>
    <div>
        <p class="text-sm">สาขา</p>
        <input type="text" class=" bg-[#F58CB7]/25 rounded-2xl w-full outline-none mt-2 py-2 px-3 shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]">
    </div>
</div>
<div class="flex flex-col items-center mt-8">
    <div class="text-center text-xs text-accent w-3/4 font-thin font-Pridi">
        <p>คำอธิบาย</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquam neque et augue varius, at volutpat ex venenatis. Donec maximus tincidunt</p>
    </div>
    <SRHButton class="mt-48">SAVE</SRHButton>
</div>
