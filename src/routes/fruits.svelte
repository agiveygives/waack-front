<script lang="ts">
  import { fruits } from '../graphql/queries/fruits.ts';
</script>

{$fruits.status}
{#if $fruits.status === 'success'}
  {#each $fruits.data as fruit}
   <p>
     {fruit.scientific_name} | {fruit.tree_name} | {fruit.fruit_name}
   </p>
  {/each}
{/if}
{$fruits.error}

<main>
  <h1>Welcome to SvelteKit</h1>
  <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
</main>

<style>
  /* ommitted for brevity */
</style>
