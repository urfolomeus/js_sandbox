jQuery(document).ready(function () {
  jQuery('.preview img').click(function (e) {

    var containerDimensions,
        success = true;
        minifyContainer = function () {
          containerDimensions = { height: 528, width: 590 };
          jQuery('#slideshow').removeClass('normal').addClass('mini');
        },
        normaliseContainer = function () {
          containerDimensions = { height: 620, width: 738 };
          jQuery('#slideshow').removeClass('mini').addClass('normal');
        },
        viewportBiggerThan = function (width, height) {
          return jQuery(window).width() > width &&
                 jQuery(window).height() > height;
        },
        showSlideshow = function () {
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

  previous = function () {
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

  next = function () {
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

  first = function () {
    currentPhoto = $('.current')[0];
    firstPhoto = $('.stack .photo')[0];
    $(currentPhoto).removeClass('current');
    $(firstPhoto).addClass('current');
    updatePager();
    updateBlurb();
  };

  last = function () {
    currentPhoto = $('.current');
    photoStack = $('.stack .photo');
    length = $(photoStack).length;
    lastPhoto = $(photoStack)[length-1];
    $(currentPhoto).removeClass('current');
    $(lastPhoto).addClass('current');
    updatePager();
    updateBlurb();
  };

  updatePager = function () {
    currentPhoto = $('.current');
    photoStack = $('.stack .photo');
    currentPhotoNum = $(photoStack).index(currentPhoto) + 1;
    length = $(photoStack).length;
    $('.photo-count').text(currentPhotoNum + " of " + length);
    setButtonImages();
  };

  updateBlurb = function () {
    caption = $('.photo.current .caption');
    $('.blurb').text( $(caption).text() );
  }

  // navigation

  hasPrevious = function () {
    currentPhoto = $('.current');
    photoStack = $('.stack .photo');
    currentIndex = $(photoStack).index(currentPhoto);
    return currentIndex > 0;
  }

  hasNext = function () {
    currentPhoto = $('.current');
    photoStack = $('.stack .photo');
    currentIndex = $(photoStack).index(currentPhoto);
    length = $(photoStack).length;
    return currentIndex < length-1;
  }

  setButtonImages = function () {
    $.fn.setButtonImage = function (isOn, onImage, offImage) {
      $(this).attr('src', function () {
        return isOn ? onImage : offImage;
      });
    };

    $.fn.setPreviousImage = function (onImage, offImage) {
      $(this).setButtonImage(hasPrevious(), onImage, offImage);
    };

    $.fn.setNextImage = function (onImage, offImage) {
      $(this).setButtonImage(hasNext(), onImage, offImage);
    };

    // nav
    $('.nav img.prev').setPreviousImage('images/previous.jpg', 'images/previous_gray.jpg');
    $('.nav img.next').setNextImage('images/next.jpg', 'images/next_gray.jpg');

    // subnav
    $('.subnav img.first').setPreviousImage('images/start_sm.jpg', 'images/start_gray_sm.jpg');
    $('.subnav img.prev').setPreviousImage('images/prev_sm.jpg', 'images/prev_gray_sm.jpg');
    $('.subnav img.next').setNextImage('images/next_sm.jpg', 'images/next_gray_sm.jpg');
    $('.subnav img.last').setNextImage('images/end_sm.jpg', 'images/end_gray_sm.jpg');
  }

  jQuery('img.first').click(first);
  jQuery('img.prev').click(previous);
  jQuery('img.next').click(next);
  jQuery('img.last').click(last);
  jQuery('.stack .photo, .nav .prev, .nav .next').mouseover(function () {
    $('.nav .prev').show();
    $('.nav .next').show();
  });
  jQuery('.stack .photo, .nav .prev, .nav .next').mouseout(function () {
    $('.nav .prev').hide();
    $('.nav .next').hide();
  });
});
