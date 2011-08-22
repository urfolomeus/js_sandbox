$(document).ready(function () {
  // initialise a slideshow object
  var slideshow = new SlideShow();

  // assign navigation controls
  $('img.first').click(slideshow.first);
  $('img.prev').click(slideshow.previous);
  $('img.next').click(slideshow.next);
  $('img.last').click(slideshow.last);

  // assign rollover area for nav popup
  $('.stack .photo, .nav .prev, .nav .next').mouseover(function () {
    $('.nav .prev').show();
    $('.nav .next').show();
  });
  $('.stack .photo, .nav .prev, .nav .next').mouseout(function () {
    $('.nav .prev').hide();
    $('.nav .next').hide();
  });

  // assign slideshow popup to click event
  $('.preview img').click(function (e) {
    // initialise the slideshow
    slideshow.init(this);

    // check the size of the user's viewport
    var viewportBiggerThan = function (width, height) {
      return $(window).width() > width && $(window).height() > height;
    };

    // display the slideshow if possible or default to click through
    if ( viewportBiggerThan(750, 680) ) {
      $('#slideshow').removeClass('mini').addClass('normal');
      $('.overlay').modal( { containerCss: { height: 620, width: 738 } } );
      e.preventDefault();
    } else if ( viewportBiggerThan(615, 550) ) {
      $('#slideshow').removeClass('normal').addClass('mini');
      $('.overlay').modal( { containerCss: { height: 528, width: 590 } } );
      e.preventDefault();
    } else {
      // follow default link action
    }
  });
});
