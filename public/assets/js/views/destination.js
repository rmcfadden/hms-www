var map;
$( document ).ready(function() {

  map = new GMaps({
    div: '#map',
    lat: 48.857,
    lng: 2.295
  });

/*
  GMaps.geocode({
    address: '505 Chapala St. Santa Barbara CA 93101',//$('#address').val(),
    callback: function(results, status) {

      alert(status);
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