// Get elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

const editModal = document.getElementById('editModal');
const editTaskInput = document.getElementById('editTaskInput');
const saveTaskBtn = document.getElementById('saveTaskBtn');
const closeBtn = document.getElementsByClassName('close-btn')[0];

let tasks = [];
let currentEditIndex = null;

// Load tasks from localStorage
document.addEventListener('DOMContentLoaded', loadTasks);

// Add event listener to the Add Task button
addTaskBtn.addEventListener('click', addTask);

// Add event listener for Enter key
taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') {
    alert('Please enter a task');
    return;
  }

  const task = { text: taskText, completed: false };
  tasks.push(task);
  saveTasks();
  renderTasks();

  taskInput.value = '';
}

// Function to load tasks from localStorage
function loadTasks() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTasks();
  }
}

// Function to save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to render tasks
function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task.text;

    if (task.completed) {
      li.classList.add('completed');
    }

    const editBtn = document.createElement('button');
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editBtn.classList.add('edit-btn');
    editBtn.addEventListener('click', () => {
      openEditModal(index);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
      deleteTask(index);
    });

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    li.addEventListener('click', () => {
      toggleComplete(index);
    });

    taskList.appendChild(li);
  });
}

// Function to toggle task completion
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Function to open the edit modal
function openEditModal(index) {
  currentEditIndex = index;
  editTaskInput.value = tasks[index].text;
  editModal.style.display = 'block';
}

// Function to save the edited task
saveTaskBtn.addEventListener('click', () => {
  const newText = editTaskInput.value.trim();
  if (newText === '') {
    alert('Task text cannot be empty');
    return;
  }

  tasks[currentEditIndex].text = newText;
  saveTasks();
  renderTasks();
  closeModal();
});

// Function to close the edit modal
closeBtn.addEventListener('click', closeModal);

function closeModal() {
  editModal.style.display = 'none';
}

// Close modal if user clicks outside of it
window.onclick = function(event) {
  if (event.target == editModal) {
    closeModal();
  }
};
