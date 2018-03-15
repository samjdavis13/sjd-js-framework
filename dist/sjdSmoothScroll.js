'use strict';

/**
	* Module for handling smooth anchor scrolling
	* @namespace sjdSmoothScroll
	*/

var sjdSmoothScroll = sjdSmoothScroll || {};

(function (jQuery, sjdSmoothScroll) {

	/**
 * Add easeInOutQuad easing function to jQuery
 * - hijacked from http://gsgd.co.uk/sandbox/jquery/easing/jquery.easing.1.3.js
 */

	jQuery.easing.jswing = jQuery.easing.swing;
	jQuery.extend(jQuery.easing, {
		def: 'easeInOutQuad',
		easeInOutQuad: function easeInOutQuad(x, t, b, c, d) {
			if ((t /= d / 2) < 1) {
				return c / 2 * t * t + b;
			}
			return -c / 2 * (--t * (t - 2) - 1) + b;
		}
	});

	(function ($, context) {

		var scrollHandler = function scrollHandler() {
			var offsetAmount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

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

		var publicScrollHandler = function publicScrollHandler(el) {
			var offsetAmount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
			var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 400;

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
			var settings = Object.assign({
				exclude: [],
				offset: 0
			}, options);

			$('a[href*="#"]').each(function (index, item) {
				var _this = this;

				// Bind this to the scrollhandler

				// Create our wrapper function
				var scrollHandlerWrapper = function scrollHandlerWrapper(e) {
					e.preventDefault();
					scrollHandler = scrollHandler.bind(_this);
					scrollHandler(settings.offset);
				};

				// Create our flag var
				var shouldBindThisElement = true;

				// Unbind all clicks
				$(item).off('click');

				// Work out the flag for this element
				settings.exclude.forEach(function (excludingElement) {
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
})(jQuery, sjdSmoothScroll);
