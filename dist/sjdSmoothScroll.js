'use strict';

/**
 * Add easeInOutQuad easing function to jQuery
 * - hijacked from http://gsgd.co.uk/sandbox/jquery/easing/jquery.easing.1.3.js
 */

jQuery.easing.jswing = jQuery.easing.swing;
jQuery.extend(jQuery.easing, {
	def: 'easeOutQuad',
	easeInOutQuad: function easeInOutQuad(x, t, b, c, d) {
		if ((t /= d / 2) < 1) {
			return c / 2 * t * t + b;
		}
		return -c / 2 * (--t * (t - 2) - 1) + b;
	}
});

/**
* Module for handling smooth anchor scrolling
* @namespace sjdSmoothScroll
*/

var sjdSmoothScroll = sjdSmoothScroll || {};
(function (context) {

	var scrollHandler = function scrollHandler(offset = 0) {
		var $root = $('html, body');
		var href = $(this).attr('href');
		$root.animate({
			scrollTop: $(href).offset().top + offset
		}, {
			duration: 400,
			easing: 'easeInOutQuad'
		});
		return false;
	};

	var publicScrollHandler = function publicScrollHandler(el) {
		var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
		var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 400;

		var $root = $('html, body');
		$root.animate({
			scrollTop: $(el).offset().top + offset
		}, {
			duration: duration,
			easing: 'easeInOutQuad'
		});
	};

	function init(options) {

		$('a[href*="#"]').unbind('click', scrollHandler);

		var offset = options && options.offset ? options.offset : 0
		$('a[href*="#"]').click(function() {
			scrollHandler(offset);
		});

		var excludedTargets = options && options.exclude ? options.exclude : undefined;
		if (excludedTargets) {
			excludedTargets.map(function (target) {
				$(target).unbind('click', scrollHandler);
				$(target).click(function (e) {
					e.preventDefault();
				});
			});
		}
	}

	init();

	context.init = init;
	context.scrollToElement = publicScrollHandler;

})(sjdSmoothScroll);
