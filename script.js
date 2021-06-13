const modalOverlay = document.querySelector('.overlay');
const addBtn = document.querySelector('.add-btn');
const exitBtn = document.querySelector('.exit-btn');

const form = document.querySelector('#task-form');
const taskInput = form.querySelector('input');

const openTasksCol = document.querySelector('.col[data-type="open"]');
const taskCols = document.querySelectorAll('.col');

addBtn.addEventListener('click', () => {
   modalOverlay.classList.add('overlay-active');
});

exitBtn.addEventListener('click', () => {
   modalOverlay.classList.remove('overlay-active');
});

form.addEventListener('submit', (e) => {
   e.preventDefault();

   const taskValue = taskInput.value;
   const task = generateTask(taskValue);

   openTasksCol.appendChild(task);

   modalOverlay.classList.remove('overlay-active');
   taskInput.value = '';
});

for (const taskCol of taskCols) {
   taskCol.addEventListener('click', handleClick);
   taskCol.addEventListener('dragstart', dragstart);
   taskCol.addEventListener('dragend', dragend);
   taskCol.addEventListener('dragover', dragover);
   taskCol.addEventListener('dragenter', dragenter);
   taskCol.addEventListener('dragleave', dragleave);
   taskCol.addEventListener('drop', dragdrop);
}

function generateTask(value) {
   const taskItem = document.createElement('div');
   const deleteBtn = document.createElement('button');
   deleteBtn.classList.add('delete-item-btn');
   deleteBtn.innerHTML = '&times;';

   taskItem.classList.add('task-item', 'open');
   taskItem.id = generateUniqueID();
   taskItem.textContent = value;
   taskItem.appendChild(deleteBtn);
   taskItem.draggable = true;

   return taskItem;
}

function handleClick(e) {
   const target = e.target;

   if (target.classList.contains('delete-item-btn')) {
      const taskToDelete = target.parentElement;
      const currentCol = taskToDelete.parentElement;

      currentCol.removeChild(taskToDelete);
   }
}

function dragstart(e) {
   const elem = e.target;
   e.dataTransfer.setData('text/plain', elem.id);

   if (elem.classList.contains('task-item')) {
      elem.classList.add('hold');
      setTimeout(() => elem.classList.add('hide'), 0);
   }
}

function dragend(e) {
   const elem = e.target;

   if (elem.classList.contains('task-item')) {
      elem.classList.remove('hold', 'hide');
   }
}

function dragover(e) {
   e.preventDefault();
}

function dragenter(e) {
   e.preventDefault();
   e.target.classList.add('hovered');
}

function dragleave(e) {
   e.target.classList.remove('hovered');
}

function dragdrop(e) {
   const draggedElementId = e.dataTransfer.getData('text/plain');
   const dropCol = e.target;

   if (dropCol.classList.contains('col')) {
      const colType = dropCol.getAttribute('data-type');

      const elementToDrop = document.querySelector(`#${draggedElementId}`);
      elementToDrop.className = `task-item ${colType}`;

      dropCol.classList.remove('hovered');
      dropCol.appendChild(elementToDrop);
   }
}

function generateUniqueID() {
   return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
