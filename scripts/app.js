// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // add task event
  form.addEventListener('submit', addTask);
  // remove task event
  taskList.addEventListener('click', removeTask);
  // clear task event
  clearBtn.addEventListener('click', clearTasks);
  // filter tasks
  filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from Local Storage
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task) {
    // create li element
    const li = document.createElement('li');
    // add class
    li.className = 'collection-item grey-text text-darken-4';
    // create text node and append
    li.appendChild(document.createTextNode(task));
    // create new link element
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fas fa-times red-text text-lighten-1"></i>';
    // append link to li
    li.appendChild(link);

    // create new link element
    const linkB = document.createElement('a');
    // add class
    linkB.className = 'check-item secondary-content';
    // add icon html
    linkB.innerHTML = '<i class="fas fa-check green-text"></i>';
    // append link to li
    li.appendChild(linkB);

    // append ui to ul
    taskList.appendChild(li);
  });
}

// Add Task
function addTask(e) {
  if (taskInput.value === '') {
    M.toast({
        html: 'Please add a task!'
      }),
      taskInput.value = '-';
  }

  // create li element
  const li = document.createElement('li');
  // add class
  li.className = 'collection-item grey-text text-darken-4';
  // create text node and append
  li.appendChild(document.createTextNode(taskInput.value));
  // create new link element
  const link = document.createElement('a');
  // add class
  link.className = 'delete-item secondary-content';
  // add icon html
  link.innerHTML = '<i class="fas fa-times red-text text-lighten-1"></i>';
  // append link to li
  li.appendChild(link);

  // create new link element
  const linkB = document.createElement('a');
  // add class
  linkB.className = 'check-item secondary-content';
  // add icon html
  linkB.innerHTML = '<i class="fas fa-check green-text"></i>';
  // append link to li
  li.appendChild(linkB);

  // append ui to ul
  taskList.appendChild(li);
  // store in local storage
  storeTaskInLocalStorage(taskInput.value);
  // clear input
  taskInput.value = '';
  e.preventDefault();
}

// Store Task in local storage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (M.toast({
        html: 'Item Deleted'
      })) {
      e.target.parentElement.parentElement.remove(),
        console.log(e.target.parentElement.parentElement),

        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from ls
function removeTaskFromLocalStorage(taskItem) {
  console.log(taskItem);
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear tasks
function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild)
  }
  (M.toast({
    html: 'Item Deleted'
  }));

  // Clear from ls
  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// // filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

// check the event
document.addEventListener('click',
  function (e) {
    // var checkThis = document.getElementsByClassName('check-item');
    // console.log('hello world');
    if (e.target.parentElement.classList.contains('check-item')) {
      e.target.parentElement.parentElement.classList.toggle('checked'),
        e.target.classList.toggle('white-text')
        // document.getElementsByClassName('delete-item').classList.toggle('white-text'),
        // console.log(e.target.parentElement.parentElement)
    }
  });