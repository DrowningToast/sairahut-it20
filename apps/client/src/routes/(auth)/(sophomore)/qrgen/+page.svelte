<script lang="ts">
	import { RotateCcw } from "lucide-svelte";

    let qrPath:string = "../mock_qr.png";
    const initQr = () => {
        // initqrcode
    }
</script>

<div class="relative">
    <div class=" drop-shadow-[0px_0px_7.5px_#FFAEBD] text-white font-krub mt-3">
        <h1 class="text-2xl font-bold leading-3">QR คิวใจ</h1>
        <p class=" font-thin leading-6 mt-4">สำหรับคุณพรี่ ๆ เอาไปให้น้องสแกน</p>
    </div>
    <div class="flex flex-col justify-center items-center w-full mt-16 gap-y-10">
        <img src={qrPath} alt="" class="w-4/5">
        <p class="text-accent font-Pridi font-thin">แสดง QR code ให้เหล่านักเวทย์แสกน</p>
        <button class="drop-shadow-[0px_0px_10px_#FFD130] mt-5" on:click={initQr}>
            <RotateCcw size={36} color="white" strokeWidth={1.5} />
        </button>
    </div>
</div>
