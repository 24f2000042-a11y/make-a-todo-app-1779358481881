document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from localStorage if available
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.forEach(taskText => {
            addTaskToDOM(taskText);
        });
    };

    // Save tasks to localStorage
    const saveTasks = () => {
        const tasks = [];
        taskList.querySelectorAll('li span').forEach(span => {
            tasks.push(span.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Add task to the DOM
    const addTaskToDOM = (taskText) => {
        const li = document.createElement('li');

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        li.appendChild(taskSpan);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => {
            taskList.removeChild(li);
            saveTasks();
        };
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    };

    // Event listener for adding tasks
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTaskToDOM(taskText);
            taskInput.value = '';
            saveTasks();
        }
    });

    // Allow adding task by pressing Enter
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTaskBtn.click();
        }
    });

    // Initial load of tasks
    loadTasks();
});
