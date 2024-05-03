document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('addTask');
  const taskInput = document.getElementById('newTask');
  const taskList = document.getElementById('taskList');

  addButton.addEventListener('click', () => {
    const task = taskInput.value;
    if (task) {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.innerHTML = `
        <span class="task-content">${task}</span>
        <div>
          <button class="btn btn-success btn-sm mr-2 complete-task">✓</button>
          <button class="btn btn-danger btn-sm delete-task">✗</button>
        </div>
      `;

      // Añade eventos para marcar como completado y eliminar
      li.querySelector('.complete-task').addEventListener('click', function() {
        li.querySelector('.task-content').classList.toggle('completed');
      });

      li.querySelector('.delete-task').addEventListener('click', function() {
        taskList.removeChild(li);
      });

      // Añadir la opción de editar la tarea
      li.querySelector('.task-content').addEventListener('dblclick', function() {
        const content = this.innerText;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = content;
        input.className = 'form-control';
        this.parentElement.replaceChild(input, this);
        
        // Evento para manejar el cambio
        input.addEventListener('blur', function() {
          const span = document.createElement('span');
          span.className = 'task-content';
          span.innerText = input.value || content; // Evita que la tarea quede vacía
          span.addEventListener('dblclick', li.querySelector('.task-content').dblclick);
          input.parentElement.replaceChild(span, input);
        });

        input.addEventListener('keypress', function(e) {
          if (e.key === 'Enter') {
            input.blur();
          }
        });
        
        input.focus();
      });

      // Agrega la tarea a la lista
      taskList.appendChild(li);

      // Limpia el campo de texto
      taskInput.value = '';
    }
  });

  taskInput.addEventListener('keypress', function(e) {
    // Agregar tarea al presionar la tecla Enter
    if (e.key === 'Enter') {
      addButton.click();
    }
  });
});
  
  
