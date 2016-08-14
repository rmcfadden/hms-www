$( document ).ready(function() {

  var url = "https://maps.googleapis.com/maps/api/staticmap?center=" + "123+Chapala+St.+Santa+Barbara+CA+93101" + '&size=425x160&maptype=roadmap&scale=2'
  url += '&key=AIzaSyA9WxXXYFQ1M7X798jOcqKM79JMUrvuN5I';

  $('#image-map').attr("src", url);

  var $container = $('.grid-boxes');
  var gutter = 30;
  var min_width = 300;

  $container.imagesLoaded( function(){
    $container.masonry({
    itemSelector : '.grid-boxes-in',
    gutterWidth: gutter,
    isAnimated: true,
    columnWidth: function( containerWidth ) {
      var box_width = (((containerWidth - 2*gutter)/3) | 0) ;

      if (box_width < min_width) {
        box_width = (((containerWidth - gutter)/2) | 0);
      }

      if (box_width < min_width) {
        box_width = containerWidth;
      }

      $('.grid-boxes-in').width(box_width);
        return box_width;
      }
    });
  });

  $("#gallery-button").animatedModal({ 
    modalTarget:'gallery-popup',
    animatedIn:'fadeIn',
    animatedOut:'bounceOutDown',
    animationDuration : '.1s',
    color: 	'#fff'
  });
});



var elementPosition = $('#request-brochure-left').offset();

var topOffset = '90px';
$(window).scroll(function(){
  if($(window).scrollTop() - 30 > elementPosition.top){
        $('#request-brochure-left').css('position','fixed').css('top',topOffset);
  } else {
      $('#request-brochure-left').css('position','static');
  }    
});