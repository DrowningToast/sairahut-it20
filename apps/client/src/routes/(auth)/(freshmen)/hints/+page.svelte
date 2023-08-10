<script lang="ts">
	const hints = [
		'text', 'text', 'text'
	];
</script>
<div class="mb-36">
	<div class="font-krub text-white drop-shadow-[0px_0px_10px_#FFAEBD]">
		<h1 class="text-2xl font-bold">คำใบ้จากเหล่าภูต</h1>
		<p class="text-base">คำใบ้พวกนี้ จะนำพาเราไปเจอใครกันนะ</p>
	</div>
	<p class="text-white font-krub text-6xl font-bold text-center my-8 drop-shadow-[0px_0px_13px_#FFAEBD]">{hints.length}/10</p>
	<div class="flex flex-col gap-y-4 mt-3">
		{#each hints as hint}
				<div
					class="bg-[#F58CB7]/25 rounded-2xl w-full py-2 px-3 shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]"
				>
					<p class="text-base text-white font-krub">{hint}</p>
				</div>
	
		{/each}
	</div>
</div>
<div class="text-yellow-100 text-center px-20 font-Pridi text-xs font-thin">
	<p>คำอธิบาย</p>
	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio explicabo blanditiis animi placeat natus exercitationem iusto debitis, eligendi quo ea, dicta aspernatur commodi nisi consequuntur fugit dolorum praesentium. Facilis, deserunt.</p>
	<p class="text-yellow-200 mt-10">อ่านคำใบ้แล้วตามหาภูติตัวเอง</p>
</div>
