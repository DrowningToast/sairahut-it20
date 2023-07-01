<script lang="ts">
  import { page } from "$app/stores";
  import Button from "$components/ui/button/Button.svelte";
  import { trpc } from "$lib/trpc/client";

  let greeting = "press the button to load data";
  let loading = false;

  const loadData = async () => {
    loading = true;
    greeting = await trpc($page).greeting.query();
    console.log(greeting);
    loading = false;
  };
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>hello world</section>

<Button aria-busy={loading} on:click={loadData}>tRPC call test</Button>
<p>{greeting}</p>
