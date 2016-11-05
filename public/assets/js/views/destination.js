$( document ).ready(function() {

  var url = "https://maps.googleapis.com/maps/api/staticmap?center=" + "123+Chapala+St.+Santa+Barbara+CA+93101" + '&size=350x160&maptype=roadmap&scale=2'
  url += '&key=AIzaSyA9WxXXYFQ1M7X798jOcqKM79JMUrvuN5I';

  $('#image-map').attr("src", url);


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
