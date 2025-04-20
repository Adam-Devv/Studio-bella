

(function($) {

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	
	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Off-Canvas Navigation.

			// Navigation Panel Toggle.
				$('<a href="#navPanel" class="navPanelToggle"></a>')
					.appendTo($body);

			// Navigation Panel.
				$(
					'<div id="navPanel">' +
						$('#nav').html() +
						'<a href="#navPanel" class="close"></a>' +
					'</div>'
				)
					.appendTo($body)
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						side: 'left'
					});

			// Fix: Remove transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#navPanel')
						.css('transition', 'none');

	});

	        // FAQ Accordion Functionality
        //-----------------------------------------------------------
        $('.faq-question').on('click', function(e) {
            e.preventDefault(); // Prevent default button behavior

            const $this = $(this);
            const $item = $this.closest('.faq-item'); // Get the parent item container
            const $answer = $item.find('.faq-answer'); // Find the answer within this item
            const $icon = $this.find('.faq-icon'); // Find the icon

            // Check if this item is already active
            const isActive = $this.hasClass('active');

            // OPTIONAL: Close all other accordions if you want only one open at a time
            // Uncomment the following lines to enable single-open behavior:
            // $('.faq-question.active').not($this).removeClass('active').attr('aria-expanded', 'false');
            // $('.faq-answer.open').not($answer).removeClass('open').css('max-height', '0px');
            // $('.faq-question.active').not($this).find('.faq-icon').css('transform', 'rotate(0deg)');

            // Toggle the current item
            $this.toggleClass('active').attr('aria-expanded', !isActive);
            $answer.toggleClass('open');
            // $icon.css('transform', isActive ? 'rotate(0deg)' : 'rotate(180deg)'); // CSS handles this now via .active class

            // Set max-height for animation
            if ($answer.hasClass('open')) {
                // Set max-height to the scroll height to open it
                $answer.css('max-height', $answer.get(0).scrollHeight + 'px');
            } else {
                // Set max-height to 0 to close it
                $answer.css('max-height', '0px');
            }
        });
        //-----------------------------------------------------------
})(jQuery);