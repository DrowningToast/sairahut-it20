<script>
	import LoginButton from '$components/svelte/LoginButton.svelte';
</script>

<div class="px-8 md:px-12 py-16 md:py-24 flex flex-col gap-y-4">
	<h1 class="text-3xl md:text-4xl lg:text-6xl font-semibold">ไม่ได้รับอนุญาตในการเข้าถึงเนื้อหา</h1>
	<p class="text-md md:text-xl lg:text-3xl">
		เหมือนว่าจะเกิดความผิดพลาดระหว่างที่โหลดข้อมูล ลองรอสักพักก่อนล็อกอินใหม่
		หากยังไม่สามารถเข้าถึงได้ให้ติดต่อสตาฟของกิจกรรม หรือติดต่อ Facebook และ Instagram IT Sairahut
	</p>
	<span class="text-md md:text-xl lg:text-2xl mt-8 font-semibold">สาเหตุที่เป็นไปได้</span>
	<ul class="list-disc pl-8 md:pl-12">
		<li>ยังไม่ได้ล็อกอินระบบ</li>
		<li>คุณไม่ได้ลงทะเบียนเล่นกิจกรรมตั้งแต่แรก (สำหรับรุ่นพี่)</li>
		<li>ไม่ได้ใช้อีเมลสถาบัน (@kmitl.ac.th) ในการล็อกอิน</li>
		<li>คุณพยายามจะแฮ็กระบบ</li>
		<li>ค่ายเน็ตไม่เป็นใจ</li>
		<li>พลังของจอมมารทำให้ระบบล่ม</li>
		<li>คุณยังเบียวไม่พอที่จะเก็ทมุกของพวกเรา</li>
	</ul>
	<div class="mt-4"><LoginButton /></div>
	<div>
		<a class="text-blue-400 underline underline-offset-4" href="/">กลับไปหน้าแรก</a>
	</div>
</div>
