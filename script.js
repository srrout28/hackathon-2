// script.js

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
  
    // Check for empty task
    if (taskInput.value.trim() === '') {
      alert('Please enter a task!');
      return;
    }
  
    // Create new task item
    const newTask = document.createElement('li');
    newTask.innerHTML = `
      <input type="checkbox">
      <span>${taskInput.value}</span>
      <input type="date" value="">
      <button onclick="editTask(this)">Edit</button>
      <button onclick="deleteTask(this)">Delete</button>
    `;
  
    // Append the new task to the task list
    taskList.appendChild(newTask);
  
    // Save tasks to local storage
    saveTasks();
  
    // Clear the input
    taskInput.value = '';
  }
  
  // Function to edit a task
  function editTask(button) {
    const taskText = button.parentElement.querySelector('span');
    const newText = prompt('Edit task:', taskText.innerText);
  
    // Update task text if user entered a new value
    if (newText !== null) {
      taskText.innerText = newText;
  
      // Save tasks to local storage
      saveTasks();
    }
  }
  
  // Function to delete a task
  function deleteTask(button) {
    const task = button.parentElement;
    const taskList = task.parentElement;
  
    // Remove the task from the task list
    taskList.removeChild(task);
  
    // Save tasks to local storage
    saveTasks();
  }
  
  // Function to save tasks to local storage
  function saveTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = [];
  
    // Loop through each task and store its text, completion status, and due date
    taskList.querySelectorAll('li').forEach(task => {
      const taskText = task.querySelector('span').innerText;
      const isCompleted = task.querySelector('input[type="checkbox"]').checked;
      const dueDate = task.querySelector('input[type="date"]').value;
  
      tasks.push({ text: taskText, completed: isCompleted, dueDate: dueDate });
    });
  
    // Store tasks array in local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  // Function to load tasks from local storage
  function loadTasks() {
    const taskList = document.getElementById('taskList');
  
    // Get tasks array from local storage
    const storedTasks = localStorage.getItem('tasks');
  
    // If tasks are found in local storage, parse and display them
    if (storedTasks) {
      const tasks = JSON.parse(storedTasks);
  
      tasks.forEach(task => {
        const newTask = document.createElement('li');
        newTask.innerHTML = `
          <input type="checkbox" ${task.completed ? 'checked' : ''}>
          <span>${task.text}</span>
          <input type="date" value="${task.dueDate || ''}">
          <button onclick="editTask(this)">Edit</button>
          <button onclick="deleteTask(this)">Delete</button>
        `;
  
        // Append the stored task to the task list
        taskList.appendChild(newTask);
      });
    }
  }
  
  // Load tasks when the page is loaded
  loadTasks();
  