<script>
	import { Button } from '@smui/button';

  let goal = '';
  let status = null;
</script>

<div>
  {#if status !== 'todo'}
    <Button>Back</Button>
  {/if}

  <span>
    {$goal}
  </span>

  {#if status !== 'done'}
    <Button on:click={() => {  }}>Back</Button>
  {/if}
</div>
