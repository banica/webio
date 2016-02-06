// $Id$

/**
 * @file
 * OM Maximenu script
 *
 * @author: Daniel Honrade http://drupal.org/user/351112
 *
 */
 
jQuery(document).ready(function($){  
	//back to top scroll function. Any link with a hash (#) will scroll to that id on the page
	$('.om-maximenu li.om-leaf a').addClass('om-autoscroll');

	$('a.om-autoscroll[href*=#]').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var $target = $(this.hash);
			$target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
			if ($target.length) {
			  var targetOffset = $target.offset().top;
				  //targetOffset = targetOffset - 90;
				$('html,body').animate({scrollTop: targetOffset - 0}, 500);
				return false;
			}
		}
	});
	// stay open
	$('.om-maximenu-open input').each(function() {
		//alert($(this).attr('checked'));
		// jQuery 1.7 has changed it's value checking for checkbox to checked instead of true
	  if(($(this).attr('checked') == true) || ($(this).attr('checked') == 'checked')) {
	    $(this).parent().parent().addClass('open');
	    $(this).parent().parent().parent().addClass('open');
	    $(this).parent().parent().removeClass('closed');
	  }
	  else {
	    $(this).parent().parent().removeClass('open');
	    $(this).parent().parent().parent().removeClass('open');
	    $(this).parent().parent().addClass('closed');
	  }
	});
	$('.om-maximenu-open input').click(function() {
		//alert($(this).attr('checked'));
	  if(($(this).attr('checked') == true) || ($(this).attr('checked') == 'checked')) {
	    $(this).parent().parent().addClass('open');
	    $(this).parent().parent().parent().addClass('open');
	    $(this).parent().parent().removeClass('closed');
	  }
	  else {
	    $(this).parent().parent().removeClass('open');
	    $(this).parent().parent().parent().removeClass('open');			
	    $(this).parent().parent().addClass('closed');
	  }
	});		
	// image hover replacement
  $('.om-maximenu img.om-hover').hover(function () {
    var src = $(this).attr('src');
    var altsrc = src.replace(/([^.]+)(\.[^.]+$)/, '$1_hover$2');
    $(this).attr({ src: altsrc, altsrc: src });
  },function () {
    var src = $(this).attr('src');
    var altsrc = src.replace(/_hover/, '');
    $(this).attr({ src: altsrc, altsrc: src });
  });	
});	 
;
/**
 * @file
 * Set the adaptive image cookie based on the window size
 *
 */

// For older browsers that don't support filter()
if (!Array.prototype.filter)
{
  Array.prototype.filter = function(fun /*, thisp */)
  {
    "use strict";

    if (this == null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun != "function")
      throw new TypeError();

    var res = [];
    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in t)
      {
        var val = t[i]; // in case fun mutates this
        if (fun.call(thisp, val, i, t))
          res.push(val);
      }
    }

    return res;
  };
}


/**
 * Set the cookie with the width value
 */
(function ($) {
  Drupal.behaviors.ais = function () {
    /*
      First, get the actual browser size.
      window.outerWidth/outerHeight answers honestly on Android devices, dishonestly on iOS, and not at all in IE
      window.screen.availWidth/availHeight answers honestly on iOS devices, dishonestly on Android, and not at all in pre-html5 browsers
      $(window).width()/height() will always answer (thanks jQuery!) and is the fall back
    */
    var width = [ window.outerWidth, window.screen.availWidth, $(window).width()];
    var height = [ window.outerHeight, window.screen.availHeight, $(window).height()];
    
    width = width.filter(Number);
    height = height.filter(Number);

    var width = Math.min.apply( Math, width);
    var height = Math.min.apply( Math, height);

    /* Select a method for determining the size */
    var size = width;
    if (Drupal.settings.ais_method == 'both-max') {
      size = Math.max( width, height );
    } else if (Drupal.settings.ais_method == 'both-min') {
      size = Math.min( width, height );
    } else if (Drupal.settings.ais_method == 'width') {
      size = width;
    } else if (Drupal.settings.ais_method == 'height') {
      size = height;
    }

    /* Match an image style and set the cookie */
    var style = Drupal.settings.ais[0];
    for (i in Drupal.settings.ais) {
       if (Number(Drupal.settings.ais[i].size) < size && Number(Drupal.settings.ais[i].size) > Number(style.size)) {
         style = Drupal.settings.ais[i];
       }
    }
    if (style) {
      document.cookie='ais='+style.name+'; path=/';
    } else {
      document.cookie='ais=;path=/;expires=Thu, 01-Jan-1970 00:00:01 GMT';
    }
  }
  $(window).resize(Drupal.behaviors.ais);
}(jQuery));

  // Call the cookie set function right away
  Drupal.behaviors.ais();

;
