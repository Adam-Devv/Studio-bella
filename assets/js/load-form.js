// assets/js/load-form.js
document.addEventListener('DOMContentLoaded', function() {
    const consultationFormContainer = document.getElementById('consultation-form-container');
    const contactFormContainer = document.getElementById('contact-form-container');
    const trainingFormContainer = document.getElementById('training-form-container');

    const isLandingOrBlogPage = window.location.pathname.includes('/landing/') || window.location.pathname.includes('/blogs/');
    const basePath = isLandingOrBlogPage ? '../' : ''; // This helps if thank you pages are relative, but we'll use absolute

    // --- Helper Function to get the correct Thank You URL ---
    const getThankYouUrl = (formType) => {
        // Using absolute URLs as specified
        switch (formType) {
            case 'consultation':
                return `https://www.studio-bella.com/consultation-thank-you.html`;
            case 'contact':
            case 'training': // Both contact and training go to the same thank you page
                return `https://www.studio-bella.com/contact-thank-you.html`;
            default:
                // Fallback, though ideally all forms should have a defined type
                return `https://www.studio-bella.com/thank-you-generic.html`;
        }
    };

    // --- Function to handle form submission with AJAX and redirect ---
    const handleFormSubmitAndRedirect = (formElement, formType) => {
        if (!formElement) {
            console.error("handleFormSubmitAndRedirect: formElement is null for formType:", formType);
            return;
        }

        formElement.addEventListener('submit', function(e) {
            e.preventDefault();
            const form = e.target;
            const data = new FormData(form);
            const thankYouUrl = getThankYouUrl(formType);

            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton ? submitButton.textContent : 'Submit';
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Submitting...';
            }

            fetch(form.action, { // form.action will get the Formspree URL from the form's HTML
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                        'event': 'form_submission_success',
                        'form_name': formType
                    });
                    window.location.href = thankYouUrl;
                } else {
                    response.json().then(errorData => {
                        let errorMessage = 'Oops! There was a problem submitting your form.';
                        if (errorData && errorData.errors) {
                            errorMessage = errorData.errors.map(error => error.message || error.field || 'Unknown error').join(", ");
                        } else if (response.statusText) {
                            errorMessage += ` Status: ${response.status} ${response.statusText}`;
                        }
                        alert(errorMessage);
                        console.error("Formspree error response:", errorData);
                    }).catch(() => {
                        alert('Oops! There was a problem submitting your form and parsing the error. Status: ' + response.status);
                    });
                }
            }).catch(error => {
                alert('Oops! There was a network error or problem submitting your form.');
                console.error('Form submission fetch error:', error);
            }).finally(() => {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                }
            });
        });
    };

    // --- Function to load form HTML ---
    const loadFormHtml = (container, formFileName, formType, populateFieldsCallback) => {
        if (!container) return; // Don't proceed if the container doesn't exist on the page
        const formPath = `${basePath}includes/${formFileName}`;

        fetch(formPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}, loading ${formPath}`);
                }
                return response.text();
            })
            .then(html => {
                container.innerHTML = html;
                const formElement = container.querySelector('form');
                if (formElement) {
                    if (populateFieldsCallback) {
                        populateFieldsCallback(formElement);
                    }
                    handleFormSubmitAndRedirect(formElement, formType);
                } else {
                    console.error("No form element found within loaded HTML for:", formFileName);
                }
            })
            .catch(error => {
                console.error('Error loading form HTML:', error);
                container.innerHTML = `<p style="color: red; text-align: center; padding: 1em;">Sorry, the form could not be loaded. Please <a href="${basePath}contact.html">contact us</a> directly.</p>`;
            });
    };

    // --- Load Consultation Form ---
    if (consultationFormContainer) {
        const subject = consultationFormContainer.getAttribute('data-subject') || 'Website Lead';
        const service = consultationFormContainer.getAttribute('data-service') || 'General Consultation Inquiry'; // Made more specific
        loadFormHtml(consultationFormContainer, 'consultation-form.html', 'consultation', (formElement) => {
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
        // No specific data attributes to pull for subject/service for the general contact form by default
        const subject = "General Contact Form Inquiry (Main Site)"; // Default subject
        loadFormHtml(contactFormContainer, 'contact-form.html', 'contact', (formElement) => {
            if (formElement) {
                const subjectInput = formElement.querySelector('input[name="_subject"]');
                if (subjectInput) subjectInput.value = subject;
            }
        });
    }

    // --- Load Training Form ---
    if (trainingFormContainer) {
        const subject = trainingFormContainer.getAttribute('data-subject') || 'Training Course Information Request (Main Site)';
        const source = trainingFormContainer.getAttribute('data-source') || 'Training Page Inquiry'; // Changed from service_interest
        loadFormHtml(trainingFormContainer, 'training-form.html', 'training', (formElement) => {
             if (formElement) {
                 const subjectInput = formElement.querySelector('input[name="_subject"]');
                 const sourceInput = formElement.querySelector('input[name="form_source"]'); // Corrected field name
                 if (subjectInput) subjectInput.value = subject;
                 if (sourceInput) sourceInput.value = source;
             }
        });
    }
});