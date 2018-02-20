'use strict';

/**
* Element Squarer
* @extension keepSquared
*/

(function ($) {

    $.fn.keepSquared = function (options) {

        // Setup default settings
        var settings = $.extend({
            scalingFactor: 1.0
        }, options);

        /** The item/s to keep squared */
        var $elem = $(this);

        /** Main worker function */
        function square() {
            $elem.each(function () {

                // Store width
                var $elementWidth = $(this).width();

                // Check if setting width
                if ($elementWidth > 0) {
                    $(this).height($(this).width() * settings.scalingFactor);
                } else {
                    $(this).width('100%');
                    $(this).height($(this).width() * settings.scalingFactor);
                }
            });
        }

        /** Sqaure on window resize */
        $(window).resize(function () {
            square();
        });

        /** Square once now */
        square();

        return $elem;
    };
})(jQuery);
