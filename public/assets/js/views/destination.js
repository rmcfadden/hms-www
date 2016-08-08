var map;
$( document ).ready(function() {


  var url = "https://maps.googleapis.com/maps/api/staticmap?center=" + "123+Chapala+St.+Santa+Barbara+CA+93101" + '&size=425x160&maptype=roadmap&scale=2'
  url += '&key=AIzaSyA9WxXXYFQ1M7X798jOcqKM79JMUrvuN5I';

  $('#image-map').attr("src", url);
});

