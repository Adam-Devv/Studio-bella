document.addEventListener('DOMContentLoaded', function() {
    const formContainer = document.getElementById('consultation-form-container');

    // Check if the container element exists on the current page
    if (formContainer) {
        const subject = formContainer.getAttribute('data-subject') || 'Landing Page Lead'; // Default subject
        const service = formContainer.getAttribute('data-service') || 'General Inquiry'; // Default service

        // Fetch the reusable form HTML. Adjust path if needed.
        // Since this script is in assets/js/, and form is in _includes/
        // the path from the HTML page (e.g., landing_pages/page.html) perspective needs to be relative
        // OR we use an absolute path from the root if possible/easier.
        // Let's try relative from the landing page location:
        const formPath = '../_includes/consultation-form.html';

        fetch(formPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                // Insert the fetched HTML into the container
                formContainer.innerHTML = html;

                // Now that the form is in the DOM, find and populate the hidden fields
                const formElement = formContainer.querySelector('form');
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
                 // Optional: Re-apply polyfills or other JS enhancements if needed after dynamic insertion
                 // Example: if using a placeholder polyfill that needs re-running:
                 // if (typeof $(formElement).placeholder === 'function') {
                 //    $(formElement).placeholder();
                 // }
            })
            .catch(error => {
                console.error('Error loading consultation form:', error);
                formContainer.innerHTML = '<p>Sorry, the consultation form could not be loaded at this time. Please contact us directly.</p>';
            });
    }
});