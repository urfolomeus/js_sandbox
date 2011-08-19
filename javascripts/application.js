jQuery(document).ready(function() {
  jQuery('.preview img').click(function(e){

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
          updatePager();
          updateBlurb();
          jQuery('.overlay').modal({
            containerCss: containerDimensions
          });
          e.preventDefault();
        },
        setCurrent = function (previewPic) {
          $('.current').removeClass('current');
          previewId = $(previewPic).attr('id')
          id = previewId.substring(3, previewId.length);
          currentPhoto = $('.stack img[id="' + id + '"]').parent();
          $(currentPhoto).addClass('current');
        };

    if ( viewportBiggerThan(750, 680) ) {
      normaliseContainer();
      setCurrent(this);
      showSlideshow();
    } else if ( viewportBiggerThan(615, 550) ) {
      minifyContainer();
      setCurrent(this);
      showSlideshow();
    } else {
      alert('screen too small!');
    }
  });

  previous = function() {
    currentPhoto = $('.current')[0];
    photoStack = $('.stack .photo');
    index = $(photoStack).index(currentPhoto);
    if(index > 0) {
      prevPhoto = $(photoStack)[index-1];
      $(currentPhoto).removeClass('current');
      $(prevPhoto).addClass('current');
      updatePager();
      updateBlurb();
    }
  };

  next = function() {
    currentPhoto = $('.current')[0];
    photoStack = $('.stack .photo');
    index = $(photoStack).index(currentPhoto);
    if(index < $(photoStack).length-1) {
      nextPhoto = $(photoStack)[index+1];
      $(currentPhoto).removeClass('current');
      $(nextPhoto).addClass('current');
      updatePager();
      updateBlurb();
    }
  };

  first = function() {
    currentPhoto = $('.current')[0];
    firstPhoto = $('.stack .photo')[0];
    $(currentPhoto).removeClass('current');
    $(firstPhoto).addClass('current');
    updatePager();
    updateBlurb();
  };

  last = function() {
    currentPhoto = $('.current')[0];
    photoStack = $('.stack .photo');
    length = $(photoStack).length;
    lastPhoto = $(photoStack)[length-1];
    $(currentPhoto).removeClass('current');
    $(lastPhoto).addClass('current');
    updatePager();
    updateBlurb();
  };

  updatePager = function() {
    currentPhoto = $('.current')[0];
    photoStack = $('.stack .photo');
    currentPhotoNum = $(photoStack).index(currentPhoto) + 1;
    length = $(photoStack).length;
    $('.photo-count').text(currentPhotoNum + " of " + length);
    setButtonImages();
  };

  updateBlurb = function() {
    caption = $('.photo.current .caption')[0];
    $('.blurb').text( $(caption).text() );
  }

  hasPrevious = function() {
    currentPhoto = $('.current')[0];
    photoStack = $('.stack .photo');
    currentIndex = $(photoStack).index(currentPhoto);
    return currentIndex > 0;
  }

  hasNext = function() {
    currentPhoto = $('.current')[0];
    photoStack = $('.stack .photo');
    length = $(photoStack).length;
    currentIndex = $(photoStack).index(currentPhoto);
    return currentIndex < length-1;
  }

  setButtonImages = function() {
    first_button = $('.subnav img.first')[0];
    $(first_button).attr('src', function() {
      return hasPrevious() ? 'images/start_sm.jpg' : 'images/start_gray_sm.jpg';
    });
    prev_sm_button = $('.subnav img.prev')[0];
    $(prev_sm_button).attr('src', function() {
      return hasPrevious() ? 'images/prev_sm.jpg' : 'images/prev_gray_sm.jpg';
    });

    prev_button = $('.nav img.prev')[0];
    $(prev_button).attr('src', function() {
      return hasPrevious() ? 'images/previous.jpg' : 'images/previous_gray.jpg';
    });
    next_button = $('.nav img.next')[0];
    $(next_button).attr('src', function() {
      return hasNext() ? 'images/next.jpg' : 'images/next_gray.jpg';
    });

    next_sm_button = $('.subnav img.next')[0];
    $(next_sm_button).attr('src', function() {
      return hasNext() ? 'images/next_sm.jpg' : 'images/next_gray_sm.jpg';
    });
    last_button = $('.subnav img.last')[0];
    $(last_button).attr('src', function() {
      return hasNext() ? 'images/end_sm.jpg' : 'images/end_gray_sm.jpg';
    });
  }

  jQuery('img.first').click(first);
  jQuery('img.prev').click(previous);
  jQuery('img.next').click(next);
  jQuery('img.last').click(last);
  jQuery('.stack .photo, .nav .prev, .nav .next').mouseover(function() {
    $('.nav .prev').show();
    $('.nav .next').show();
  });
  jQuery('.stack .photo, .nav .prev, .nav .next').mouseout(function() {
    $('.nav .prev').hide();
    $('.nav .next').hide();
  });
});
