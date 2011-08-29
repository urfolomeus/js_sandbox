function AswOverlayButton(anchor, overlay) {
  var anchor = anchor;
  var overlay = overlay;
  var absTop, absLeft = 1;
  var underneath;

  var getOverlayTop = function () {
    var buttonTop, buttonBottom, overlayHeight, overlayTop;
    var offset = 10;
    buttonTop = jQuery(anchor).offset().top - jQuery(window).scrollTop();
    buttonBottom = buttonTop + jQuery(anchor).height();
    overlayHeight = jQuery(overlay).height();
    overlayTop = buttonTop - overlayHeight;
    if (overlayTop < 0) {
      underneath = true;
      overlayTop = buttonBottom + offset;
    }
    absTop = overlayTop + jQuery(window).scrollTop();
    return overlayTop;
  };

  var getOverlayLeft = function() {
    var buttonLeft, buttonWidth, overlayWidth, overlayLeft;
    buttonLeft = jQuery(anchor).offset().left;
    buttonWidth = jQuery(anchor).width();
    overlayWidth = jQuery(overlay).width();
    overlayLeft = buttonLeft + (buttonWidth / 2) - (overlayWidth / 2) - jQuery(window).scrollLeft();
    overlayLeft = overlayLeft < 0 ? 1 : overlayLeft;
    absLeft = overlayLeft + jQuery(window).scrollLeft();
    return overlayLeft;
  };

  var getOverlayPosition = function () {
    var overlayTop = getOverlayTop();
    var overlayLeft = getOverlayLeft();
    return [ overlayTop, overlayLeft ];
  };

  var setOverlayTop = function (newTop) {
    jQuery('#simplemodal-container').css('top', newTop);
  };

  var setOverlayLeft = function (newLeft) {
    jQuery('#simplemodal-container').css('left', newLeft);
  };

  var lockOverlay = function () {
    setOverlayTop( absTop - jQuery(window).scrollTop() );
    setOverlayLeft( absLeft - jQuery(window).scrollLeft() );
  };

  var setArrowPosition = function() {
    var buttonWidth = jQuery(anchor).width();
    var buttonLeft = jQuery(anchor).offset().left;
    var overlayLeft = getOverlayLeft();
    var offset = buttonLeft - overlayLeft;

    var arrowBackLeft = offset + (buttonWidth / 2) - jQuery(window).scrollLeft();
    jQuery('.arrow-back').css('left', arrowBackLeft);

    jQuery('.arrow-fore').css('left', arrowBackLeft + 2);

    if (underneath) {
      jQuery('.dialog').addClass('underneath');
    }
  };

  this.open = function () {
    underneath = false;
    jQuery('.dialog').removeClass('underneath');
    var overlayPosition = getOverlayPosition();
    setArrowPosition();
    jQuery(overlay).modal({
      modal: false,
      position: overlayPosition,
      appendTo: '#button_overlay',
      onShow: function() { jQuery(window).bind('scroll', lockOverlay); },
      onClose: function() { jQuery(window).unbind('scroll', lockOverlay); jQuery.modal.close(); }
    });
  };

  this.close = function () {
    jQuery.modal.close();
  };
};

jQuery(document).ready(function () {

  jQuery('button.overlay-button').each(function () {
    var button = this;
    var buttonId = '#' + jQuery(button).attr('id');
    var overlay = buttonId + '_overlay';
    var overlayButton = new AswOverlayButton(buttonId, overlay);
    jQuery(button).click(function (e) {
      if ( !jQuery(overlay).is(':visible') ) {
        overlayButton.open();
      } else {
        overlayButton.close();
      }
      e.preventDefault();
    });
  });

});
