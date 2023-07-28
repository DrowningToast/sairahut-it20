<script>
	import LogoutButton from '$components/svelte/LogoutButton.svelte';
</script>

<div class="bg-gradient-to-b from-primary to-black min-h-screen py-5">
	<div class=" relative">
		<p class="absolute right-0">Sprit Shards: 999</p>
	</div>
	<div class="grid grid-cols-2 grid-rows-2">
		<img src="./qrCode.png" alt="">
	</div>
	<LogoutButton />
</div>

