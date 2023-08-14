<script>
	import { secretMode } from '$lib/store/secret';
	import { userType } from '$lib/store/userType';
	import { Calendar, Home } from 'lucide-svelte';
</script>

<header
	class={`${
		$secretMode ? 'bg-red-800' : $userType === 'FRESH' ? 'bg-primary-alt' : 'bg-primary'
	}  text-white p-3 text-base flex justify-between drop-shadow-[0_0px_7.5px_rgba(0,0,0,0.7)] sticky top-0 z-10`}
>
	<a href="/" class="font-krub font-bold">ITSAIRAHUT</a>
	<div class="flex gap-x-4">
		<a href="/calendar"><Calendar /></a>
		<a href="/home" class="text-xs font-thin"><Home /></a>
	</div>
</header>
