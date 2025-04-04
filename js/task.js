document.getElementById("add-task-btn").addEventListener("click", addTask);

function addTask() {
    const input = document.getElementById("task-input");
    const taskText = input.value.trim();
    
    if (taskText === "") return;
    
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
        <span class="task-text">${taskText}</span>
        <div class="task-actions">
            <button class="complete-btn" onclick="toggleComplete(this)">✓</button>
            <button class="delete-btn" onclick="deleteTask(this)">✕</button>
        </div>
    `;
    
    taskList.appendChild(taskItem);
    input.value = "";
}

function toggleComplete(button) {
    const taskItem = button.closest(".task-item");
    taskItem.classList.toggle("completed");
}

function deleteTask(button) {
    const taskItem = button.closest(".task-item");
    taskItem.style.animation = "fadeOut 0.3s ease";
    setTimeout(() => taskItem.remove(), 300);
}