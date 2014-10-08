$( document ).ready(function() {

  L.mapbox.accessToken = 'pk.eyJ1IjoiY29kZWZvcmFmcmljYSIsImEiOiJVLXZVVUtnIn0.JjVvqHKBGQTNpuDMJtZ8Qg';
  var map = L.mapbox.map('map', 'codeforafrica.ji193j10',{
      zoomAnimationThreshold: 10
    }).setView([-28.4792625, 24.6727135], 5);

  // Spiderfy
  var oms = new OverlappingMarkerSpiderfier(map);
  var popup = new L.Popup();
  oms.addListener('click', function(marker) {
    popup.setContent(marker.desc);
    popup.setLatLng(marker.getLatLng());
    map.openPopup(popup);
  });
  oms.addListener('spiderfy', function(markers) {
    map.closePopup();
  });

  var featureLayer = L.mapbox.featureLayer();

  map.scrollWheelZoom.disable();

  // Initialize the geocoder control and add it to the map.
  var geocoderControl = L.mapbox.geocoderControl('mapbox.places-v1',{
    autocomplete: true
  });
  geocoderControl.addTo(map);

  var input = document.getElementById('search-geo');
  var options = {
    componentRestrictions: {country: 'za'}
  };

  searchBox = new google.maps.places.Autocomplete(input, options);


  // Users location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var latlng = new google.maps.LatLng(
          position.coords.latitude, position.coords.longitude);
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            var arrAddress = results[1].address_components;
            var itemCountry='';

            // iterate through address_component array
            $.each(arrAddress, function (i, address_component) {
              if (address_component.types[0] == "country"){
                  console.log("country:"+address_component.short_name);
                  itemCountry = address_component.short_name;
              }
              //return false; // break the loop
            });
            console.log(results[1].formatted_address);
            if(itemCountry == "ZA"){
              $('#search-geo').val(results[1].formatted_address);
            }

          } else {
            console.log('No results found');
          }
        } else {
          console.log('Geocoder failed due to: ' + status);
        }
      });
    }, null, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    } );
  }

  var load = false;


  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox, 'place_changed', function() {
    load = true;
    map.remove();

    map = L.mapbox.map('map', 'codeforafrica.ji193j10',{
      zoomAnimationThreshold: 10
    }).setView([-28.4792625, 24.6727135], 5);

    map.on('zoomend', function(){
      loadMarkers();
    });

    map.scrollWheelZoom.disable();

    oms = new OverlappingMarkerSpiderfier(map);

    geocoderControl = L.mapbox.geocoderControl('mapbox.places-v1',{
      autocomplete: true
    });
    geocoderControl.addTo(map);

    $('.leaflet-control-mapbox-geocoder-toggle').click(function(){
      $('.home-search').fadeIn('fast');
      $('.leaflet-control-mapbox-geocoder-wrap').hide();
      $('.leaflet-control-mapbox-geocoder-results').hide();
      $('#loading-geo').hide();
    });

    popup = new L.Popup();
    oms.addListener('click', function(marker) {
      popup.setContent(marker.desc);
      popup.setLatLng(marker.getLatLng());
      map.openPopup(popup);
    });
    oms.addListener('spiderfy', function(markers) {
      map.closePopup();
    });


    var place = searchBox.getPlace();
    map.setView([place.geometry.location.k, place.geometry.location.B], 10);



    $('#loading-geo').fadeIn('slow');


  });

  function loadMarkers () {
    var bounds = map.getBounds();
    console.log(bounds);
    var bound = bounds._southWest.lat + "," + bounds._northEast.lat + "," +
      bounds._southWest.lat + "," + bounds._northEast.lng;


    if ( map.getZoom() > 9 && load) {

      $.ajax({
        type: "GET",
        url: '/api/v1/projectsgeojson?bounds='+bound,
        async: false
      }).done(function(response) {

        for (var i = 0; i < response.features.length; i ++) {
          var datum = response.features[i];
          var loc = new L.LatLng(
            response.features[i].geometry.coordinates[1],
            response.features[i].geometry.coordinates[0]
          );
          var marker = new L.Marker(loc);
          marker.desc = response.features[i].properties.description;
          map.addLayer(marker);
          oms.addMarker(marker);  // <-- here
        }

        load = false;
        $('#loading-geo').fadeOut('fast');
        $('.home-search').fadeOut('slow');

      });

      // featureLayer = L.mapbox.featureLayer()
      //   .loadURL('/api/v1/projectsgeojson?bounds='+bound)
      //   .addTo(map);
      //
      // featureLayer.on('ready', function() {
      //   // map.fitBounds(featureLayer.getBounds());
      //
      //   $('#loading-geo').fadeOut('fast');
      //   $('.home-search').fadeOut('slow');
      // });
      //
      // featureLayer.on('click', function(e) {
      //   map.panTo(e.layer.getLatLng());
      // });
    }

  }




  // Listen for the `found` result and display the first result
  // in the output container. For all available events, see
  // https://www.mapbox.com/mapbox.js/api/v2.1.2/l-mapbox-geocodercontrol/#section-geocodercontrol-on
  // geocoderControl.on('found', function(res) {
  //   output.innerHTML = JSON.stringify(res.results.features[0]);
  // });








});
