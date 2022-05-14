<script lang="ts">
  import { status } from '@waack-gql/queries/status.ts';
</script>

{$status.status}
{#if $status.status === 'success'}
  <p>
    {$status.data}
  </p>
{/if}

{#if $status.status === 'error'}
  {$status.error.message}
{/if}

<style>
  /* ommitted for brevity */
</style>
