
// Get saved tasks from local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Add a new task
function addTask() {

    const input = document.getElementById("taskInput");

    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const task = {
        text: taskText,
        completed: false
    };

    tasks.push(task);

    saveTasks();

    input.value = "";

    displayTasks();
}


// Display all tasks
function displayTasks() {

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        const span = document.createElement("span");

        span.textContent = task.text;


        // Complete button
        const completeButton = document.createElement("button");

        completeButton.textContent = task.completed
            ? "Undo"
            : "Complete";

        completeButton.className = "complete-btn";

        completeButton.onclick = function () {
            toggleTask(index);
        };


        // Delete button
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.className = "delete-btn";

        deleteButton.onclick = function () {
            deleteTask(index);
        };


        li.appendChild(span);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);

        taskList.appendChild(li);

    });

    updateCounter();
}


// Mark task as complete / incomplete
function toggleTask(index) {

    tasks[index].completed = !tasks[index].completed;

    saveTasks();

    displayTasks();
}


// Delete task
function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();

    displayTasks();
}


// Save tasks in browser
function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}


// Update task counter
function updateCounter() {

    const remainingTasks = tasks.filter(
        task => !task.completed
    ).length;

    const counter = document.getElementById("taskCounter");

    counter.textContent =
        remainingTasks + 
        (remainingTasks === 1
            ? " task remaining"
            : " tasks remaining");
}


// Show saved tasks when page loads
displayTasks();