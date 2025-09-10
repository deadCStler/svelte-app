const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let todos = [
  { id: 1, text: "Learn OpenTelemetry", done: false },
  { id: 2, text: "Instrument Svelte app", done: false },
];

app.get("/healthcheck", (req, res) => res.send("OK"));
app.get("/todos", (req, res) => res.json(todos));
app.post("/todos", (req, res) => {
  const newTodo = { id: Date.now(), text: req.body.text, done: false };
  todos.push(newTodo);
  res.json(newTodo);
});
app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.done = !todo.done;
    res.json(todo);
  } else res.status(404).json({ error: "Todo not found" });
});
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter((t) => t.id !== id);
  res.json({ success: true });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
