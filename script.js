const taskList = document.getElementById('taskList');
let tasks = [];

function addTask() {
  const name = document.getElementById('taskName').value.trim();
  const due = document.getElementById('dueDate').value;

  if (!name || !due) {
    alert("Please enter task name and due date.");
    return;
  }

  const task = {
    name,
    due: new Date(due),
    completed: false
  };

  tasks.push(task);
  document.getElementById('taskName').value = '';
  document.getElementById('dueDate').value = '';
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = '';
  const now = new Date();
  const oneHour = 3600000;

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'task-item';

    const timeLeft = task.due - now;

    // Add status classes
    if (task.completed) {
      li.classList.add('completed');
    } else if (timeLeft < 0) {
      li.classList.add('overdue');
    } else if (timeLeft < oneHour) {
      li.classList.add('soon');
    }

    const content = document.createElement('div');
    content.className = 'task-content';

    const taskName = document.createElement('span');
    taskName.textContent = task.name;
    if (task.completed) taskName.classList.add('completed-text');

    const taskTime = document.createElement('span');
    taskTime.className = 'task-time';
    taskTime.textContent = `Due: ${task.due.toLocaleString()}`;

    content.appendChild(taskName);
    content.appendChild(taskTime);

    const actions = document.createElement('div');
    actions.className = 'actions';

    const doneBtn = document.createElement('button');
    doneBtn.textContent = task.completed ? 'Undo' : ' Done';
    doneBtn.onclick = () => {
      task.completed = !task.completed;
      renderTasks();
    };

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = () => {
      tasks.splice(index, 1);
      renderTasks();
    };

    actions.appendChild(doneBtn);
    actions.appendChild(delBtn);

    li.appendChild(content);
    li.appendChild(actions);
    taskList.appendChild(li);
  });
}
