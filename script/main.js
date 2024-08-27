document.addEventListener('DOMContentLoaded', () => {
    // Existing code...

    // Hide loading overlay and show content
    const loadingOverlay = document.querySelector('.loading-overlay');
    const content = document.querySelector('.content');
    
    loadingOverlay.style.display = 'none'; // Hide loading overlay
    content.style.display = 'block'; // Show main content

    // Existing code...
});

document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        settingsIcon: document.getElementById('settingsIcon'),
        settingsModal: document.getElementById('settingsModal'),
        closeModal: document.getElementById('closeModal'),
        categoryLinks: document.querySelectorAll('.modal-sidebar li'),
        categories: document.querySelectorAll('.settings-category')
    };

    // Function to set a random background image
    function setRandomBackground() {
        const totalImages = 22; // Adjust this to the total number of images you have
        const randomIndex = Math.floor(Math.random() * totalImages) + 1; // Random index from 1 to totalImages
        const backgroundImage = `url('../bg/image${randomIndex}.jpg')`; // Adjust the image format if necessary
        document.body.style.backgroundImage = backgroundImage;
    }

    // Set a random background image on page load
    setRandomBackground();

    // Change the background image every 5 minutes (300000 milliseconds)
    setInterval(setRandomBackground, 300000); // 5 minutes in milliseconds

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
