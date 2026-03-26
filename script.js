// Set current year
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Surprise messages
    const actionBtn = document.getElementById('actionBtn');
    const greeting = document.getElementById('greeting');
    const messages = [
        "Keep Learning Every Day!",
        "You're doing great!",
        "JavaScript is Powerful!",
        "Design Matters!"
    ];
    
    if (actionBtn && greeting) {
        actionBtn.addEventListener('click', () => {
            const randomMsg = messages[Math.floor(Math.random() * messages.length)];
            greeting.textContent = randomMsg;
        });
    }

    // Theme management with persistence
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? '' : 'dark';
            
            if (newTheme) {
                body.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', 'dark');
            } else {
                body.removeAttribute('data-theme');
                localStorage.setItem('theme', '');
            }
        });
    }

    // Form submission handling - Simple mailto approach
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // No e.preventDefault() here to allow the browser to handle mailto
            console.log("Preparing email...");
        });
    }

    // New: Random Quote Feature
    const quoteText = document.getElementById('quote-text');
    const quotes = [
        '"The only way to do great work is to love what you do." - Steve Jobs',
        '"Innovation distinguishes between a leader and a follower." - Steve Jobs',
        '"Stay hungry, stay foolish." - Whole Earth Catalog',
        '"Your time is limited, so don\'t waste it living someone else\'s life." - Steve Jobs',
        '"Code is like humor. When you have to explain it, it’s bad." - Cory House'
    ];
    
    if (quoteText) {
        quoteText.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    }

    // New: Todo List Feature
    const todoInput = document.getElementById('todo-input');
    const addTodoBtn = document.getElementById('add-todo-btn');
    const todoList = document.getElementById('todo-list');

    const loadTodos = () => {
        const todos = JSON.parse(localStorage.getItem('todos') || '[]');
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.style.display = 'flex';
            li.style.justifyContent = 'space-between';
            li.style.padding = '0.5rem';
            li.style.borderBottom = '1px solid var(--shadow)';
            li.innerHTML = `
                <span style="text-decoration: ${todo.completed ? 'line-through' : 'none'}; cursor: pointer;">${todo.text}</span>
                <button style="padding: 0.2rem 0.5rem; background: #ff4444; font-size: 0.8rem;">Del</button>
            `;
            
            // Toggle completion
            li.querySelector('span').addEventListener('click', () => {
                todos[index].completed = !todos[index].completed;
                saveTodos(todos);
                loadTodos();
            });

            // Delete todo
            li.querySelector('button').addEventListener('click', () => {
                todos.splice(index, 1);
                saveTodos(todos);
                loadTodos();
            });

            todoList.appendChild(li);
        });
    };

    const saveTodos = (todos) => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    if (addTodoBtn && todoInput) {
        addTodoBtn.addEventListener('click', () => {
            const text = todoInput.value.trim();
            if (text) {
                const todos = JSON.parse(localStorage.getItem('todos') || '[]');
                todos.push({ text, completed: false });
                saveTodos(todos);
                todoInput.value = '';
                loadTodos();
            }
        });

        todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTodoBtn.click();
        });
    }

    loadTodos();
});
