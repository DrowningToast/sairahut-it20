<script lang="ts">
	import CalendarTemplate from './../../../lib/components/svelte/CalendarTemplate.svelte';
	import SRHHeading from './../../../lib/components/svelte/SRHHeading.svelte';
</script>

<SRHHeading class="text-center pb-2">ปฏิทินบอกเหตุ</SRHHeading>
<hr class="border border-[#AB9F7E]">
<div class="flex flex-col justify-center gap-y-7 mt-5">    
    <CalendarTemplate day="Mon. - Fri." date="7 August">
        <p>ลงทะเบียนเข้าสู่โลกเวทมนต์​<br>และเล่น Mystic Choice</p>
    </CalendarTemplate>
    
    <!-- <CalendarTemplate day="วันศุกร์" date="11 สิงหาคม">
        <p>สิ้นสุดการลงทะเบียนเข้าสู่โลกเวทมนต์​<br>และเล่น Mystic Choice</p>
    </CalendarTemplate> -->
    
    <CalendarTemplate day="Tue. - Fri." date="8-9 August">
        <p>กิจกรรมถ่ายรูปกับเหล่าภูติเพื่อเเลก Spirit Shard</p>
    </CalendarTemplate>
    
    <!-- <CalendarTemplate day="วันพุธ" date="9 สิงหาคม">
        <p>สิ้นสุดกิจกรรมถ่ายรูปกับเผ่าภูติเพื่อเเลก Spirit Shard</p>
    </CalendarTemplate> -->
    
    <CalendarTemplate day="Thu. - Fri." date="10-11 August">
        <p>กิจกรรมถามคำถามพูดคุยกับเหล่าภูติเพื่อแลก Spirit Shard</p>
    </CalendarTemplate>
    
    <!-- <CalendarTemplate day="วันศุกร์" date="11 สิงหาคม">
        <p>สิ้นสุดกิจกรรมถามคำถามพูดคุยกับเผ่าภูติเพื่อแลก Spirit Shard</p>
    </CalendarTemplate> -->
    
    <CalendarTemplate day="Sat. - Mon." date="12-14 August">
        <p>เตรียมตัวออกเดินทางไปปราบจอมมาร , อำลาครอบครัว</p>
    </CalendarTemplate>
    
    <CalendarTemplate day="Tue. - Fri." date="15-18 August">
        <p>กิจกรรมตามหารหัสลับเพื่อปลดล็อคคำใบ้ของภูติตัวเอง</p>
    </CalendarTemplate>
    
    <!-- <CalendarTemplate day="วันศุกร์" date="18 สิงหาคม">
        <p>สิ้นสุดกิจกรรมตามหารหัสลับเพื่อปลดล็อคคำใบ้ของภูติตัวเอง</p>
    </CalendarTemplate> -->
    
    <CalendarTemplate day="Friday" date="18 August">
        <p>นักเวทย์​ฝึกหัดชวนภูติมาเล่นกิจกรรม itgg</p>
    </CalendarTemplate>
    
    <CalendarTemplate day="Saturday" date="19 August">
        <p>เฉลยภูติของตัวเอง</p>
    </CalendarTemplate>
    
</div>
