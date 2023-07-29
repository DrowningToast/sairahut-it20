<script lang="ts">
    export let isActived: boolean;
    export let img_active: string;
    export let img_inactive: string;
    export let text: string;
    export let link: string;
</script>

<div class="flex flex-col justify-center items-center">
    {#if isActived}
        <a href={link}>
            <img src={img_active} alt="">
            <p class="text-center text-white text-[10px] mt-2 font-Pridi font-thin">{text}</p>
        </a>
    {:else}
        <div>
            <img src={img_inactive} alt="">
            <p class="text-center text-white text-[10px] mt-2 opacity-10 font-Pridi font-thin">???????????????</p>
        </div>
    {/if}
</div>
