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
            containerCss: containerDimensions
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

  previous = function() {
    currentPhoto = $('.current')[0];
    photoStack = $('.stack img');
    index = $(photoStack).index(currentPhoto);
    if(index > 0) {
      prevPhoto = $(photoStack)[index-1];
      $(currentPhoto).removeClass('current');
      $(prevPhoto).addClass('current');
      updatePager();
    }
  };

  next = function() {
    currentPhoto = $('.current')[0];
    photoStack = $('.stack img');
    index = $(photoStack).index(currentPhoto);
    if(index < $(photoStack).length-1) {
      nextPhoto = $(photoStack)[index+1];
      $(currentPhoto).removeClass('current');
      $(nextPhoto).addClass('current');
      updatePager();
    }
  };

  first = function() {
    currentPhoto = $('.current')[0];
    firstPhoto = $('.stack img')[0];
    $(currentPhoto).removeClass('current');
    $(firstPhoto).addClass('current');
    updatePager();
  };

  last = function() {
    currentPhoto = $('.current')[0];
    photoStack = $('.stack img');
    length = $(photoStack).length;
    lastPhoto = $(photoStack)[length-1];
    $(currentPhoto).removeClass('current');
    $(lastPhoto).addClass('current');
    updatePager();
  };

  updatePager = function() {
    currentPhoto = $('.current')[0];
    photoStack = $('.stack img');
    currentPhotoNum = $(photoStack).index(currentPhoto) + 1;
    length = $(photoStack).length;
    $('.photo-count').text(currentPhotoNum + " of " + length);
  };

  jQuery('img.first').click(first);
  jQuery('img.prev').click(previous);
  jQuery('img.next').click(next);
  jQuery('img.last').click(last);
  jQuery('.stack img').mouseover(function() {
    $('.nav .prev').show();
    $('.nav .next').show();
  });
  jQuery('.stack img').mouseout(function() {
    $('.nav .prev').hide();
    $('.nav .next').hide();
  });
});
