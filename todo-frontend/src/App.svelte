<script>
  import './styles/variables.css';
  import './styles/layout.css';
  import './styles/input.css';
  import './styles/todos.css';
  import './styles/theme-switcher.css';

  import Header from './components/Header.svelte';
  import TodoInput from './components/TodoInput.svelte';
  import TodoList from './components/TodoList.svelte';

  let todos = [];

  async function loadTodos() {
    const res = await fetch("http://localhost:3001/todos");
    todos = await res.json();
  }

  async function addTodo(text) {
    if (!text.trim()) return;
    const res = await fetch("http://localhost:3001/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });
    const todo = await res.json();
    todos = [...todos, todo];
  }

  async function toggleTodo(id) {
    const res = await fetch(`http://localhost:3001/todos/${id}`, { method: "PUT" });
    const updated = await res.json();
    todos = todos.map(t => t.id === updated.id ? updated : t);
  }

  async function deleteTodo(id) {
    await fetch(`http://localhost:3001/todos/${id}`, { method: "DELETE" });
    todos = todos.filter(t => t.id !== id);
  }

  loadTodos();
</script>

<svelte:head>
  <title>Svelte Todo App</title>
</svelte:head>

<main>
  <Header />
  <TodoInput on:add={e => addTodo(e.detail)} />
  <TodoList {todos} on:toggle={e => toggleTodo(e.detail)} on:delete={e => deleteTodo(e.detail)} />
</main>

