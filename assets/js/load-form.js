// assets/js/load-form.js
document.addEventListener('DOMContentLoaded', function() {
    console.log("load-form.js: DOMContentLoaded fired.");

    const consultationFormContainer = document.getElementById('consultation-form-container');
    const contactFormContainer = document.getElementById('contact-form-container');
    const trainingFormContainer = document.getElementById('training-form-container');

    // Log whether containers are found
    // console.log("load-form.js: consultationFormContainer found?", !!consultationFormContainer);
    // console.log("load-form.js: contactFormContainer found?", !!contactFormContainer);
    // console.log("load-form.js: trainingFormContainer found?", !!trainingFormContainer);

    const isLandingOrBlogPage = window.location.pathname.includes('/landing/') || window.location.pathname.includes('/blogs/');
    const basePath = isLandingOrBlogPage ? '../' : '';

    const getThankYouUrl = (formType) => {
        switch (formType) {
            case 'consultation': return `https://www.studio-bella.com/consultation-thank-you.html`;
            case 'contact': case 'training': return `https://www.studio-bella.com/contact-thank-you.html`;
            default: return `https://www.studio-bella.com/thank-you-generic.html`;
        }
    };

    const handleFormSubmitAndRedirect = (formElement, formType) => {
        if (!formElement) {
            console.error("load-form.js: handleFormSubmitAndRedirect called with null formElement for formType:", formType);
            return;
        }
        // console.log(`load-form.js: Attaching submit listener to form for type: ${formType}`, formElement);

        formElement.addEventListener('submit', function(e) {
            // console.log(`load-form.js: Submit event triggered for formType: ${formType}`);
            e.preventDefault();
            const form = e.target;
            const data = new FormData(form); // This will include g-recaptcha-response if widget is completed
            const thankYouUrl = getThankYouUrl(formType);

            const submitButton = form.querySelector('button[type="submit"]'); // Target normal submit button
            const originalButtonText = submitButton ? submitButton.textContent : 'Submit';
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Submitting...';
            }

            // console.log(`load-form.js: Fetching to Formspree URL: ${form.action} for formType: ${formType}`);
            fetch(form.action, {
                method: form.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                // console.log(`load-form.js: Formspree response status: ${response.status} for formType: ${formType}`);
                if (response.ok) {
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({'event': 'form_submission_success', 'form_name': formType});
                    // console.log(`load-form.js: Redirecting to ${thankYouUrl} for formType: ${formType}`);
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
                        console.error(`load-form.js: Formspree error response for ${formType}:`, errorData);
                    }).catch((jsonError) => {
                        alert('Oops! There was a problem submitting your form and parsing the error. Status: ' + response.status);
                        console.error(`load-form.js: Error parsing Formspree JSON response for ${formType}:`, jsonError);
                    });
                }
            }).catch(error => {
                alert('Oops! There was a network error or problem submitting your form.');
                console.error(`load-form.js: Form submission fetch error for ${formType}:`, error);
            }).finally(() => {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                }
                // Reset reCAPTCHA if it exists on the page and there was an error
                if (typeof grecaptcha !== "undefined" && grecaptcha.reset) {
                    // Find all reCAPTCHA widgets on the page. If you only have one per form load, this is okay.
                    // If multiple forms could be on one page and loaded, you'd need to target specific widget IDs.
                    // For now, a general reset after an error might be acceptable.
                    try {
                        // grecaptcha.reset(); // This might reset more than intended if multiple widgets exist.
                        // It's often better to let the user re-attempt the CAPTCHA naturally.
                        // If Formspree error includes "reCAPTCHA", it implies the user needs to re-validate.
                    } catch (rcError) {
                        console.warn("load-form.js: Error trying to reset reCAPTCHA", rcError);
                    }
                }
            });
        });
    };

    const loadFormHtml = (container, formFileName, formType, populateFieldsCallback) => {
        if (!container) {
            // console.log(`load-form.js: Container for ${formType} not found. Skipping form load.`);
            return;
        }
        // console.log(`load-form.js: Loading HTML for formType: ${formType} into container:`, container);
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
                    // console.log(`load-form.js: Form element found for ${formType}. Populating fields and attaching handler.`);
                    if (populateFieldsCallback) {
                        populateFieldsCallback(formElement);
                    }
                    handleFormSubmitAndRedirect(formElement, formType);
                } else {
                    console.error(`load-form.js: No form element found within loaded HTML for: ${formFileName}`);
                }
            })
            .catch(error => {
                console.error(`load-form.js: Error loading form HTML for ${formType}:`, error);
                container.innerHTML = `<p style="color: red; text-align: center; padding: 1em;">Sorry, the form could not be loaded. Please <a href="${basePath}contact.html">contact us</a> directly.</p>`;
            });
    };

    if (consultationFormContainer) {
        // console.log("load-form.js: Initializing consultation form.");
        const subject = consultationFormContainer.getAttribute('data-subject') || 'Website Lead';
        const service = consultationFormContainer.getAttribute('data-service') || 'General Consultation Inquiry';
        loadFormHtml(consultationFormContainer, 'consultation-form.html', 'consultation', (formElement) => {
            if (formElement) {
                const subjectInput = formElement.querySelector('input[name="_subject"]');
                const serviceInput = formElement.querySelector('input[name="service_interest"]');
                if (subjectInput) subjectInput.value = subject;
                if (serviceInput) serviceInput.value = service;
            }
        });
    } else {
        // console.log("load-form.js: Consultation form container not found on this page.");
    }

    if (contactFormContainer) {
        // console.log("load-form.js: Initializing contact form.");
        const subject = "General Contact Form Inquiry (Main Site)";
        loadFormHtml(contactFormContainer, 'contact-form.html', 'contact', (formElement) => {
            if (formElement) {
                const subjectInput = formElement.querySelector('input[name="_subject"]');
                if (subjectInput) subjectInput.value = subject;
            }
        });
    } else {
        // console.log("load-form.js: Contact form container not found on this page.");
    }

    if (trainingFormContainer) {
        // console.log("load-form.js: Initializing training form.");
        const subject = trainingFormContainer.getAttribute('data-subject') || 'Training Course Information Request (Main Site)';
        const source = trainingFormContainer.getAttribute('data-source') || 'Training Page Inquiry';
        loadFormHtml(trainingFormContainer, 'training-form.html', 'training', (formElement) => {
            if (formElement) {
                const subjectInput = formElement.querySelector('input[name="_subject"]');
                const sourceInput = formElement.querySelector('input[name="form_source"]');
                if (subjectInput) subjectInput.value = subject;
                if (sourceInput) sourceInput.value = source;
            }
        });
    } else {
        // console.log("load-form.js: Training form container not found on this page.");
    }
    // console.log("load-form.js: Script execution finished.");
});