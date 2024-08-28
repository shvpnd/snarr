document.addEventListener('DOMContentLoaded', () => {
    const loadingOverlay = document.querySelector('.loading-overlay');
    const content = document.querySelector('.content');
    const loadingProgress = document.getElementById('loadingProgress');

    // Function to simulate loading progress
    function simulateLoading() {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10; // Increase progress by 10%
            loadingProgress.style.width = `${progress}%`;

            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    loadingOverlay.style.display = 'none'; // Hide loading overlay
                    content.style.display = 'block'; // Show main content
                }, 500); // Short delay before showing content
            }
        }, 300); // Update every 300ms
    }

    // Start the loading simulation
    simulateLoading();

    // Ensure the loading screen is shown for at least 5 seconds
    setTimeout(() => {
        if (loadingOverlay.style.display !== 'none') {
            loadingOverlay.style.display = 'none'; // Hide loading overlay
            content.style.display = 'block'; // Show main content
        }
    }, 5000); // 5 seconds

    // Settings modal functionality
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
        const backgroundImage = `url('bg/image${randomIndex}.jpg')`; // Adjust the image format if necessary
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

    // Add this code to handle background image changes
    function changeBackgroundImage(imageName) {
        const backgroundImage = `url('bg/${imageName}')`;
        document.body.style.backgroundImage = backgroundImage;
    }

    // Add event listeners to the thumbnails
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            const imageName = thumbnail.getAttribute('data-image');
            changeBackgroundImage(imageName);
        });
    });

    document.querySelector('.modal-sidebar li[data-category="pomodoro"]').click();
});

// Assuming you have a script file where you handle modal interactions
document.addEventListener('DOMContentLoaded', function() {
    const categoryItems = document.querySelectorAll('.modal-sidebar li');

    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove 'selected' class from all items
            categoryItems.forEach(i => i.classList.remove('selected'));
            // Add 'selected' class to the clicked item
            this.classList.add('selected');
        });
    });
});
