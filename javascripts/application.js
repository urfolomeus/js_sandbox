jQuery(document).ready(function() {
  jQuery('#modal-link').click(function(e){
    var containerDimensions,
        success = true;
        minifyContainer = function() {
          containerDimensions = { height: 528, width: 590 };
          jQuery('#slideshow').removeClass('normal').addClass('mini');
        },
        normaliseContainer = function() {
          containerDimensions = { height: 620, width: 738 };
          jQuery('#slideshow').removeClass('mini').addClass('normal');
        },
        viewportBiggerThan = function(width, height) {
          return jQuery(window).width() > width &&
                 jQuery(window).height() > height;
        },
        showSlideshow = function() {
          jQuery('.overlay').modal({
            containerCss: containerDimensions,
            overlayClose: true
          });
          e.preventDefault();
        };

    if ( viewportBiggerThan(750, 680) ) {
      normaliseContainer();
      showSlideshow();
    } else if ( viewportBiggerThan(615, 550) ) {
      minifyContainer();
      showSlideshow();
    } else {
      alert('screen too small!');
    }
  });
});
