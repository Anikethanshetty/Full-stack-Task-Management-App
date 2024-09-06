// app.js

document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');

    // Fetch and display tasks
    axios.get('/tasks')
        .then(response => {
            const tasks = response.data;
            tasks.forEach(task => addTaskToDOM(task));
        })
        .catch(error => {
            console.error('Error fetching tasks:', error);
        });

    // Add task
  // Add task
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const taskTitle = document.getElementById('task-title').value;

    if (taskTitle.trim()) {
        const task = { id: Date.now(), task: taskTitle };

        // Send POST request to add the task
        axios.post('/tasks', task)
            .then(response => {
                const newTask = response.data; // Now only the newly added task
                addTaskToDOM(newTask);
                taskForm.reset();
            })
            .catch(error => {
                console.error('Error adding task:', error);
            });
    }
});


    // Add task to the DOM
    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);
        li.innerHTML = `
            ${task.task}
            <button class="delete">Delete</button>
        `;

        // Delete task
        li.querySelector('.delete').addEventListener('click', () => {
            const taskId = task.id;

            // Send DELETE request to delete the task
            axios.delete(`/tasks/${taskId}`)
                .then(() => {
                    li.remove();
                })
                .catch(error => {
                    console.error('Error deleting task:', error);
                });
        });

        taskList.appendChild(li);
    }
});
