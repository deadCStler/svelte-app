<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  let text = "";

  function add() {
    if (!text.trim()) return;
    dispatch('add', text);
    text = "";
  }
</script>

<div class="input-container">
  <input type="text" placeholder="Add a new task..." bind:value={text} on:keydown={(e) => e.key === 'Enter' && add()} />
  <button on:click={add}>Add</button>
</div>
