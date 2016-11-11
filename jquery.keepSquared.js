/**
* Element Squarer
* @extension keepSquared
*/

(function($) {

    $.fn.keepSquared = function(options) {

    	// Setup default settings
        var settings = $.extend({
            scalingFactor: 1.0
        }, options );

        /** The item/s to keep squared */
        var $elem = $(this);

        /** Main worker function */
        function square() {
            $elem.each(function() {

                // Store width and height
                var $elementHeight = $(this).height();
                var $elementWidth = $(this).width();

                // Check if setting width or height.
                if ($elementWidth > 0) {
                    $(this).height( $(this).width() * settings.scalingFactor );
                } else if ($elementHeight > 0) {
                    $(this).width( $(this).height() * settings.scalingFactor );
                } else {
                    // If both width and height == 0; return an error.
                    return window.console.error("No supplied width or height for an element");
                }

            });
        }

        /** Sqaure on window resize */
        $(window).resize(function(){
            square();
        });

        /** Square once now */
        square();

        return $elem;

    };

}(jQuery));