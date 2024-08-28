// modal.js
function initializeModal() {
    const elements = {
        settingsIcon: document.getElementById('settingsIcon'),
        settingsModal: document.getElementById('settingsModal'),
        closeModal: document.getElementById('closeModal'),
        categoryLinks: document.querySelectorAll('.modal-sidebar li'),
        categories: document.querySelectorAll('.settings-category')
    };

    // Open the modal when the settings icon is clicked
    elements.settingsIcon.addEventListener('click', () => {
        elements.settingsModal.style.display = 'block';
    });

    // Close the modal when the close button is clicked
    elements.closeModal.addEventListener('click', () => {
        elements.settingsModal.style.display = 'none';
    });

    // Close the modal when clicking outside of the modal content
    window.addEventListener('click', (event) => {
        // Check if the click was outside the modal content
        if (event.target === elements.settingsModal) {
            elements.settingsModal.style.display = 'none';
        }
    });

    // Handle category link clicks
    elements.categoryLinks.forEach(link => {
        link.addEventListener('click', () => {
            const category = link.getAttribute('data-category');
            elements.categories.forEach(cat => {
                cat.style.display = 'none';
            });
            document.getElementById(category).style.display = 'block';
        });
    });

    // Set default category
    document.querySelector('.modal-sidebar li[data-category="pomodoro"]').click();
}

// Function to change background image (if needed)
function changeBackgroundImage(imageName) {
    const backgroundImage = `url('bg/${imageName}')`;
    document.body.style.backgroundImage = backgroundImage;
}

// Initialize the modal when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeModal);

// Fullscreen functionality
const fullscreenIcon = document.getElementById('fullscreenIcon');

fullscreenIcon.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
});
