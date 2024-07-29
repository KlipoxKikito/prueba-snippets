document.addEventListener('DOMContentLoaded', () => {
	const taskInput = document.getElementById('task-input');
	const addTaskBtn = document.getElementById('add-task-btn');
	const taskList = document.getElementById('task-list');
	const languageSelector = document.getElementById('language-selector');
	const title = document.getElementById('title');

	const translations = {
		es: {
			title: 'Lista de Tareas',
			placeholder: 'Nueva tarea...',
			addButton: 'Agregar'
		},
		en: {
			title: 'Task List',
			placeholder: 'New task...',
			addButton: 'Add'
		}
	};

	function updateLanguage(lang) {
		title.textContent = translations[lang].title;
		taskInput.placeholder = translations[lang].placeholder;
		addTaskBtn.textContent = translations[lang].addButton;
	}

	function saveTasks() {
		const tasks = [];
		document.querySelectorAll('.task-item').forEach(task => {
			tasks.push({
				text: task.querySelector('span').textContent,
				completed: task.classList.contains('completed')
			});
		});
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	function loadTasks() {
		const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
		tasks.forEach(task => {
			const li = document.createElement('li');
			li.className = 'task-item';
			if (task.completed) {
				li.classList.add('completed');
			}
			li.innerHTML = `
				<span>${task.text}</span>
				<button class="delete-btn">X</button>
			`;
			taskList.appendChild(li);
		});
	}

	languageSelector.addEventListener('change', (e) => {
		updateLanguage(e.target.value);
	});

	addTaskBtn.addEventListener('click', () => {
		const taskText = taskInput.value.trim();
		if (taskText !== '') {
			const li = document.createElement('li');
			li.className = 'task-item';
			li.innerHTML = `
				<span>${taskText}</span>
				<button class="delete-btn">X</button>
			`;
			taskList.appendChild(li);
			taskInput.value = '';
			saveTasks();
		}
	});

	taskList.addEventListener('click', (e) => {
		if (e.target.classList.contains('delete-btn')) {
			e.target.parentElement.remove();
			saveTasks();
		} else if (e.target.tagName === 'SPAN') {
			e.target.parentElement.classList.toggle('completed');
			saveTasks();
		}
	});

	// Set initial language
	updateLanguage(languageSelector.value);

	// Load tasks from localStorage
	loadTasks();
});