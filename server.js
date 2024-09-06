const express = require("express");
const app = express();

app.use(express.json());

let tasks = [
    { id: 1, task: "learn react" },
    { id: 2, task: "learn express" },
    { id: 3, task: "learn mongoDB" }
];

// GET tasks
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// POST new task
app.post("/tasks", (req, res) => {
    const id = req.body.id;
    const task = req.body.task;
    const newTask = { id, task };
    tasks.push(newTask);
    res.status(200).json(newTask);  // Return only the new task
});

// PUT (update task)
app.put("/tasks/:id", (req, res) => {
    const taskId = Number(req.params.id); // Convert taskId to a number
    const updateTask = req.body.task;
    const findTask = tasks.findIndex(t => t.id === taskId); // Use strict equality

    if (findTask !== -1) {
        tasks[findTask] = { id: taskId, task: updateTask }; // Ensure the id is a number
        res.status(202).json(tasks[findTask]); // Return updated task
    } else {
        res.status(404).json({ error: "task not found" });
    }
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {
    const taskId = Number(req.params.id); // Convert taskId to a number
    tasks = tasks.filter(task => task.id !== taskId); // Use strict comparison
    res.json({ message: "Task deleted" });
});

app.use(express.static("public"));

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
