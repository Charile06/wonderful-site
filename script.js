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
        if (!todoList) return; // Add check to prevent errors on pages without todo list
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
                <button style="padding: 0.2rem 0.5rem; background: #ff4444; font-size: 0.8rem; color: white; border: none; border-radius: 4px; cursor: pointer;">Del</button>
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

    if (addTodoBtn && todoInput && todoList) {
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

    if (todoList) {
        loadTodos();
    }

    // New: AI Assistant Feature
    const aiInput = document.getElementById('ai-input');
    const aiSendBtn = document.getElementById('ai-send-btn');
    const aiChatWindow = document.getElementById('ai-chat-window');

    const addMessage = (text, isUser = false) => {
        if (!aiChatWindow) return;
        const msgDiv = document.createElement('div');
        msgDiv.className = isUser ? 'user-msg' : 'ai-msg';
        msgDiv.textContent = text;
        aiChatWindow.appendChild(msgDiv);
        aiChatWindow.scrollTop = aiChatWindow.scrollHeight;
    };

    const getAIResponse = (input) => {
        const lowerInput = input.toLowerCase();
        
        // --- 核心功能关键词 (Core Features) ---
        if (lowerInput.includes('about') || lowerInput.includes('关于')) return "This website is a personal project created to learn web development. Check out the About page!";
        if (lowerInput.includes('projects') || lowerInput.includes('项目') || lowerInput.includes('work')) return "You can see my latest work in the Projects section below.";
        if (lowerInput.includes('contact') || lowerInput.includes('联系')) return "You can reach out via the contact form at the bottom of the page.";
        if (lowerInput.includes('theme') || lowerInput.includes('主题') || lowerInput.includes('color')) return "You can switch between light and dark modes using the Theme button in the navigation bar!";
        
        // --- 特定话题: 周海淇 (Specific Topic: Zhou Haiqi) ---
        if (lowerInput.includes('周海淇')) {
            if (lowerInput.includes('喜欢')) {
                return "哇，原来你喜欢周海淇呀！这是一个很棒的秘密。也许你可以试着在网站上为她/他做一个专门的展示页面？";
            }
            if (lowerInput.includes('追') || lowerInput.includes('方法') || lowerInput.includes('计划')) {
                return "制定追周海淇的方法？首先你要展现出最真实、最优秀的自己。比如，继续完善这个网站，向她展示你的才华！你可以从分享有趣的内容开始。";
            }
            return "周海淇是一个很特别的人吗？你可以多跟我聊聊关于她/他的事情。";
        }

        // --- 基础问候 (Greetings) ---
        if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('你好')) return "Hello there! How can I help you explore this website?";
        if (lowerInput.includes('who are you') || lowerInput.includes('你是谁')) return "I'm a simulated AI assistant built with pure JavaScript!";
        
        // --- 兜底回答 (Fallbacks) ---
        const fallbacks = [
            "这是一个很有深度的问题，让我想想...",
            "听起来很有趣！你能再详细说说吗？",
            "虽然我只是个模拟 AI，但我能感觉到这个问题对你很重要。",
            "你可以试着问我关于‘项目’、‘关于我’或者‘切换主题’的内容。"
        ];
        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    };

    if (aiSendBtn && aiInput && aiChatWindow) {
        console.log("AI Assistant initialized"); // Debug log
        aiSendBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent any default behavior
            const text = aiInput.value.trim();
            console.log("User sent:", text); // Debug log
            if (text) {
                addMessage(text, true);
                aiInput.value = '';
                
                // Simulate thinking time
                setTimeout(() => {
                    const response = getAIResponse(text);
                    console.log("AI response:", response); // Debug log
                    addMessage(response, false);
                }, 600);
            }
        });

        aiInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                aiSendBtn.click();
            }
        });
    } else {
        console.log("AI elements not found on this page");
    }
});
