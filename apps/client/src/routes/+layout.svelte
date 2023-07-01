<script>
	import "../app.postcss";
  	import CreditFooter from "../components/CreditFooter.svelte";
    import Header from '../components/Header.svelte';
    import './styles.css';
</script>

<div class="w-full min-h-screen flex flex-col">
	<Header>
	</Header>

	<main>
		<slot></slot>
	</main>

	<CreditFooter/>
</div>

