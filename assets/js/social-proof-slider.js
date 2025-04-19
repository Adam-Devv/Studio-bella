// assets/js/social-proof-slider.js

function initSocialProofSlider(containerElement) {
    // Find review containers *within the provided container element*
    const reviewContainers = containerElement.querySelectorAll('.platform-reviews-container');
    // console.log(`Slider Init: Found ${reviewContainers.length} review containers within`, containerElement); // Debug

    reviewContainers.forEach((container, containerIndex) => {
        const platform = container.dataset.platform;
        const slides = container.querySelectorAll('.review-slide');
        const prevButton = container.querySelector('.prev-review');
        const nextButton = container.querySelector('.next-review');
        let currentIndex = 0;

        // console.log(`Slider Init: Container ${containerIndex} (${platform}): Found ${slides.length} slides.`); // Debug

        function showReview(index) {
            if (slides.length === 0) return;
            // console.log(`Slider Init: Container ${containerIndex} (${platform}): Showing slide ${index}`); // Debug

            slides.forEach((slide, i) => {
                slide.classList.remove('active-slide');
                if (i === index) {
                    slide.classList.add('active-slide');
                }
            });

            const displayStyle = slides.length <= 1 ? 'none' : 'inline-flex';
            if (prevButton) prevButton.style.display = displayStyle;
            if (nextButton) nextButton.style.display = displayStyle;
        }

        if (nextButton) {
            // console.log(`Slider Init: Container ${containerIndex} (${platform}): Adding click listener to nextButton.`); // Debug
            nextButton.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                // console.log(`Slider Init: Container ${containerIndex} (${platform}): nextButton clicked!`); // Debug
                if (slides.length === 0) return;
                currentIndex = (currentIndex + 1) % slides.length;
                showReview(currentIndex);
            });
        } // else { console.log(`Slider Init: Container ${containerIndex} (${platform}): nextButton listener NOT added (button not found).`); } // Debug

        if (prevButton) {
            // console.log(`Slider Init: Container ${containerIndex} (${platform}): Adding click listener to prevButton.`); // Debug
             prevButton.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                // console.log(`Slider Init: Container ${containerIndex} (${platform}): prevButton clicked!`); // Debug
                if (slides.length === 0) return;
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                showReview(currentIndex);
            });
        } // else { console.log(`Slider Init: Container ${containerIndex} (${platform}): prevButton listener NOT added (button not found).`); } // Debug

        // console.log(`Slider Init: Container ${containerIndex} (${platform}): Initializing view.`); // Debug
        showReview(currentIndex); // Initialize the first slide

    });
}