<script lang="ts">
    export let name: string;
    export let choice: string;
    export let side: string;
</script>

<span class="relative text-white">
    <input type="radio" name={name} id={choice} value={side} class="hidden peer">
    <label for={choice} class="peer-checked:bg-black/20 px-4 p-2 rounded-full py-2 inline">{choice}</label>
    <img src="../vector_thisthat.png" alt="" class="absolute top-0 left-0 w-full h-full hidden peer-checked:block transform scale-x-110 scale-y-150">
</span>
