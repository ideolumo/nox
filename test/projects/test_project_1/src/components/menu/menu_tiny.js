jQuery(window).scroll(function () {
  var scrollTop = jQuery(document).scrollTop();
  var header = jQuery('header');
  if (scrollTop == 0) {
    header.removeClass('tiny');
  } else {
    header.addClass('tiny');
  }
});
 
