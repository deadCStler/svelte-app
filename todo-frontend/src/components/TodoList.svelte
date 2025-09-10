<script>
  import { createEventDispatcher } from 'svelte';
  export let todos = [];
  const dispatch = createEventDispatcher();

  function toggle(id) { dispatch('toggle', id); }
  function remove(id) { dispatch('delete', id); }
</script>

<ul class="todo-list">
  {#each todos as todo}
    <li class:done={todo.done}>
      <span on:click={() => toggle(todo.id)}>{todo.text}</span>
      <button on:click={() => remove(todo.id)}>Delete</button>
    </li>
  {/each}
</ul>
