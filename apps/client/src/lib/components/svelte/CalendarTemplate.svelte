<script lang="ts">
    export let day: string;
    export let date: string;
</script>

<div class="grid grid-cols-calendar border border-[#AB9F7E] rounded-xl font-krub text-center text-white ">
    <div class="py-2 px-3 border-r border-[#AB9F7E] m-0">
        <div class="flex flex-col justify-center items-center h-full">
            <p>{day}</p>
            <p>{date}</p>
        </div>
    </div>
    <div class="py-2 px-3">
        <div class="text-sm flex flex-col justify-center items-center h-full">
            <slot />
        </div>
    </div>
</div>
