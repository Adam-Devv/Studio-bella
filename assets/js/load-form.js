// assets/js/load-form.js (REVISED)
document.addEventListener('DOMContentLoaded', function() {
    const consultationFormContainer = document.getElementById('consultation-form-container');
    const contactFormContainer = document.getElementById('contact-form-container');
    const trainingFormContainer = document.getElementById('training-form-container');

    // Determine base path prefix ('../' or '') based on current URL
    const isLandingOrBlogPage = window.location.pathname.includes('/landing/') || window.location.pathname.includes('/blogs/');
    const basePath = isLandingOrBlogPage ? '../' : '';

    // Function to load form HTML
    const loadFormHtml = (container, formFileName, callback) => {
        // Construct the correct path using basePath and the new 'includes' directory
        const formPath = `${basePath}includes/${formFileName}`; // <-- Use 'includes' and basePath

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
                container.innerHTML = '<p style="color: red; text-align: center; padding: 1em;">Sorry, the form could not be loaded. Please <a href="' + basePath + 'contact.html">contact us</a> directly.</p>';
            });
    };

    // --- Load Consultation Form ---
    if (consultationFormContainer) {
        const subject = consultationFormContainer.getAttribute('data-subject') || 'Website Lead';
        const service = consultationFormContainer.getAttribute('data-service') || 'General Inquiry';

        loadFormHtml(consultationFormContainer, 'consultation-form.html', (container) => { // Pass only filename
             const formElement = container.querySelector('form');
             if (formElement) {
                 const subjectInput = formElement.querySelector('input[name="_subject"]');
                 const serviceInput = formElement.querySelector('input[name="service_interest"]');
                 if (subjectInput) subjectInput.value = subject;
                 if (serviceInput) serviceInput.value = service;
             }
        });
    }

    // --- Load Contact Form ---
    if (contactFormContainer) {
        loadFormHtml(contactFormContainer, 'contact-form.html', null); // Pass only filename
    }

    // --- Load Training Form ---
    if (trainingFormContainer) {
        const subject = trainingFormContainer.getAttribute('data-subject') || 'Training Inquiry';
        const source = trainingFormContainer.getAttribute('data-source') || 'Training Inquiry';

        loadFormHtml(trainingFormContainer, 'training-form.html', (container) => { // Pass only filename
             const formElement = container.querySelector('form');
             if (formElement) {
                 const subjectInput = formElement.querySelector('input[name="_subject"]');
                 const sourceInput = formElement.querySelector('input[name="form_source"]');
                 if (subjectInput) subjectInput.value = subject;
                 if (sourceInput) sourceInput.value = source;
             }
        });
    }
});