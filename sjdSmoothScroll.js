/**
 * Add easeInOutQuad easing function to jQuery
 * - hijacked from http://gsgd.co.uk/sandbox/jquery/easing/jquery.easing.1.3.js
 */

jQuery.easing.jswing = jQuery.easing.swing;
jQuery.extend( jQuery.easing, {
	def: 'easeOutQuad',
	easeInOutQuad: function (x, t, b, c, d) {
		if ( ( t /= d/2 ) < 1 ) {
			return c/2 * t * t + b;
		}
		return -c/2 * (--t * (t-2) - 1) + b;
	}
});


/**
* Module for handling smooth anchor scrolling
* @namespace sjdSmoothScroll
*/

var sjdSmoothScroll = sjdSmoothScroll || {};
(function(context) {

    var $root = $('html, body');
	
	var scrollHandler = function() {
        var href = $(this).attr('href');
        $root.animate({
                scrollTop: $(href).offset().top
            }, {
                duration: 400,
                easing: 'easeInOutQuad'
            });
        return false;
    }
	
	function init(options) {
		$('a[href*="#"]').unbind('click', scrollHandler);
		
	    $('a[href*="#"]').click(scrollHandler);
		
		excludedTargets = options && options.exclude ? options.exclude : undefined;
		if (excludedTargets) {
			for (var i = excludedTargets.length - 1; i >= 0; i--) {
				$(excludedTargets[i]).unbind('click', scrollHandler);
			}
		}
	}
	
	init();
	
	context.init = init;

})(sjdSmoothScroll);