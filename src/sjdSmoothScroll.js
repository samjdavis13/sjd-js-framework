/**
	* Module for handling smooth anchor scrolling
	* @namespace sjdSmoothScroll
	*/

var sjdSmoothScroll = sjdSmoothScroll || {};

((jQuery, sjdSmoothScroll) => {

	/**
 * Add easeInOutQuad easing function to jQuery
 * - hijacked from http://gsgd.co.uk/sandbox/jquery/easing/jquery.easing.1.3.js
 */

	jQuery.easing.jswing = jQuery.easing.swing;
	jQuery.extend(jQuery.easing, {
		def: 'easeInOutQuad',
		easeInOutQuad: function (x, t, b, c, d) {
			if ((t /= d / 2) < 1) {
				return c / 2 * t * t + b;
			}
			return -c / 2 * (--t * (t - 2) - 1) + b;
		}
	});

	(function ($, context) {

		var scrollHandler = function (offsetAmount = 0) {
			// e.prevenDefault();
			var $root = $('html, body');
			var href = $(this).attr('href');


			$root.animate({
				scrollTop: $(href).offset().top + offsetAmount
			}, {
					duration: 400,
					easing: 'easeInOutQuad'
				});
			return false;
		};

		var publicScrollHandler = function (el, offsetAmount = 0, duration = 400) {
			var $root = $('html, body');
			$root.animate({
				scrollTop: $(el).offset().top + offsetAmount
			}, {
					duration: duration,
					easing: 'easeInOutQuad'
				});
		};

		function init(options) {

			// Defaults here...
			let settings = Object.assign({
				exclude: [],
				offset: 0
			}, options);

			$('a[href*="#"]').each(function (index, item) {

				// Bind this to the scrollhandler

				// Create our wrapper function
				let scrollHandlerWrapper = (e) => {
					e.preventDefault();
					scrollHandler = scrollHandler.bind(this);
					scrollHandler(settings.offset);
				}

				// Create our flag var
				let shouldBindThisElement = true;

				// Unbind all clicks
				$(item).off('click');

				// Work out the flag for this element
				settings.exclude.forEach(excludingElement => {
					if ($(excludingElement) == $(item)) {
						shouldBindThisElement = false;
					}
				});

				// If we should, bind our scrollHandlerWrapper
				if (shouldBindThisElement) {
					$(item).click(scrollHandlerWrapper);
				}

			});

		}

		context.init = init;
		context.scrollToElement = publicScrollHandler;

		init();

	})(jQuery, sjdSmoothScroll);

})(jQuery, sjdSmoothScroll)