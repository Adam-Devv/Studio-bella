document.addEventListener('DOMContentLoaded', function() {
    const consultationFormContainer = document.getElementById('consultation-form-container');
    const contactFormContainer = document.getElementById('contact-form-container');
    const trainingFormContainer = document.getElementById('training-form-container'); // Added training form container

    // Function to load form HTML
    const loadFormHtml = (container, formPath, callback) => {
        fetch(formPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}, loading ${formPath}`);
                }
                return response.text();
            })
            .then(html => {
                // Insert the fetched HTML into the container
                container.innerHTML = html;
                // Execute callback if provided (e.g., for populating fields)
                if (callback) {
                    callback(container);
                }
            })
            .catch(error => {
                console.error('Error loading form:', error);
                container.innerHTML = '<p>Sorry, the form could not be loaded at this time. Please contact us directly.</p>';
            });
    };

    // Determine base path prefix ('../' or '') based on current URL
    const isLandingOrBlogPage = window.location.pathname.includes('/landing/') || window.location.pathname.includes('/blogs/');
    const basePath = isLandingOrBlogPage ? '../' : '';

    // --- Load Consultation Form ---
    if (consultationFormContainer) {
        const subject = consultationFormContainer.getAttribute('data-subject') || 'Website Lead'; // Default subject
        const service = consultationFormContainer.getAttribute('data-service') || 'General Inquiry'; // Default service
        const consultationFormPath = `${basePath}_includes/consultation-form.html`;

        loadFormHtml(consultationFormContainer, consultationFormPath, (container) => {
             // Populate hidden fields after HTML is loaded
             const formElement = container.querySelector('form');
             if (formElement) {
                 const subjectInput = formElement.querySelector('input[name="_subject"]');
                 const serviceInput = formElement.querySelector('input[name="service_interest"]');

                 if (subjectInput) {
                     subjectInput.value = subject;
                 }
                 if (serviceInput) {
                     serviceInput.value = service;
                 }
             }
        });
    }

    // --- Load Contact Form ---
    if (contactFormContainer) {
        // Contact page is assumed to be at the root
        const contactFormPath = `${basePath}_includes/contact-form.html`; // Use basePath here too for consistency
        loadFormHtml(contactFormContainer, contactFormPath, null); // No specific callback needed for population
    }

    // --- Load Training Form --- (New Section)
    if (trainingFormContainer) {
        const subject = trainingFormContainer.getAttribute('data-subject') || 'Training Inquiry'; // Default subject
        const source = trainingFormContainer.getAttribute('data-source') || 'Training Inquiry'; // Default source description
        const trainingFormPath = `${basePath}_includes/training-form.html`; // Use basePath

        loadFormHtml(trainingFormContainer, trainingFormPath, (container) => {
             // Populate hidden fields after HTML is loaded
             const formElement = container.querySelector('form');
             if (formElement) {
                 const subjectInput = formElement.querySelector('input[name="_subject"]');
                 const sourceInput = formElement.querySelector('input[name="form_source"]'); // Using the new hidden field name

                 if (subjectInput) {
                     subjectInput.value = subject;
                 }
                 if (sourceInput) {
                     sourceInput.value = source;
                 }
             }
        });
    }

});