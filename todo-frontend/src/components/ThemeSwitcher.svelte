<script>
  import { onMount } from 'svelte';

  let theme = "light";

  onMount(() => applyTheme());

  function applyTheme() {
    document.documentElement.setAttribute("data-theme", theme);
  }

  function toggleTheme() {
    theme = theme === "light" ? "dark" : "light";
    applyTheme();
  }
</script>

<div class="theme-switcher" on:click={toggleTheme} title="Toggle theme">
  {#if theme === 'light'}
    🌞
  {:else}
    🌙
  {/if}
</div>
