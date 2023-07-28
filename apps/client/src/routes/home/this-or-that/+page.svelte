<script>
	import QuesThisOrThat from './../../../lib/components/svelte/QuesThisOrThat.svelte';

</script>

<div class=" drop-shadow-[0px_0px_7.5px_#FFAEBD] leading-10 text-white font-krub">
    <h1 class="text-5xl font-bold">This or That</h1>
    <p>อันนี้ หรือ อันนี้ดี</p>
</div>
<div class="text-white">
    <p class="font-bold font-krub">อะไรคือ This or That</p>
    <p class=" font-Pridi font-thin text-sm">ผู้เล่นกิจกรรมสายรหัสทุกคนจะต้องทำการกรอกความชอบ
        ของตนเองเพื่อใช้สำหรับ algorithm ของการจับคู่ พี่และน้อง</p>
</div>
<div class="flex flex-col text-white relative gap-y-10 mt-10">
    <QuesThisOrThat left={"ต่างจังหวัด"} right={"กรุงเทพ & ปริมณฑล"} name={"1"}/>
    <QuesThisOrThat left={"เล่นเกม"} right={"อ่านหนังสือ"} name={"2"}/>
    <QuesThisOrThat left={"เอเชีย"} right={"ตะวันตก"} name={"3"}/>
    <QuesThisOrThat left={"หนัง"} right={"ซีรีย์"} name={"4"}/>
    <QuesThisOrThat left={"กีฬา"} right={"บอร์ดเกม"} name={"5"}/>
    <QuesThisOrThat left={"ชาบู"} right={"หมูกระทะ"} name={"6"}/>
    <QuesThisOrThat left={"สายเรียน"} right={"สายกิจกรรม"} name={"7"}/>
    <QuesThisOrThat left={"งานกลุ่ม"} right={"งานเดี่ยว"} name={"8"}/>
    <QuesThisOrThat left={"เฟสบุ๊ค"} right={"ไอจี"} name={"9"}/>
    <QuesThisOrThat left={"กลางวัน"} right={"กลางคืน"} name={"10"}/>
    <QuesThisOrThat left={"ไปเที่ยว"} right={"อยู่บ้าน"} name={"11"}/>
</div>
