document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        settingsIcon: document.getElementById('settingsIcon'),
        settingsModal: document.getElementById('settingsModal'),
        closeModal: document.getElementById('closeModal'),
        categoryLinks: document.querySelectorAll('.modal-sidebar li'),
        categories: document.querySelectorAll('.settings-category')
    };

    elements.settingsIcon.addEventListener('click', () => {
        elements.settingsModal.style.display = 'block';
    });

    elements.closeModal.addEventListener('click', () => {
        elements.settingsModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === elements.settingsModal) {
            elements.settingsModal.style.display = 'none';
        }
    });

    elements.categoryLinks.forEach(link => {
        link.addEventListener('click', () => {
            const category = link.getAttribute('data-category');
            elements.categories.forEach(cat => {
                cat.style.display = 'none';
            });
            document.getElementById(category).style.display = 'block';
        });
    });

    document.querySelector('.modal-sidebar li[data-category="pomodoro"]').click();
});
