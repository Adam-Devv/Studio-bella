// assets/js/footer.js (REPLACE entire file content)

(function() {
    // Determine base path: '../' if in landing_pages, '' otherwise
    var basePath = (window.location.pathname.includes('/landing_pages/')) ? '../' : '';

    // Generate the HTML using the basePath
    var footerHTML = `
    <section id="footer">
        <div class="inner">
            <div class="row">
                <div class="6u 12u$(xsmall)">
                    <h4>Additional Links</h4>
                    <ul>
                        <li><a href="${basePath}giftcertificates.html" class="btn btn-primary p-3 px-4">Gift Certificates</a></li>
                        <li><a href="https://maps.app.goo.gl/CFUm4szhaurXJqWY9" target="_blank">Get Directions</a></li>
                         <li><a href="${basePath}faq.html">FAQ</a></li>
                         <li><a href="${basePath}privacy-policy.html">Privacy Policy</a></li> <!-- Assuming you might create this -->
                         <li><a href="${basePath}terms-of-service.html">Terms of Service</a></li> <!-- Assuming you might create this -->
                    </ul>
                    <h4>Follow Us On Social Media</h4>
                    <ul class="icons">
                        <li><a href="https://www.facebook.com/studiobellaspa/" class="icon fa-facebook" target="_blank"><span class="label">Facebook</span></a></li>
                        <li><a href="https://www.instagram.com/studio.bella.spa.atx/?hl=en" class="icon fa-instagram" target="_blank"><span class="label">Instagram</span></a></li>
                    </ul>
                </div>
                <div class="6u$ 12u$(xsmall)">
                    <h4>Contact</h4>
                    <ul style="color:white; list-style: none; padding-left: 0;">
                        <li><i class="fa fa-map-marker" aria-hidden="true" style="margin-right: 8px;"></i> <a href="https://maps.app.goo.gl/CFUm4szhaurXJqWY9" target="_blank">6611 Riverplace Boulevard<br><span style="padding-left: 20px;">Suite 101, Austin, TX 78730</span><br><span style="padding-left: 20px;">Medical Towers at Riverplace</span></a></li>
                        <li style="margin-top: 1em;"><i class="fa fa-phone" aria-hidden="true" style="margin-right: 8px;"></i> <a href="tel://15129668542">+ 1 512 966 8542</a></li>
                        <li style="margin-top: 1em;"><i class="fa fa-envelope" aria-hidden="true" style="margin-right: 8px;"></i> <a href="mailto:studiobellaspaaustin@gmail.com">StudioBellaSpaAustin@gmail.com</a></li>
                    </ul>
                    <!-- Begin Mailchimp Signup Form -->
                    <div id="mc_embed_signup" style="margin-top: 2em;">
                        <form action="https://studio-bella.us20.list-manage.com/subscribe/post?u=eb9102a6f041c56e986db8d4b&id=b116ecd2de" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
                            <div id="mc_embed_signup_scroll">
                                <label for="mce-EMAIL" style="color:white;">Subscribe to our Newsletter</label>
                                <input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="email address" required style="margin-bottom: 1em;">
                                <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                                <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_eb9102a6f041c56e986db8d4b_b116ecd2de" tabindex="-1" value=""></div>
                                <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button special alt fit"></div>
                            </div>
                            <script type="text/javascript">
                              if (document.getElementById('mc-embedded-subscribe')) {
                                document.getElementById('mc-embedded-subscribe').addEventListener('click', function() {
                                  if (typeof fbq === 'function') {
                                    fbq('track', 'Subscribe');
                                  }
                                }, false);
                              }
                            </script>
                        </form>
                    </div>
                    <!--End mailchimp newsletter signup-->
                </div>
            </div>
            <div class="copyright" style="margin-top: 3em;">© Copyright Studio Bella ©${new Date().getFullYear()} All rights reserved. </div>
        </div>
    </section>
    `;

    // Write the HTML to the document
    document.write(footerHTML);
})();