<script>
  import Chip, { Set, Text } from '@smui/chips';

  export let goal = {};
</script>

<div class='goal-container'>
  <div>{goal.name}</div>
  <div class='tag-set'>
    <Set class='tag-set' chips={goal.tags} let:chip nonInteractive>
      <Chip {chip}>
        <Text>{chip}</Text>
      </Chip>
    </Set>
  </div>
</div>

<style>
  .goal-container {
    margin-top: 10px;
    font-family: 'roboto';
    padding: 15px 25px;
    background: lightgray;
    cursor: pointer;
    display: inline-block;
    border-radius: 5px;
    min-width: 25%;
  }
  .goal-container:hover {
    background: orange;
    color: white;
  }

  .tag-set {
    width: fit-content;
    margin: auto;
  }
</style>