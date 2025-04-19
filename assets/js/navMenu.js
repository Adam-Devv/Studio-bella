// assets/js/navMenu.js (REPLACE entire file content)

(function() {
    // Determine base path: '../' if in landing_pages or blogs, '' otherwise
    var currentPath = window.location.pathname;
    var basePath = (currentPath.includes('/landing/') || currentPath.includes('/blogs/')) ? '../' : '';

    // Generate the HTML including the new top bar
    var headerHTML = `
        <div id="top-cta-bar">
             <a href="${basePath}consultation.html">Book Your Free Consult</a>
        </div>
        <header id="header">
            <div class="inner">
                <a href="${basePath}index.html" class="logo">Studio Bella</a>
                <nav id="nav">
                    <a href="${basePath}services.html">Services</a>
                    <a href="${basePath}faq.html">FAQ</a>
                    <a href="${basePath}beforeAfterGallery.html">Before/After</a>
                    <a href="${basePath}blog.html">Blog</a>
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