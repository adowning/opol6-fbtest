<template>
  <div id="root">

  <mapbox
access-token="pk.eyJ1IjoiYXNoZG93bmluZyIsImEiOiJjamVrbDlvd3o0MGs3MnBsbjgxZWM1aXdoIn0.1QCvwGEr3ZhKmJ95U0a1Ag"
:map-options="{
  style: 'mapbox://styles/mapbox/streets-v9',
  center: [-95.262412, 32.311524],
  zoom: 15
}"
:geolocate-control="{
  show: true,
  position: 'top-left'
}"
:scale-control="{
  show: true,
  position: 'top-left'
}"
:fullscreen-control="{
  show: true,
  position: 'top-left'
}"
 @map-load="mapLoaded"
    @map-click="mapClicked"
   >

>
  </mapbox>
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

  methods: {
    async initializeMarkers(map) {
      console.log("initializing markers");
      var vm = this;
      const list = await axios.get(vm.url);
      var i = 0;
      for (var m of list.data) {
        console.log(i);
        var url = vm.url + i;
        var deviceName = ("device_" + i).toString();

        map.addSource(deviceName, {
          type: "geojson",          
          data: url
        });
             
        map.addLayer({
          id: deviceName,
          type: "symbol",
          source: deviceName,
          layout: {
            "icon-image": "bus-15",
            "icon-size": 2

          }
        })    .bindPopup('<button class="trigger">Say hi</button>')

        i++;
      }

      var timer = window.setInterval(function() {
      var i = 0;          
        for (var m of list.data) {
          var url = vm.url + i;
          var deviceName = ("device_" + i).toString();
          console.log(deviceName)
          map.getSource(deviceName).setData(url);
          i++;
        }
      }, 5000);
    },
    mapLoaded(map) {
    var store = turf.featureCollection([turf.point( [-95.262412, 32.311524])]);
    var warehouse = turf.featureCollection([turf.point( [-95.265083,32.306732])]);
       map.addLayer({
        id: "store",
        type: "circle",
        source: {
          data: store,
          type: "geojson"
        },
        paint: {
          "circle-radius": 20,
          "circle-color": "white",
          "circle-stroke-color": "#3887be",
          "circle-stroke-width": 3
        }
      });

      // Create a symbol layer on top of circle layer
      map.addLayer({
        id: "store-symbol",
        type: "symbol",
        source: {
          data: store,
          type: "geojson"
        },
        layout: {
          "icon-image": "embassy-15",
          "icon-size": 1
        },
        paint: {
          "text-color": "#3887be"
        }
      });
        map.addLayer({
        id: "warehouse",
        type: "circle",
        source: {
          data: warehouse,
          type: "geojson"
        },
        paint: {
          "circle-radius": 20,
          "circle-color": "white",
          "circle-stroke-color": "#3887be",
          "circle-stroke-width": 3
        }
      });

      // Create a symbol layer on top of circle layer
      map.addLayer({
        id: "warehouse-symbol",
        type: "symbol",
        source: {
          data: warehouse,
          type: "geojson"
        },
        layout: {
          "icon-image": "embassy-15",
          "icon-size": 1
        },
        paint: {
          "text-color": "#3887be"
        }
      });
      this.initializeMarkers(map);
    },
    mapClicked(map, e) {}
  }
};
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