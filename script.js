const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");
const emptyMessage = document.getElementById("empty-message");
const clearCompletedButton =
    document.getElementById("clear-completed");


// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Save tasks
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Display tasks
function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task) => {

        const li = document.createElement("li");

        li.classList.add("task");

        if (task.completed) {
            li.classList.add("completed");
        }


        // Checkbox
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.classList.add("task-checkbox");

        checkbox.checked = task.completed;


        checkbox.addEventListener("change", () => {

            task.completed = checkbox.checked;

            saveTasks();

            renderTasks();

        });


        // Task text
        const span = document.createElement("span");

        span.classList.add("task-text");

        span.textContent = task.text;


        // Delete button
        const deleteButton = document.createElement("button");

        deleteButton.classList.add("delete-btn");

        deleteButton.textContent = "Delete";


        deleteButton.addEventListener("click", () => {

            tasks = tasks.filter(
                (item) => item.id !== task.id
            );

            saveTasks();

            renderTasks();

        });


        li.appendChild(checkbox);

        li.appendChild(span);

        li.appendChild(deleteButton);

        taskList.appendChild(li);

    });


    updateTaskCount();

    updateEmptyMessage();
}


// Add task
function addTask() {

    const text = taskInput.value.trim();


    if (text === "") {

        alert("Please enter a task.");

        return;
    }


    const task = {

        id: Date.now(),

        text: text,

        completed: false

    };


    tasks.push(task);

    saveTasks();

    renderTasks();


    taskInput.value = "";

    taskInput.focus();
}


// Update task count
function updateTaskCount() {

    const remainingTasks =
        tasks.filter(
            (task) => !task.completed
        ).length;


    if (remainingTasks === 1) {

        taskCount.textContent = "1 task remaining";

    } else {

        taskCount.textContent =
            `${remainingTasks} tasks remaining`;

    }
}


// Empty message
function updateEmptyMessage() {

    if (tasks.length === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";

    }
}


// Clear completed tasks
clearCompletedButton.addEventListener(
    "click",
    () => {

        tasks = tasks.filter(
            (task) => !task.completed
        );

        saveTasks();

        renderTasks();

    }
);


// Add button
addButton.addEventListener(
    "click",
    addTask
);


// Enter key
taskInput.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {

            addTask();

        }

    }
);


// Initial display
renderTasks();
