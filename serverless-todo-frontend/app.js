const API_URL = CONFIG.API_URL;
let nextKey = null;

// Render tasks in the list
function renderTasks(tasks) {
  const taskList = document.getElementById("taskList");
  if (!taskList) return;

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.onchange = async () => {
      li.className = checkbox.checked ? "completed" : "";
      await fetch(`${API_URL}/${task.taskId}?createdAt=${encodeURIComponent(task.createdAt)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: task.title,
          description: task.description,
          completed: checkbox.checked
        })
      });
    };

    const span = document.createElement("span");
    span.textContent = ` ${task.title} - ${task.description} `;

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.onclick = async () => {
      try {
        await fetch(
          `${API_URL}/${task.taskId}?createdAt=${encodeURIComponent(task.createdAt)}`,
          { method: "DELETE" }
        );

        li.remove();
      } catch (err) {
        console.error("Error deleting task:", err);
      }
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}

// Load tasks with pagination
async function loadTasks() {

  const url = nextKey
    ? `${API_URL}?lastKey=${encodeURIComponent(JSON.stringify(nextKey))}`
    : API_URL;

  try {

    const res = await fetch(url);
    const data = await res.json();

    nextKey = data.nextKey;

    renderTasks(data.tasks || []);

    // hide load more button if no more tasks
    if (!nextKey) {
      const btn = document.getElementById("loadMoreBtn");
      if (btn) btn.style.display = "none";
    }

  } catch (err) {
    console.error("Error loading tasks:", err);
  }
}

// Create new task
async function createTask() {

  const titleInput = document.getElementById("title");
  const descInput = document.getElementById("description");

  const title = titleInput.value.trim();
  const description = descInput.value.trim();

  if (!title) {
    alert("Task title is required!");
    return;
  }

  try {

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description })
    });

    titleInput.value = "";
    descInput.value = "";

    // reset list
    document.getElementById("taskList").innerHTML = "";
    nextKey = null;

    loadTasks();

  } catch (err) {
    console.error("Error creating task:", err);
  }
}

// Setup page
document.addEventListener("DOMContentLoaded", () => {

  // temporary login bypass
  document.getElementById("userInfo").textContent = "Logged in (demo)";
  document.getElementById("appSection").classList.remove("hidden");

  const addBtn = document.getElementById("addTaskBtn");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  if (addBtn) addBtn.onclick = createTask;
  if (loadMoreBtn) loadMoreBtn.onclick = loadTasks;

  loadTasks();
});
document.addEventListener("DOMContentLoaded", () => {

  const addBtn = document.getElementById("addTaskBtn");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  if (addBtn) addBtn.onclick = createTask;
  if (loadMoreBtn) loadMoreBtn.onclick = loadTasks;

  loadTasks();
});