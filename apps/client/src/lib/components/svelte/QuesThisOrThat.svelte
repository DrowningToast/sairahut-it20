<script>
// @ts-nocheck

    /**
	 * @type {any}
	 */
     export let left;
    /**
	 * @type {any}
	 */
     export let right;
     /**
	 * @type {any}
	 */
      export let name;

      let selected = null
      const onSelect = (/** @type {any} */ select) => {
        selected = select
      }
</script>

<div class="flex justify-between w-full font-noto">
    <div class="relative">
        <input type="radio" name="{name}" id="{left}" class="hidden peer" required value="Left" on:change={(e) => onSelect(e.target.value)}> 
        <label for="{left}" class="peer-checked:bg-black/20 p-2 rounded-full px-5 py-2" >{left}</label>
        <img src="../vector_thisthat.png" alt="" class="absolute -top-3 -left-3 -right-3 -bottom-3 hidden peer-checked:block">
    </div>
    <div class="relative">
        <input type="radio" name="{name}" id="{right}" class="hidden peer" required value="Right" on:change={(e) => onSelect(e.target.value)}> 
        <label for="{right}" class="peer-checked:bg-black/20 p-2 rounded-full px-5 py-2" >{right}</label>
        <img src="../vector_thisthat.png" alt="" class="absolute -top-5 -left-5 -right-5 -bottom-5 hidden peer-checked:block">
    </div>
</div> 
