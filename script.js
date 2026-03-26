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
});
