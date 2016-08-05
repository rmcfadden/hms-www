var map;
$( document ).ready(function() {

/* TODO!
  GMaps.geocode({
    address: '123 Chapala St. Santa Barbara CA 93101',//$('#address').val(),
    callback: function(results, status) {

      if (status == 'OK') {
        var latlng = results[0].geometry.location;
        map.setCenter(latlng.lat(), latlng.lng());
        map.addMarker({
          lat: latlng.lat(),
          lng: latlng.lng()
        });
      }
    }
  });*/
});


function initGoogleDestinationMap(){
 map = new GMaps({
    div: '#map',
    lat: 48.857,
    lng: 2.295,
    width: '100%',
    height: '500px',
    zoom: 16
  });
}