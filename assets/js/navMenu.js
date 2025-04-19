// assets/js/navMenu.js (REPLACE entire file content)

(function() {
    // Determine base path: '../' if in landing_pages, '' otherwise
    var basePath = (window.location.pathname.includes('/landing_pages/')) ? '../' : '';

    // Generate the HTML using the basePath
    var headerHTML = `
        <header id="header">
            <div class="inner">
                <a href="${basePath}index.html" class="logo">Studio Bella</a>
                <nav id="nav">
                    <a href="${basePath}services.html">Services</a>
                    <a href="${basePath}faq.html">FAQ</a>
                    <a href="${basePath}beforeAfterGallery.html">Before/After</a>
                    <a href="${basePath}training.html">Training</a>
                    <a href="${basePath}about.html">About</a>
                    <a href="${basePath}contact.html">Contact</a>
                </nav>
            </div>
        </header>
        <a href="#navPanel" class="navPanelToggle"><span class="fa fa-bars"></span></a>
    `;

    // Write the HTML to the document
    document.write(headerHTML);
})();