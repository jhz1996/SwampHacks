console.log(typeof(arr[1]));
//console.log(arr[1]);
var map;
function initialize() {
  var pyrmont = new google.maps.LatLng(-33.8665, 151.1956);

  var map = new google.maps.Map(document.getElementById('map'), {
    center: pyrmont,
    zoom: 15,
    scrollwheel: false
  });

  // Specify location, radius and place types for your Places API search.
  
//for(i =0; i<arr.length; i++){


  var request = {
    location: pyrmont,
    radius: '500',
    query: 'restaurant'
  };


service = new google.maps.places.PlacesService(map);
service.textSearch(request, callback);

//}

  // Create the PlaceService and send the request.
  // Handle the callback with an anonymous function.
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, function(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {

      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        console.log(place);
        // If the request succeeds, draw the place location on
        // the map as a marker, and register an event to handle a
        // click on the marker.
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });
      }
    }
  });
}

// Run the initialize function when the window has finished loading.
google.maps.event.addDomListener(window, 'load', initialize);

