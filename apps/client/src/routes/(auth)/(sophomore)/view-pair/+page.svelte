<script lang="ts">
	import SRHButton from './../../../../lib/components/svelte/SRHButton.svelte';
	import SRHHeading from './../../../../lib/components/svelte/SRHHeading.svelte';
    import { FacebookIcon, InstagramIcon } from 'lucide-svelte';
    // your script goes here
    const data = [
        {
            'name': 'ภูวิศ นุ่นปาน',
            'nickname': 'อาร์ม',
            'branch': 'IT',
            'contact' : {'IG' : 'https://www.instagram.com/armaarmayoii_/', 'FB': 'https://www.facebook.com/aaapwn/'}
        },
        {
            'name': 'กิตติพัฒน์ เอี่ยมลือนาม',
            'nickname': 'สไป๊',
            'branch': 'IT',
            'contact' : {'IG' : 'https://www.instagram.com/sodamnhot_spicier_superburgest/'}
        }
    ]
    
</script>

<SRHHeading class="text-center">บัตรประจำตัว</SRHHeading>
<hr class="border border-white my-3">
{#each data as d}
    <div class="border border-[#AB9F7E] rounded-2xl text-white font-krub flex flex-col gap-y-2 text-lg px-5 py-6 mt-5">
        <p>ชื่อ-นามสกุล : {d.name}</p>
        <p>ชื่อเล่น : {d.nickname}</p>
        <p>สาขา : {d.branch}</p>
        <div class="flex flex-row gap-2">
            ช่องทางการติดต่อ : 
                {#if d.contact.IG}
                    <a href={d.contact.IG} target="_blank" rel="noreferrer">
                        <InstagramIcon />
                    </a>
                {/if}
                {#if d.contact.FB}
                    <a href={d.contact.FB} target="_blank" rel="noreferrer">
                        <FacebookIcon />
                    </a>
                {/if}
        </div>
    </div>
{/each}
<div class="flex w-full justify-center items-center mt-5">
    <a href="/home">
        <SRHButton class="px-16">EXIT</SRHButton>
    </a>
</div>

