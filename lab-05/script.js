const API_URL = 'https://jsonplaceholder.typicode.com';

const taskForm = document.querySelector('#taskForm');
const taskInput = document.querySelector('#taskInput');
const addBtn = document.querySelector('#addBtn');
const taskList = document.querySelector('#taskList');
const activeCounter = document.querySelector('#activeCounter');
const loader = document.querySelector('#loader');
const errorBox = document.querySelector('#errorBox');
const searchInput = document.querySelector('#searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const emptyMessage = document.querySelector('#emptyMessage');
const userInfo = document.querySelector('#userInfo');

let tasks = [];
let currentFilter = 'all';
let searchText = '';
let tempId = 1000;

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}

function showError(message) {
  errorBox.textContent = message;
  errorBox.classList.remove('hidden');
}

function clearError() {
  errorBox.textContent = '';
  errorBox.classList.add('hidden');
}

function createTaskElement(task) {
  const li = document.createElement('li');
  li.classList.add('task-item');
  li.dataset.id = task.id;

  if (task.completed) {
    li.classList.add('completed');
  }

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.classList.add('task-checkbox');

  const span = document.createElement('span');
  span.classList.add('task-title');
  span.textContent = task.title;

  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.classList.add('task-delete');
  deleteBtn.textContent = 'Видалити';

  li.append(checkbox, span, deleteBtn);
  return li;
}

function getVisibleTasks() {
  return tasks.filter((task) => {
    const byStatus =
      currentFilter === 'all' ||
      (currentFilter === 'active' && !task.completed) ||
      (currentFilter === 'completed' && task.completed);

    const byText = task.title.toLowerCase().includes(searchText.toLowerCase());
    return byStatus && byText;
  });
}

function renderTasks() {
  taskList.innerHTML = '';

  const visibleTasks = getVisibleTasks();

  visibleTasks.forEach((task) => {
    taskList.appendChild(createTaskElement(task));
  });

  emptyMessage.classList.toggle('hidden', visibleTasks.length !== 0);
  updateCounter();
}

function updateCounter() {
  const activeCount = tasks.filter((task) => !task.completed).length;
  activeCounter.textContent = `Активних завдань: ${activeCount}`;
}

function renderUserInfo(user) {
  userInfo.textContent = `${user.name} / ${user.email}`;
}

async function loadInitialData() {
  showLoader();
  clearError();

  try {
    const [todosResponse, userResponse] = await Promise.all([
      fetch(`${API_URL}/todos?_limit=20`),
      fetch(`${API_URL}/users/1`),
    ]);

    if (!todosResponse.ok || !userResponse.ok) {
      throw new Error('Bad response');
    }

    const [loadedTasks, user] = await Promise.all([
      todosResponse.json(),
      userResponse.json(),
    ]);

    tasks = loadedTasks;
    renderUserInfo(user);
    renderTasks();
  } catch (error) {
    showError('Не вдалося завантажити дані. Спробуйте пізніше.');
    console.error('Помилка:', error);
  } finally {
    hideLoader();
  }
}

async function addTask(title) {
  showLoader();
  clearError();

  try {
    const response = await fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        title: title,
        completed: false,
        userId: 1,
      }),
    });

    if (!response.ok) {
      throw new Error('Bad response');
    }

    const newTask = await response.json();
    newTask.id = tempId++;
    tasks.unshift(newTask);

    taskInput.value = '';
    addBtn.disabled = true;
    renderTasks();
  } catch (error) {
    showError('Не вдалося створити завдання.');
    console.error('Помилка створення:', error);
  } finally {
    hideLoader();
  }
}

async function toggleTask(id, completed) {
  clearError();
  const task = tasks.find((item) => item.id === id);
  const oldValue = task ? task.completed : false;

  if (task) {
    task.completed = completed;
    renderTasks();
  }

  try {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ completed: completed }),
    });

    if (!response.ok) {
      throw new Error('Bad response');
    }
  } catch (error) {
    if (task) {
      task.completed = oldValue;
      renderTasks();
    }
    showError('Не вдалося оновити завдання.');
    console.error('Помилка оновлення:', error);
  }
}

async function deleteTask(id) {
  clearError();
  const oldTasks = tasks.slice();

  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();

  try {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Bad response');
    }
  } catch (error) {
    tasks = oldTasks;
    renderTasks();
    showError('Не вдалося видалити завдання.');
    console.error('Помилка видалення:', error);
  }
}

function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

taskForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = taskInput.value.trim();

  if (title.length > 0) {
    addTask(title);
  }
});

taskInput.addEventListener('input', () => {
  addBtn.disabled = taskInput.value.trim().length === 0;
});

taskInput.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    taskInput.value = '';
    addBtn.disabled = true;
  }
});

taskList.addEventListener('click', (event) => {
  const target = event.target;
  const taskItem = target.closest('.task-item');

  if (!taskItem) return;

  const taskId = Number(taskItem.dataset.id);

  if (target.classList.contains('task-delete')) {
    deleteTask(taskId);
  }

  if (target.classList.contains('task-checkbox')) {
    toggleTask(taskId, target.checked);
  }
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    currentFilter = button.dataset.filter;
    renderTasks();
  });
});

searchInput.addEventListener('input', debounce((event) => {
  searchText = event.target.value.trim();
  renderTasks();
}, 300));

loadInitialData();
