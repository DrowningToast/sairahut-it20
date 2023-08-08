<script lang="ts">
	import { page } from '$app/stores';

	const params = $page.url.searchParams;
	const error = params.get('error');
</script>

<div class="px-8 py-12 flex flex-col gap-y-4">
	<h1 class="text-5xl font-bold">Fatal Error</h1>
	<p class="text-lg font-Pridi text-gray-600">
		คุณไม่ควรจะได้เห็นหน้านี้ หากคุณได้เห็นหน้านี้แปลว่าได้เกิดอะไรผิดพลาดขึ้น กรุณาติดต่อทีมงาน
	</p>
	<p class="text-sm text-red-500">Error code : {error}</p>
</div>
