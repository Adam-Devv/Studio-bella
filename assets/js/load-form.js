document.addEventListener('DOMContentLoaded', function() {
    const consultationFormContainer = document.getElementById('consultation-form-container');
    const contactFormContainer = document.getElementById('contact-form-container');

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

    // --- Load Consultation Form ---
    if (consultationFormContainer) {
        const subject = consultationFormContainer.getAttribute('data-subject') || 'Website Lead'; // Default subject
        const service = consultationFormContainer.getAttribute('data-service') || 'General Inquiry'; // Default service

        // Determine path based on current page location relative to root
        const isLandingPage = window.location.pathname.includes('/landing/');
        const consultationFormPath = isLandingPage ? '../_includes/consultation-form.html' : '_includes/consultation-form.html';

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
        const contactFormPath = '_includes/contact-form.html';
        loadFormHtml(contactFormContainer, contactFormPath, null); // No specific callback needed for population
    }

});