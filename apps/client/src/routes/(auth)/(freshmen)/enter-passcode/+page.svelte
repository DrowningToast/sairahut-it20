<script lang="ts">
	import SRHButton from './../../../../lib/components/svelte/SRHButton.svelte';

</script>

<div class="flex flex-col items-center">
    <h1 class="font-Pridi text-4xl font-thin text-white text-center">ใส่รหัสลับ</h1>
    <input type="text" class="w-11/12 border-b bg-transparent outline-none text-center text-5xl mt-6 font-Pridi font-thin text-[#A8A29E]">
    <p class="text-center font-Pridi text-sm whitespace-pre mt-16 text-white font-thin">เมื่อรหัสถูกใช้แล้วจะไม่สามารถใช้รหัสเดิมได้
คำอธิบายการเล่น
Lorem ipsum dolor sit amet.</p>
    <a href="/give-passcode-history" class="text-accent text-xs font-Pridi font-extralight decoration-solid bg-[#29436c2b] px-3 py-2 border-2 border-[#462F47] rounded-md mt-5">ดูประวัติการกรอกรหัส</a>
    <SRHButton class="mt-32">SUBMIT</SRHButton>
    <img src="./konnok-footer.png" alt="" class=" mt-10" />
</div>
