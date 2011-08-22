// Author: Alan Gardner
// This object holds the properties and methods associated with the slideshow object.
function SlideShow () {
  // checks to see if there are any photos in
  // the photo stack prior to the one given
  var hasPrevious = function(photo) {
    var photos = $('.stack .photo');
    var index = $(photos).index(photo);
    return index > 0;
  };

  // checks to see if there are any photos in
  // the stack after the one given
  var hasNext = function (photo) {
    var photos = $('.stack .photo');
    var index = $(photos).index(photo);
    return index < photos.length-1;
  };

  // sets the blurb for the currently displaying photo
  var setBlurb = function (photo) {
    var caption = $(photo).find('.caption').text();
    $('.blurb').text(caption);
  }

  // sets the current photo number in the pager
  var setPager = function (photo) {
    var photos = $('.stack .photo');
    var currentPhotoNum = $(photos).index(photo) + 1;
    $('.photo-count').text(currentPhotoNum + " of " + photos.length);
  };

  // makes sure that the correct image is used for the navigation
  // buttons depending on which photo is being displayed
  var setButtonImages = function (photo) {
    $.fn.setButtonImage = function (isOn, onImage, offImage) {
      $(this).attr('src', function () {
        return isOn ? onImage : offImage;
      });
    };

    $.fn.setPreviousImage = function (onImage, offImage) {
      $(this).setButtonImage(hasPrevious(photo), onImage, offImage);
    };

    $.fn.setNextImage = function (onImage, offImage) {
      $(this).setButtonImage(hasNext(photo), onImage, offImage);
    };

    // nav
    $('.nav img.prev').setPreviousImage('images/previous.jpg', 'images/previous_gray.jpg');
    $('.nav img.next').setNextImage('images/next.jpg', 'images/next_gray.jpg');

    // subnav
    $('.subnav img.first').setPreviousImage('images/start_sm.jpg', 'images/start_gray_sm.jpg');
    $('.subnav img.prev').setPreviousImage('images/prev_sm.jpg', 'images/prev_gray_sm.jpg');
    $('.subnav img.next').setNextImage('images/next_sm.jpg', 'images/next_gray_sm.jpg');
    $('.subnav img.last').setNextImage('images/end_sm.jpg', 'images/end_gray_sm.jpg');
  };

  // updates the required items when a photo is displayed
  var updateSlideshow = function (photo) {
    $('.photo.current').removeClass('current');
    $(photo).addClass('current');
    setPager(photo);
    setBlurb(photo);
    setButtonImages(photo);
  };

  // initialises the slideshow
  this.init = function(previewPic) {
    var previewId = $(previewPic).attr('id');
    var id = previewId.substring(3, previewId.length);
    var initialPhoto = $('.stack img[id="' + id + '"]').parent();
    updateSlideshow(initialPhoto);
  };

  // navigates to the previous photo in the stack
  this.previous = function () {
    var currentPhoto = $('.current');
    var photos = $('.stack .photo');
    var index = $(photos).index(currentPhoto);
    if( hasPrevious(currentPhoto) ) {
      var prevPhoto = $(photos)[index-1];
      updateSlideshow(prevPhoto);
    }
  };

  // navigates to the next photo in the stack
  this.next = function () {
    var currentPhoto = $('.current');
    var photos = $('.stack .photo');
    var index = $(photos).index(currentPhoto);
    if( hasNext(currentPhoto) ) {
      var nextPhoto = $(photos)[index+1];
      updateSlideshow(nextPhoto);
    }
  };

  // navigates to the first photo in the stack
  this.first = function () {
    var photos = $('.stack .photo');
    var firstPhoto = $(photos)[0];
    updateSlideshow(firstPhoto);
  };

  // navigates to the last photo in the stack
  this.last = function () {
    var photos = $('.stack .photo');
    var lastPhoto = $(photos)[photos.length-1];
    updateSlideshow(lastPhoto);
  };
};
