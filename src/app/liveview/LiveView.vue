<template>
  <div id="root">
<div id='map'></div>

  </div>
</template>

<script>
import Vue from "vue";
import mapboxgl from "mapbox-gl";
import Mapbox from "mapbox-gl-vue";
import axios from "axios";
//   @geolocate-error="geolocateError"
//     @geolocate-geolocate="geolocate"
export default {
  components: { Mapbox },
  data: () => ({
    markerList: ["Tab01", "Tab02"],
    url: "/api/mockroute/"
  }),
mounted() {
       L.mapbox.accessToken = 'pk.eyJ1IjoiYXNoZG93bmluZyIsImEiOiJjamVrbDlvd3o0MGs3MnBsbjgxZWM1aXdoIn0.1QCvwGEr3ZhKmJ95U0a1Ag';
var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([38, -102.0], 14);

// As with any other AJAX request, this technique is subject to the Same Origin Policy:
// http://en.wikipedia.org/wiki/Same_origin_policy
var featureLayer = L.mapbox.featureLayer()
    .loadURL('/api/mockroute/0')
    // Once this layer loads, we set a timer to load it again in a few seconds.
    .on('ready', run)
    .addTo(map);

function run() {
    featureLayer.eachLayer(function(l) {
        // map.panTo(l.getLatLng());
    });
    window.setTimeout(function() {
        featureLayer.loadURL('/api/mockroute/0');
    }, 2000);
}
},
  methods: {
    async initializeMarkers(map) {
     
    },
    mapLoaded(map) {

   
    }
  }
}
</script>
<style>
#map {
  position: absolute;
  top: 0;
  height: 800px;
  width: 85%;
}
.truck {
  margin: -10px -10px;
  width: 20px;
  height: 20px;
  border: 2px solid #fff;
  border-radius: 50%;
  background: #3887be;
  pointer-events: none;
}
</style>